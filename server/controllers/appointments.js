import { Appointment, TimeSlot } from "../models/appointment.js";

/* CREATE APPOINTMENT*/
// export const createAppointment = async (req, res, next) => {
//   const newAppointment = new Appointment(req.body);

//   try {
//     const savedAppointment = await newAppointment.save();
//     res.status(200).json(savedAppointment);
//   } catch (err) {
//     next(err);
//   }
// };

export const createAppointment = async (req, res, next) => {
  try {
    // Create a new appointment with the request body data
    const newAppointment = new Appointment(req.body);

    // Find an available time slot
    const timeSlot = await TimeSlot.findOne({
      isBooked: false,
      // ... any other conditions like dayOfWeek, startTime, etc.
    });

    // If there's no available time slot, send an error response
    if (!timeSlot) {
      return res.status(400).json({ message: "No available time slots." });
    }

    // Link the appointment to the time slot
    newAppointment.timeSlot = timeSlot._id;

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

/* GET APPOINTMENT */
export const getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    res.status(200).json(appointment);
  } catch (err) {
    next(err);
  }
};

/* GET ALL APPOINTMENTS */
export const getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (err) {
    next(err);
  }
};

/* UPDATE APPOINTMENT */
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

/* DELETE APPOINTMENT */
export const deleteAppointment = async (req, res, next) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json("Appointment has been deleted");
  } catch (err) {
    next(err);
  }
};
