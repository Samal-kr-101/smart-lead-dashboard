import { Request, Response } from "express";
import Lead from "../models/Lead";

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const totalLeads = await Lead.countDocuments();

    const newLeads = await Lead.countDocuments({ status: "New" });
    const qualifiedLeads = await Lead.countDocuments({ status: "Qualified" });
    const closedLeads = await Lead.countDocuments({ status: "Closed" });

    const websiteLeads = await Lead.countDocuments({ source: "Website" });
    const instagramLeads = await Lead.countDocuments({ source: "Instagram" });
    const linkedinLeads = await Lead.countDocuments({ source: "LinkedIn" });

    res.json({
      totalLeads,
      status: {
        new: newLeads,
        qualified: qualifiedLeads,
        closed: closedLeads,
      },
      source: {
        website: websiteLeads,
        instagram: instagramLeads,
        linkedin: linkedinLeads,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Analytics error" });
  }
};