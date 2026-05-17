import express from "express";

import {
  createLead,
  getLeads,
  deleteLead,
  updateLead,
} from "../controllers/lead.controller";

import protect from "../middleware/auth.middleware";
import authorizeRoles from "../middleware/role.middleware";

const router = express.Router();

/* ---------------- GET ALL LEADS ---------------- */
router.get("/", protect, getLeads);

/* ---------------- CREATE LEAD ---------------- */
router.post("/", protect, createLead);

/* ---------------- UPDATE LEAD (EDIT FEATURE) ---------------- */
router.put("/:id", protect, updateLead);

/* ---------------- DELETE LEAD (ADMIN ONLY) ---------------- */
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteLead
);

export default router;