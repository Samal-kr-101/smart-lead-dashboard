import { Response } from "express";
import Lead from "../models/Lead";
import { SortOrder } from "mongoose";
import { AuthRequest } from "../middleware/auth.middleware";

/* ---------------- CREATE LEAD ---------------- */
export const createLead = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const lead = await Lead.create({
      ...req.body,

      // 🔥 SAVE OWNER OF LEAD
      assignedTo: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error while creating lead",
    });
  }
};

/* ---------------- GET LEADS ---------------- */
export const getLeads = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const {
      status,
      source,
      search,
      sort,
      page = "1",
    } = req.query;

    const query: any = {};

    /* 🔥 ROLE-BASED FILTER */
    if (req.user.role !== "admin") {
      query.assignedTo = req.user._id;
    }

    /* FILTER: STATUS */
    if (status) {
      query.status = status;
    }

    /* FILTER: SOURCE */
    if (source) {
      query.source = source;
    }

    /* SEARCH */
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    const limit = 10;
    const pageNumber = Number(page);
    const skip = (pageNumber - 1) * limit;

    /* SORTING */
    const sortOption: { [key: string]: SortOrder } = {};

    if (sort === "oldest") {
      sortOption.createdAt = 1;
    } else if (sort === "name") {
      sortOption.name = 1;
    } else {
      sortOption.createdAt = -1;
    }

    const leads = await Lead.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .populate("assignedTo", "name email role");

    const total = await Lead.countDocuments(query);

    res.status(200).json({
      success: true,
      data: leads,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error while fetching leads",
    });
  }
};

/* ---------------- UPDATE LEAD ---------------- */
export const updateLead = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const lead = await Lead.findById(id);

    if (!lead) {
      res.status(404).json({
        success: false,
        message: "Lead not found",
      });
      return;
    }

    /* 🔥 SALES CAN UPDATE ONLY OWN LEADS */
    if (
      req.user.role !== "admin" &&
      lead.assignedTo.toString() !== req.user._id.toString()
    ) {
      res.status(403).json({
        success: false,
        message: "Access denied",
      });
      return;
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: updatedLead,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error while updating lead",
    });
  }
};

/* ---------------- DELETE LEAD ---------------- */
export const deleteLead = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      res.status(404).json({
        success: false,
        message: "Lead not found",
      });
      return;
    }

    /* 🔥 SALES CAN DELETE ONLY OWN LEADS */
    if (
      req.user.role !== "admin" &&
      lead.assignedTo.toString() !== req.user._id.toString()
    ) {
      res.status(403).json({
        success: false,
        message: "Access denied",
      });
      return;
    }

    await lead.deleteOne();

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error while deleting lead",
    });
  }
};