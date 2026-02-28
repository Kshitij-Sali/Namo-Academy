import Inquiry from "../models/Inquiry.js";

const createInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    res.status(201).json({
      message: "Your inquiry has been submitted successfully.",
      inquiry
    });
  } catch (error) {
    next(error);
  }
};

const getInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ count: inquiries.length, inquiries });
  } catch (error) {
    next(error);
  }
};

const resolveInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { resolved: true, resolvedAt: new Date() },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found." });
    }

    res.status(200).json({ message: "Inquiry marked as resolved.", inquiry });
  } catch (error) {
    next(error);
  }
};

const deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found." });
    }

    res.status(200).json({ message: "Inquiry deleted successfully." });
  } catch (error) {
    next(error);
  }
};

export { createInquiry, getInquiries, resolveInquiry, deleteInquiry };
