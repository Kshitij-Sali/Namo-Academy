import Testimonial from "../models/Testimonial.js";

const createPublicTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({
      message: "Thank you. Your testimonial has been submitted for admin approval.",
      testimonial
    });
  } catch (error) {
    next(error);
  }
};

const getPublicTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ approved: true })
      .sort({ approvedAt: -1, createdAt: -1 })
      .select("name message approvedAt createdAt");

    res.status(200).json({ count: testimonials.length, testimonials });
  } catch (error) {
    next(error);
  }
};

const getAdminTestimonials = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = {};

    if (status === "pending") {
      filter.approved = false;
    }

    if (status === "approved") {
      filter.approved = true;
    }

    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ count: testimonials.length, testimonials });
  } catch (error) {
    next(error);
  }
};

const approveTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      {
        approved: true,
        approvedAt: new Date(),
        approvedBy: req.admin._id
      },
      { new: true }
    );

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found." });
    }

    res.status(200).json({ message: "Testimonial approved successfully.", testimonial });
  } catch (error) {
    next(error);
  }
};

const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found." });
    }

    res.status(200).json({ message: "Testimonial deleted successfully." });
  } catch (error) {
    next(error);
  }
};

export {
  createPublicTestimonial,
  getPublicTestimonials,
  getAdminTestimonials,
  approveTestimonial,
  deleteTestimonial
};
