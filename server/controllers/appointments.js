import { Appointment, TimeSlot } from "../models/appointment.js";
import mongoose from "mongoose";

export const createAppointment = async (req, res, next) => {
  try {
    const { timeSlotId } = req.body;

    if (!timeSlotId) {
      return res
        .status(400)
        .json({ message: "A timeSlotId is required to book an appointment." });
    }

    if (typeof timeSlotId !== "string" || !mongoose.Types.ObjectId.isValid(timeSlotId)) {
      return res.status(400).json({ message: "Invalid timeSlotId format." });
    }

    // Look up the exact time slot the client selected, rather than
    // matching by date, which can miss due to timezone/precision drift
    // or match the wrong slot if two share a timestamp.
    const timeSlot = await TimeSlot.findOne({
      _id: timeSlotId,
      isBooked: false,
    });

    // If there's no available time slot, send an error response
    if (!timeSlot) {
      return res
        .status(400)
        .json({ message: "No available time slots for the requested time." });
    }

    // Create a new appointment with the request body data
    const newAppointment = new Appointment({
      client: req.body.client,
      employee: req.body.employee,
      date: timeSlot.date, // Use the time slot's own date as the source of truth
      price: req.body.price,
      service: req.body.service,
      timeSlot: timeSlot._id, // Link the appointment to the found time slot
    });

    // Save the appointment
    const savedAppointment = await newAppointment.save();

    // Mark the time slot as booked
    timeSlot.isBooked = true;
    timeSlot.appointment = savedAppointment._id;
    await timeSlot.save();

    // Send the saved appointment as a response
    res.status(200).json(savedAppointment);
  } catch (err) {
    next(err);
  }
};

export const getFilteredAppointments = async (req, res, next) => {
  try {
    let filter = {};
    if (req.user.role === "employee") {
      filter.employee = req.user.id; // Filter by employee ID if the user is an employee
    } else {
      filter.client = req.user.id; // Filter by client ID for clients
    }

    const appointments = await Appointment.find(filter);
    res.status(200).json(appointments);
  } catch (err) {
    next(err);
  }
};

export const getUnbookedTimeSlots = async (req, res, next) => {
  try {
    const unbookedSlots = await TimeSlot.find({ isBooked: false });
    res.status(200).json(unbookedSlots);
  } catch (err) {
    next(err);
  }
};

export const getBookedTimeSlots = async (req, res, next) => {
  try {
    const bookedSlots = await TimeSlot.find({ isBooked: true });
    res.status(200).json(bookedSlots);
  } catch (err) {
    next(err);
  }
};

export const getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    res.status(200).json(appointment);
  } catch (err) {
    next(err);
  }
};

export const getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (err) {
    next(err);
  }
};

export const updateAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    const { timeSlotId, ...rest } = req.body;

    // If the client is rescheduling to a different time slot, move the
    // isBooked flag from the old TimeSlot document to the new one.
    if (timeSlotId && timeSlotId !== appointment.timeSlot.toString()) {
      if (typeof timeSlotId !== "string" || !mongoose.Types.ObjectId.isValid(timeSlotId)) {
        return res.status(400).json({ message: "Invalid timeSlotId format." });
      }

      const newTimeSlot = await TimeSlot.findOne({
        _id: timeSlotId,
        isBooked: false,
      });

      if (!newTimeSlot) {
        return res
          .status(400)
          .json({ message: "The selected time slot is no longer available." });
      }

      await TimeSlot.findByIdAndUpdate(appointment.timeSlot, {
        $set: { isBooked: false },
        $unset: { appointment: "" },
      });

      newTimeSlot.isBooked = true;
      newTimeSlot.appointment = appointment._id;
      await newTimeSlot.save();

      appointment.timeSlot = newTimeSlot._id;
    }

    Object.assign(appointment, rest);
    const updatedAppointment = await appointment.save();

    res.status(200).json(updatedAppointment);
  } catch (err) {
    next(err);
  }
};

export const deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    await TimeSlot.findByIdAndUpdate(appointment.timeSlot, {
      $set: { isBooked: false },
      $unset: { appointment: "" },
    });

    await appointment.deleteOne();

    res.status(200).json("Appointment has been deleted");
  } catch (err) {
    next(err);
  }
};
