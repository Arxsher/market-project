import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home } from "lucide-react";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center animate-scale-in">
        <div className="mb-8 flex justify-center">
          <CheckCircle2 className="h-24 w-24 text-primary" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Demande Envoyée!</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Votre demande de projet a été envoyée avec succès. Notre architecte vous contactera très bientôt.
        </p>

        <Button
          onClick={() => navigate("/")}
          size="lg"
          className="w-full sm:w-auto"
        >
          <Home className="mr-2 h-5 w-5" />
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
