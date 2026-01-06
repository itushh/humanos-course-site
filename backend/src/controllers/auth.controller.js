import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const NODE_ENV = process.env.NODE_ENV || "development";

/* --------------------- REGISTER ------------------------ */

export const register = async (req, res) => {
  try {
    // 0. No body provided
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No body provided",
      });
    }

    const { name, email, password } = req.body;

    // 1. Required fields validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // 2. Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // 3. Create user
    const user = await User.create({
      name,
      email,
      password,
    });

    // 4. Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5. Set auth cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 6. Response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        is_email_verified: user.is_email_verified,
        is_active: user.is_active,
      },
    });

  } catch (error) {
    console.error("error in register.auth.controller.js : ", error);

    return res.status(500).json({
      success: false,
      message: "Something Went Wrong!",
    });
  }
};

/* --------------------- LOGIN ------------------------ */

export const login = async (req, res) => {
  try {
    // 0. No body provided
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No body provided",
      });
    }

    const { email, password } = req.body;

    // 1. Required fields validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2. Find user (explicitly select password)
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 3. Check account status
    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: "Account is disabled",
      });
    }

    // 4. Compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 5. Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 6. Set auth cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 7. Response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        is_email_verified: user.is_email_verified,
        is_active: user.is_active,
      },
    });

  } catch (error) {
    console.error("error in login.auth.controller.js : ", error);

    return res.status(500).json({
      success: false,
      message: "Something Went Wrong!",
    });
  }
};


/* --------------------- LOGOUT ------------------------ */

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: NODE_ENV === "production" ? "none" : "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });

  } catch (error) {
    console.error("error in logout.auth.controller.js : ", error);

    return res.status(500).json({
      success: false,
      message: "Something Went Wrong!",
    });
  }
};