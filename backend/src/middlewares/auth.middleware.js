import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

/**
 * Auth middleware
 * - Reads JWT from cookies
 * - Verifies token
 * - Fetches user
 * - Attaches user to req.user
 */
export const authMiddleware = async (req, res, next) => {
  try {
    // 1. Get token from cookies
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // 2. Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // 3. Fetch user from DB
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // 4. Check account status
    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: "Account is disabled",
      });
    }

    // 5. Attach user to request
    req.user = user;

    next();
  } catch (error) {
    console.error("error in auth.middleware.js : ", error);

    return res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};
