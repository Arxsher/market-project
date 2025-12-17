import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "ar" : "fr");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 font-medium"
    >
      <Globe className="h-4 w-4" />
      <span>{language === "fr" ? t('lang.ar') : t('lang.fr')}</span>
    </Button>
  );
};

export default LanguageSwitcher;