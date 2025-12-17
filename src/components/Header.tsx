import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import abLogo from "@/assets/ab-logo.png";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-3">
        <div className={`flex items-center justify-between ${language === 'ar' ? 'md:flex-row-reverse' : ''}`}>
          <div className="flex items-center gap-3">
            <img src={abLogo} alt="AB Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
            <div>
              <h1 className="text-base md:text-lg font-semibold tracking-tight">AB Anas BENLECHGAR</h1>
              <p className="text-xs md:text-sm text-muted-foreground">{t('portfolio.interior')}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/')}>{t('nav.home')}</Button>
            <Button variant="ghost" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>{t('nav.about')}</Button>
            <Button variant="ghost" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>{t('nav.contact')}</Button>
            <LanguageSwitcher />
          </nav>

          {/* Right side for mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button onClick={() => setOpen(prev => !prev)} className="ml-2">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {open && (
          <div className="md:hidden mt-3 flex flex-col gap-2">
            <Button variant="ghost" onClick={() => { navigate('/'); setOpen(false); }}>{t('nav.home')}</Button>
            <Button variant="ghost" onClick={() => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); }}>{t('nav.about')}</Button>
            <Button variant="ghost" onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); }}>{t('nav.contact')}</Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
