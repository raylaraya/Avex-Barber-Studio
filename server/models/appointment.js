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
  date: {
    type: Date,
    required: true,
    index: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
    index: true,
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: false,
  },
});

TimeSlotSchema.index({ dayOfWeek: 1, isBooked: 1 });

const Appointment = mongoose.model("Appointment", AppointmentSchema);
const TimeSlot = mongoose.model("TimeSlot", TimeSlotSchema);
export { Appointment, TimeSlot };
