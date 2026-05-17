import cors from "cors";
import express from "express";

import authRoutes from "./routes/auth.routes";
import leadRoutes from "./routes/lead.routes";
import analyticsRoutes from "./routes/analytics.routes";

const app = express();

// middleware
app.use(express.json());

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// ❌ removed app.options("*", cors());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/analytics", analyticsRoutes);

export default app;