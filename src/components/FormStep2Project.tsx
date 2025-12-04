import { FormData } from "@/pages/FormPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface FormStep2ProjectProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
}

const FormStep2Project = ({ formData, updateFormData, onNext }: FormStep2ProjectProps) => {
  return (
    <div className="max-w-2xl mx-auto px-4 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Informations techniques
        </h1>
        <p className="text-muted-foreground text-lg">
          Ajoutez des détails complémentaires
        </p>
      </div>

      <div className="space-y-6 mb-8">
        <div className="space-y-2">
          <Label htmlFor="landReference">
            Référence du terrain (Titre foncier)
            <span className="text-muted-foreground text-sm ml-2">(Optionnel)</span>
          </Label>
          <Input
            id="landReference"
            placeholder="Ex: TF-12345/67"
            value={formData.landReference || ""}
            onChange={(e) => updateFormData({ landReference: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="remarks">
            Remarques
            <span className="text-muted-foreground text-sm ml-2">(Optionnel)</span>
          </Label>
          <Textarea
            id="remarks"
            placeholder="Ajoutez toute information complémentaire utile pour votre projet..."
            value={formData.remarks || ""}
            onChange={(e) => updateFormData({ remarks: e.target.value })}
            rows={6}
            className="resize-none"
          />
        </div>
      </div>

      <Button 
        onClick={onNext}
        className="w-full h-12 text-base font-semibold"
        size="lg"
      >
        Suivant
      </Button>
    </div>
  );
};

export default FormStep2Project;
