import { useEffect, useState } from "react";
import http from "../../api/http";

const emptyProfile = {
  academyName: "",
  heroTitle: "",
  tagline: "",
  vision: "",
  methodology: "",
  phone: "",
  email: "",
  address: "",
  yearsExperience: "",
  studentsTaught: "",
  successRate: "",
  socialLinks: {
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: ""
  }
};

const normalizeProfile = (rawProfile = {}) => ({
  academyName: rawProfile.academyName || "",
  heroTitle: rawProfile.heroTitle || "",
  tagline: rawProfile.tagline || "",
  vision: rawProfile.vision || "",
  methodology: rawProfile.methodology || "",
  phone: rawProfile.phone || "",
  email: rawProfile.email || "",
  address: rawProfile.address || "",
  yearsExperience: rawProfile.yearsExperience ?? "",
  studentsTaught: rawProfile.studentsTaught ?? "",
  successRate: rawProfile.successRate ?? "",
  socialLinks: {
    facebook: rawProfile.socialLinks?.facebook || "",
    instagram: rawProfile.socialLinks?.instagram || "",
    youtube: rawProfile.socialLinks?.youtube || "",
    linkedin: rawProfile.socialLinks?.linkedin || ""
  }
});

const SettingsPage = () => {
  const [profile, setProfile] = useState(emptyProfile);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: ""
  });
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [passwordFeedback, setPasswordFeedback] = useState({ type: "", message: "" });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await http.get("/settings/profile");
        setProfile(normalizeProfile(data.profile));
      } catch (error) {
        setFeedback({ type: "error", message: "Failed to load academy settings." });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value
      }
    }));
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    setFeedback({ type: "", message: "" });

    try {
      const payload = {
        academyName: profile.academyName,
        heroTitle: profile.heroTitle,
        tagline: profile.tagline,
        vision: profile.vision,
        methodology: profile.methodology,
        phone: profile.phone,
        email: profile.email,
        address: profile.address,
        yearsExperience: Number(profile.yearsExperience),
        studentsTaught: Number(profile.studentsTaught),
        successRate: Number(profile.successRate),
        socialLinks: profile.socialLinks
      };
      const { data } = await http.put("/settings/profile", payload);
      setProfile(normalizeProfile(data.profile));
      setFeedback({ type: "success", message: "Academy details updated successfully." });
    } catch (error) {
      setFeedback({ type: "error", message: error.response?.data?.message || "Update failed." });
    }
  };

  const changePassword = async (event) => {
    event.preventDefault();
    setPasswordFeedback({ type: "", message: "" });

    try {
      await http.patch("/settings/password", passwordForm);
      setPasswordForm({ currentPassword: "", newPassword: "" });
      setPasswordFeedback({ type: "success", message: "Password changed successfully." });
    } catch (error) {
      setPasswordFeedback({
        type: "error",
        message: error.response?.data?.message || "Failed to change password."
      });
    }
  };

  if (loading) {
    return <div className="panel">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <section className="panel">
        <h2 className="text-xl font-semibold text-slate-900">Academy Details</h2>
        <form onSubmit={saveProfile} className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="academyName" className="mb-1 block text-sm font-semibold text-slate-700">
              Academy Name
            </label>
            <input
              id="academyName"
              name="academyName"
              value={profile.academyName}
              onChange={handleProfileChange}
              placeholder="Academy Name"
              className="field"
            />
          </div>
          <div>
            <label htmlFor="heroTitle" className="mb-1 block text-sm font-semibold text-slate-700">
              Hero Title
            </label>
            <input
              id="heroTitle"
              name="heroTitle"
              value={profile.heroTitle}
              onChange={handleProfileChange}
              placeholder="Hero Title"
              className="field"
            />
          </div>
          <div>
            <label htmlFor="tagline" className="mb-1 block text-sm font-semibold text-slate-700">
              Tagline
            </label>
            <input
              id="tagline"
              name="tagline"
              value={profile.tagline}
              onChange={handleProfileChange}
              placeholder="Tagline"
              className="field"
            />
          </div>
          <div>
            <label htmlFor="academyPhone" className="mb-1 block text-sm font-semibold text-slate-700">
              Phone
            </label>
            <input
              id="academyPhone"
              name="phone"
              value={profile.phone}
              onChange={handleProfileChange}
              placeholder="Phone"
              className="field"
            />
          </div>
          <div>
            <label htmlFor="academyEmail" className="mb-1 block text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              id="academyEmail"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleProfileChange}
              placeholder="Email"
              className="field"
            />
          </div>
          <div>
            <label htmlFor="academyAddress" className="mb-1 block text-sm font-semibold text-slate-700">
              Address
            </label>
            <input
              id="academyAddress"
              name="address"
              value={profile.address}
              onChange={handleProfileChange}
              placeholder="Address"
              className="field"
            />
          </div>
          <div>
            <label htmlFor="yearsExperience" className="mb-1 block text-sm font-semibold text-slate-700">
              Years of Experience
            </label>
            <input
              id="yearsExperience"
              name="yearsExperience"
              type="number"
              min="0"
              value={profile.yearsExperience}
              onChange={handleProfileChange}
              placeholder="Years of Experience"
              className="field"
            />
          </div>
          <div>
            <label htmlFor="studentsTaught" className="mb-1 block text-sm font-semibold text-slate-700">
              Students Taught
            </label>
            <input
              id="studentsTaught"
              name="studentsTaught"
              type="number"
              min="0"
              value={profile.studentsTaught}
              onChange={handleProfileChange}
              placeholder="Students Taught"
              className="field"
            />
          </div>
          <div>
            <label htmlFor="successRate" className="mb-1 block text-sm font-semibold text-slate-700">
              Success Rate (%)
            </label>
            <input
              id="successRate"
              name="successRate"
              type="number"
              min="0"
              max="100"
              value={profile.successRate}
              onChange={handleProfileChange}
              placeholder="Success Rate (%)"
              className="field"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="academyVision" className="mb-1 block text-sm font-semibold text-slate-700">
              Vision
            </label>
            <textarea
              id="academyVision"
              name="vision"
              value={profile.vision}
              onChange={handleProfileChange}
              placeholder="Vision"
              rows={3}
              className="field"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="academyMethodology" className="mb-1 block text-sm font-semibold text-slate-700">
              Methodology
            </label>
            <textarea
              id="academyMethodology"
              name="methodology"
              value={profile.methodology}
              onChange={handleProfileChange}
              placeholder="Methodology"
              rows={3}
              className="field"
            />
          </div>

          <div>
            <label htmlFor="facebookUrl" className="mb-1 block text-sm font-semibold text-slate-700">
              Facebook URL
            </label>
            <input
              id="facebookUrl"
              name="facebook"
              value={profile.socialLinks.facebook}
              onChange={handleSocialChange}
              placeholder="Facebook URL"
              className="field"
            />
          </div>
          <div>
            <label htmlFor="instagramUrl" className="mb-1 block text-sm font-semibold text-slate-700">
              Instagram URL
            </label>
            <input
              id="instagramUrl"
              name="instagram"
              value={profile.socialLinks.instagram}
              onChange={handleSocialChange}
              placeholder="Instagram URL"
              className="field"
            />
          </div>
          <div>
            <label htmlFor="youtubeUrl" className="mb-1 block text-sm font-semibold text-slate-700">
              YouTube URL
            </label>
            <input
              id="youtubeUrl"
              name="youtube"
              value={profile.socialLinks.youtube}
              onChange={handleSocialChange}
              placeholder="YouTube URL"
              className="field"
            />
          </div>
          <div>
            <label htmlFor="linkedinUrl" className="mb-1 block text-sm font-semibold text-slate-700">
              LinkedIn URL
            </label>
            <input
              id="linkedinUrl"
              name="linkedin"
              value={profile.socialLinks.linkedin}
              onChange={handleSocialChange}
              placeholder="LinkedIn URL"
              className="field"
            />
          </div>

          <button type="submit" className="btn-primary md:col-span-2">
            Save Academy Details
          </button>
        </form>
        {feedback.message ? (
          <p className={`mt-3 text-sm ${feedback.type === "success" ? "text-brand-700" : "text-red-600"}`}>
            {feedback.message}
          </p>
        ) : null}
      </section>

      <section className="panel">
        <h2 className="text-xl font-semibold text-slate-900">Change Password</h2>
        <form onSubmit={changePassword} className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="currentPassword" className="mb-1 block text-sm font-semibold text-slate-700">
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              value={passwordForm.currentPassword}
              onChange={(event) =>
                setPasswordForm((prev) => ({ ...prev, currentPassword: event.target.value }))
              }
              placeholder="Current Password"
              className="field"
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="mb-1 block text-sm font-semibold text-slate-700">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={passwordForm.newPassword}
              onChange={(event) =>
                setPasswordForm((prev) => ({ ...prev, newPassword: event.target.value }))
              }
              placeholder="New Password"
              className="field"
              required
            />
          </div>
          <button type="submit" className="btn-secondary md:col-span-2">
            Update Password
          </button>
        </form>
        {passwordFeedback.message ? (
          <p
            className={`mt-3 text-sm ${
              passwordFeedback.type === "success" ? "text-brand-700" : "text-red-600"
            }`}
          >
            {passwordFeedback.message}
          </p>
        ) : null}
      </section>
    </div>
  );
};

export default SettingsPage;
