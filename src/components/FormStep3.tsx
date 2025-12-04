import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "@/pages/FormPage";
import { Check, Mail, Phone, User, GraduationCap } from "lucide-react";

interface FormStep3Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
}

const FormStep3 = ({ formData, updateFormData, onNext }: FormStep3Props) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.city?.trim()) newErrors.city = "Le nom et prénom sont requis";
    if (!formData.surface?.trim()) newErrors.surface = "Le numéro est requis";
    if (!formData.floors?.trim()) newErrors.floors = "L'email est requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.floors)) {
      newErrors.floors = "Email invalide";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto px-4">
      <div className="text-center mb-10 animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Vos informations
        </h2>
        <p className="text-lg text-muted-foreground">
          Dernière étape : vérifiez et confirmez vos informations
        </p>
      </div>

      {/* Form Fields */}
      <div className="bg-white rounded-xl shadow-lg border border-border p-8 space-y-6 animate-scale-in">
        <div>
          <Label htmlFor="city" className="text-base font-semibold flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-primary" />
            Nom & Prénom *
          </Label>
          <Input
            id="city"
            placeholder="Entrez votre nom complet"
            value={formData.city}
            onChange={(e) => {
              updateFormData({ city: e.target.value });
              setErrors((prev) => ({ ...prev, city: "" }));
            }}
            className="h-12 text-base"
          />
          {errors.city && (
            <p className="text-destructive text-sm mt-2">{errors.city}</p>
          )}
        </div>

        <div>
          <Label htmlFor="surface" className="text-base font-semibold flex items-center gap-2 mb-3">
            <Phone className="w-4 h-4 text-primary" />
            Numéro *
          </Label>
          <Input
            id="surface"
            type="tel"
            placeholder="Entrez votre numéro de téléphone"
            value={formData.surface}
            onChange={(e) => {
              updateFormData({ surface: e.target.value });
              setErrors((prev) => ({ ...prev, surface: "" }));
            }}
            className="h-12 text-base"
          />
          {errors.surface && (
            <p className="text-destructive text-sm mt-2">{errors.surface}</p>
          )}
        </div>

        <div>
          <Label htmlFor="formation" className="text-base font-semibold flex items-center gap-2 mb-3">
            <GraduationCap className="w-4 h-4 text-primary" />
            Formation
          </Label>
          <div className="h-12 px-4 flex items-center bg-secondary/50 border border-border rounded-lg">
            <span className="text-base font-medium text-foreground">
              {formData.projectType || "Non sélectionnée"}
            </span>
          </div>
        </div>

        <div>
          <Label htmlFor="floors" className="text-base font-semibold flex items-center gap-2 mb-3">
            <Mail className="w-4 h-4 text-primary" />
            Email *
          </Label>
          <Input
            id="floors"
            type="email"
            placeholder="Entrez votre adresse email"
            value={formData.floors}
            onChange={(e) => {
              updateFormData({ floors: e.target.value });
              setErrors((prev) => ({ ...prev, floors: "" }));
            }}
            className="h-12 text-base"
          />
          {errors.floors && (
            <p className="text-destructive text-sm mt-2">{errors.floors}</p>
          )}
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border-2 border-primary/20 p-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Check className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Récapitulatif de l'inscription</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-border/50">
            <span className="text-muted-foreground">Nom complet</span>
            <span className="font-semibold text-foreground">
              {formData.city || "—"}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-border/50">
            <span className="text-muted-foreground">Numéro de téléphone</span>
            <span className="font-semibold text-foreground">
              {formData.surface || "—"}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-border/50">
            <span className="text-muted-foreground">Formation choisie</span>
            <span className="font-semibold text-primary">
              {formData.projectType || "—"}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-3">
            <span className="text-muted-foreground">Adresse email</span>
            <span className="font-semibold text-foreground">
              {formData.floors || "—"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <Button 
          type="submit" 
          size="lg" 
          className="formation-button min-w-[240px] text-base"
        >
          Valider l'inscription
        </Button>
      </div>
    </form>
  );
};

export default FormStep3;
