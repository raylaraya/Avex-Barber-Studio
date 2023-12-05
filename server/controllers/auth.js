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
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT);

    const { password, role, phoneNumber, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
