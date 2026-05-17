
import cors from "cors";
import express from "express";

import authRoutes from "./routes/auth.routes";
import leadRoutes from "./routes/lead.routes";
import analyticsRoutes from "./routes/analytics.routes";

const app = express();

// ---------------- Middleware ----------------
app.use(express.json());

// ---------------- CORS CONFIG ----------------
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://smart-lead-dashboard-bay.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow Postman / server requests
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.replace(/\/$/, "");

      const isAllowed = allowedOrigins.some(
        (o) => o.replace(/\/$/, "") === normalizedOrigin
      );

      if (isAllowed) {
        return callback(null, true);
      }

      console.log("❌ Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// ---------------- Routes ----------------
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/analytics", analyticsRoutes);

// ---------------- Health Check ----------------
app.get("/", (req, res) => {
  res.json({
    message: "Smart Lead Dashboard API running 🚀",
    status: "OK"
  });
});

export default app;