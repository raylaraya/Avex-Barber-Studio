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
    if (!user) return res.status(400).json({ msg: "Invalid credentials." });

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT, {
      expiresIn: "1h",
    });

    const { password, role, phoneNumber, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000),
        secure: true,
        sameSite: "strict",
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING OUT */
export const logout = async (req, res) => {
  try {
    // Clear the "access_token" cookie by setting its expiration date to the past
    res
      .cookie("access_token", "", {
        httpOnly: true,
        expires: new Date(0), // Set to Unix epoch time, effectively removing it
      })
      .status(200)
      .json({ msg: "Logged out successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
