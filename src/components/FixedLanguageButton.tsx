import React from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "react-router-dom";

const FixedLanguageButton = () => {
  const { language } = useLanguage();
  const location = useLocation();

  // hide fixed button when on Portfolio page to avoid duplication with Header
  if (location.pathname === "/portfolio") return null;

  const base = "fixed top-4 z-50 pointer-events-auto";
  // Always place the fixed language button on the right for consistency
  const pos = "right-4 md:right-6";

  return (
    <div className={`${base} ${pos}`}>
      <LanguageSwitcher className="bg-white/90 text-black shadow-md rounded-md p-2" />
    </div>
  );
};

export default FixedLanguageButton;
