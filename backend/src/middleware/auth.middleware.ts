import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import { getJWT_SECRET } from "../config/getEnv";

export interface AuthRequest extends Request {
  user?: any;
}

const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Get authorization header
    const authHeader = req.headers.authorization;

    if (typeof authHeader !== "string") {
      return res.status(401).json({ message: "No token provided" });
    }

    // 2. Ensure Bearer format
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // 3. Safe token extraction (FIXED PART)
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || !parts[1]) {
      return res.status(401).json({ message: "Token missing or invalid" });
    }

    const token = parts[1];

    // 4. Get JWT secret safely
    const secret: string = getJWT_SECRET();

    let decoded: JwtPayload;

    // 5. Verify token
    try {
      decoded = jwt.verify(token, secret) as JwtPayload;
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // 6. Validate payload
    if (!decoded || typeof decoded !== "object" || !decoded.id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    // 7. Find user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 8. Attach user to request
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default protect;