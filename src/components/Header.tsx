import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import abLogo from "@/assets/ab-logo.png";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);

  // Only show the full header on the Portfolio page
  if (location.pathname !== "/portfolio") return null;

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="w-full bg-white/80 backdrop-blur-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center">
        {/* Logo on the left (fixed position) */}
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2"
            onClick={() => navigate("/")}
          >
            <img src={abLogo} alt="ab-logo" className="h-8 w-8" />
            <span className="font-semibold">AB</span>
          </button>
        </div>

        {/* Spacer keeps logo in place while other items are aligned to the right */}
        <div className="ml-auto flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-4">
            <button
              className="text-sm text-muted-foreground"
              onClick={() => navigate("/")}
            >
              {t("nav.home")}
            </button>
            <button
              className="text-sm text-muted-foreground"
              onClick={() => navigate("/portfolio")}
            >
              {t("nav.about")}
            </button>
            <button
              className="text-sm text-muted-foreground"
              onClick={scrollToContact}
            >
              {t("nav.contact")}
            </button>
          </nav>

          {/* Language switcher on the right */}
          <div>
            <LanguageSwitcher />
          </div>

          {/* Mobile menu toggle stays on the right */}
          <button
            className="md:hidden p-2"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t">
          <div className="px-4 py-3 flex flex-col gap-2">
            <button onClick={() => { navigate("/"); setOpen(false); }}>{t("nav.home")}</button>
            <button onClick={() => { navigate("/portfolio"); setOpen(false); }}>{t("nav.about")}</button>
            <button onClick={() => { scrollToContact(); setOpen(false); }}>{t("nav.contact")}</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
