import Admin from "../models/Admin.js";
import AcademyProfile from "../models/AcademyProfile.js";

const getProfile = async (req, res, next) => {
  try {
    let profile = await AcademyProfile.findOne();

    if (!profile) {
      profile = await AcademyProfile.create({});
    }

    res.status(200).json({ profile });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const profile = await AcademyProfile.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true
    });

    res.status(200).json({ message: "Academy details updated.", profile });
  } catch (error) {
    next(error);
  }
};

const updateAdminPassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.admin._id).select("+password");

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect." });
    }

    admin.password = newPassword;
    await admin.save();

    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    next(error);
  }
};

export { getProfile, updateProfile, updateAdminPassword };
