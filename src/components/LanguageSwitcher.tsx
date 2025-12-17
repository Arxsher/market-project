import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LanguageSwitcher = ({ className }: { className?: string }) => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "ar" : "fr");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className={`flex items-center gap-1 font-medium ${className || ''}`}
      aria-label={language === "fr" ? t('lang.ar') : t('lang.fr')}
    >
      <span className={language === 'ar' ? 'font-semibold' : 'opacity-60'}>AR</span>
      <span className="mx-2 text-muted-foreground">/</span>
      <span className={language === 'fr' ? 'font-semibold' : 'opacity-60'}>FR</span>
      <span className="sr-only">{language === "fr" ? t('lang.ar') : t('lang.fr')}</span>
    </Button>
  );
};

export default LanguageSwitcher;