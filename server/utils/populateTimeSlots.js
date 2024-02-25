import mongoose from "mongoose";
import moment from "moment-timezone";
import dotenv from "dotenv";
import { TimeSlot } from "../models/appointment.js";

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log("MongoDB Time Slots Populated"))
  .catch((err) => console.error("MongodDB Connection Error: ", err));

const clearExistingTimeSlots = async () => {
  await TimeSlot.deleteMany({});
  console.log("Existing time slots cleared.");
};

// Generate time slots for a specific date
const generateTimeSlotsForDate = (date) => {
  const timeSlots = [];
  const openingHours = {
    1: ["08:30", "17:30"], // Monday
    2: ["08:30", "17:30"], // Tuesday
    3: ["08:30", "17:30"], // Wednesday
    4: ["08:00", "18:30"], // Thursday
    5: ["08:00", "18:30"], // Friday
    6: ["08:00", "18:30"], // Saturday
  };

  const dayOfWeek = moment(date).day();
  if (dayOfWeek === 0 || !openingHours[dayOfWeek]) return []; // Skip Sundays and any undefined days

  const [openTime, closeTime] = openingHours[dayOfWeek];
  let currentTime = moment.tz(date, "America/New_York").set({
    hour: moment(openTime, "HH:mm").get("hour"),
    minute: moment(openTime, "HH:mm").get("minute"),
  });
  const endTime = moment.tz(date, "America/New_York").set({
    hour: moment(closeTime, "HH:mm").get("hour"),
    minute: moment(closeTime, "HH:mm").get("minute"),
  });

  while (currentTime.isBefore(endTime)) {
    timeSlots.push({
      date: currentTime.toDate(),
      isBooked: false,
    });
    currentTime.add(30, "minutes");
  }

  return timeSlots;
};

// Populate time slots for a range of dates
const populateTimeSlots = async () => {
  await clearExistingTimeSlots();

  const startDate = moment(); // Start from today
  const endDate = moment().add(1, "months"); // Populate for the next 1 month

  for (
    let currentDate = startDate;
    currentDate.isBefore(endDate);
    currentDate.add(1, "days")
  ) {
    const dailyTimeSlots = generateTimeSlotsForDate(currentDate.toDate());
    if (dailyTimeSlots.length > 0) {
      await TimeSlot.insertMany(dailyTimeSlots);
      console.log(`Time slots for ${currentDate.format("YYYY-MM-DD")} added.`);
    }
  }

  console.log("Time slots successfully added to the database!");
  mongoose.disconnect();
};

populateTimeSlots().catch((err) => console.error(err));
