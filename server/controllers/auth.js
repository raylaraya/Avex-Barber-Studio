import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

/* REGISTER CLIENT */
export const createClient = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newClient = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      phoneNumber,
      role: "client",
    });

    await newClient.save();

    res.status(201).send("User has been created");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* REGISTER EMPLOYEE */
export const createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newEmployee = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      phoneNumber,
      role: "employee",
    });

    const savedEmployee = await newEmployee.save();

    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
