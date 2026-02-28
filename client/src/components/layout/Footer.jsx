import { useEffect, useState } from "react";
import http from "../../api/http";
import BrandLogo from "../common/BrandLogo";

const Footer = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await http.get("/settings/public-profile");
        setProfile(data.profile || null);
      } catch (error) {
        setProfile(null);
      }
    };

    loadProfile();
  }, []);

  return (
    <footer className="mt-24 border-t border-brand-100 bg-white/80">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <div>
          <BrandLogo label={profile?.academyName || "Namo Academy"} />
          <p className="mt-3 text-sm text-slate-600">
            {profile?.tagline ||
              "English coaching for fluent reading and writing."}
          </p>
        </div>
        <div>
          <h4 className="font-heading text-base font-semibold text-slate-900">Contact</h4>
          <p className="mt-3 text-sm text-slate-600">Phone: {profile?.phone || "+1 555 987 2211"}</p>
          <p className="text-sm text-slate-600">Email: {profile?.email || "hello@namoacademy.com"}</p>
        </div>
        <div>
          <h4 className="font-heading text-base font-semibold text-slate-900">Follow Us</h4>
          <div className="mt-3 flex gap-3 text-sm text-slate-600">
            <a href={profile?.socialLinks?.facebook || "#"} className="hover:text-brand-700">
              Facebook
            </a>
            <a href={profile?.socialLinks?.instagram || "#"} className="hover:text-brand-700">
              Instagram
            </a>
            <a href={profile?.socialLinks?.youtube || "https://youtube.com/@improveenglish274?si=fzx6YX_cMLz4jC7n"} className="hover:text-brand-700">
              YouTube
            </a>
          </div>
        </div>
      </div>
      <p className="border-t border-brand-50 py-4 text-center text-xs text-slate-500">
        (c) {new Date().getFullYear()} {profile?.academyName || "Namo Academy"}. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
