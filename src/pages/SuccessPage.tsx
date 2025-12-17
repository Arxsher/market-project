import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SuccessPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center animate-scale-in">
        <div className="mb-8 flex justify-center">
          <CheckCircle2 className="h-24 w-24 text-primary" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">{t('success.title')}</h1>
        <p className="text-lg text-muted-foreground mb-8">{t('success.message')}</p>

        <Button
          onClick={() => navigate("/")}
          size="lg"
          className="w-full sm:w-auto"
        >
          <Home className="mr-2 h-5 w-5" />
          {t('success.backHome')}
        </Button> 
      </div>
    </div>
  );
};

export default SuccessPage;
