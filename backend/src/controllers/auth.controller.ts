import { Request, Response } from "express";
import User from "../models/User";
import generateToken from "../utils/generateToken";

// --------------------
// REGISTER USER
// --------------------
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    // 1. CHECK IF USER EXISTS
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // 2. CREATE USER (password will be hashed by schema pre-save hook)
    const user = await User.create({
      name,
      email,
      password,
      role: role || "sales",
    });

    // 3. GENERATE TOKEN (include role in frontend)
    const token = generateToken(user._id.toString());

    // 4. RESPONSE (remove password)
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// --------------------
// LOGIN USER
// --------------------
export const loginUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 1. FIND USER + INCLUDE PASSWORD
    const user = await User.findOne({ email }).select("+password");

    console.log("USER FOUND:", user);
    console.log("ROLE:", user?.role);

    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // 2. CHECK PASSWORD USING MODEL METHOD
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // 3. GENERATE TOKEN
    const token = generateToken(user._id.toString());

    // 4. RESPONSE (NEVER SEND PASSWORD)
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};