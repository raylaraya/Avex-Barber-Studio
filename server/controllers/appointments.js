import { Appointment, TimeSlot } from "../models/appointment.js";
import moment from "moment-timezone";

export const createAppointment = async (req, res, next) => {
  try {
    // Extract and format the desired date and time from the request body
    const desiredDateTime = moment.tz(req.body.date, "America/New_York");

    // Find an available time slot that matches the desired date and time
    // Note: You will need to adjust the time slot finding logic here based on your updated TimeSlot model
    // For example, if you're now using a full 'date' field in TimeSlot, you would compare against that
    const timeSlot = await TimeSlot.findOne({
      date: desiredDateTime.toDate(), // Convert to JavaScript Date object for comparison
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
      date: desiredDateTime.toDate(), // Convert moment back to JS Date
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
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedAppointment);
  } catch (err) {
    next(err);
  }
};

export const deleteAppointment = async (req, res, next) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json("Appointment has been deleted");
  } catch (err) {
    next(err);
  }
};
