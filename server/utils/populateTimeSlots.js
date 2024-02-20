import mongoose from "mongoose";
import moment from "moment";
import dotenv from "dotenv";
import { TimeSlot } from "../models/appointment.js";

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log("MongoDB Time Slots Populated"))
  .catch((err) => console.error("MongodDB Connection Error: ", err));

const generateTimeSlotsForDay = (dayOfWeek, openTime, closeTime) => {
  const timeSlots = [];
  let startTime = moment(openTime, "HH:mm");
  const endTime = moment(closeTime, "HH:mm");

  while (startTime.isBefore(endTime)) {
    timeSlots.push({
      dayOfWeek: dayOfWeek,
      startTime: startTime.format("HH:mm"),
      isBooked: false,
    });
    // Increment by 30 minutes for the next slot
    startTime = startTime.add(30, "minutes");
  }

  return timeSlots;
};

const generateAllTimeSlots = () => {
  let allTimeSlots = [];

  // Generate time slots for Monday (1) to Wednesday (3), 8:30AM - 5:30PM
  for (let day = 1; day <= 3; day++) {
    allTimeSlots = allTimeSlots.concat(
      generateTimeSlotsForDay(day, "08:30", "18:00")
    );
  }

  // Generate time slots for Thursday (4) to Saturday (6), 8AM - 6:30PM
  for (let day = 4; day <= 6; day++) {
    allTimeSlots = allTimeSlots.concat(
      generateTimeSlotsForDay(day, "08:00", "19:00")
    );
  }

  return allTimeSlots;
};

const insertTimeSlots = async (timeSlots) => {
  try {
    await TimeSlot.deleteMany(); // Clears existing time slots before populating new ones
    await TimeSlot.insertMany(timeSlots);
    console.log("Time slots successfully added to the database!");
  } catch (error) {
    console.error("Error inserting time slots:", error);
  } finally {
    mongoose.disconnect();
  }
};

const run = async () => {
  const timeSlots = generateAllTimeSlots();
  await insertTimeSlots(timeSlots);
};

run();
