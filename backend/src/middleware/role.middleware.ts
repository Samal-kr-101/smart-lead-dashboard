import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";


const authorizeRoles = (...roles: string[]) => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next();
  };
};

export default authorizeRoles;