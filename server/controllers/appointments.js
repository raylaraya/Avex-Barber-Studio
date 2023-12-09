import Appointment from "../models/appointment.js";

/* CREATE APPOINTMENT*/
export const createAppointment = async (req, res, next) => {
  const newAppointment = new Appointment(req.body);

  try {
    const savedAppointment = await newAppointment.save();
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
