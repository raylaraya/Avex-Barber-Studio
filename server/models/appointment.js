import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  timeSlot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TimeSlot",
    required: true,
  },
});

const TimeSlotSchema = new mongoose.Schema({
  dayOfWeek: {
    type: Number,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: false,
  },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
const TimeSlot = mongoose.model("TimeSlot", TimeSlotSchema);
export { Appointment, TimeSlot };
