import { FormData } from "@/pages/FormPage";
import { Building2, Home, ShoppingBag, Briefcase, Building } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FormStep1ProjectProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
}

const projectTypes = [
  { name: "Appartement", icon: Building2 },
  { name: "Villa", icon: Home },
  { name: "Maison", icon: Home },
  { name: "Magasin", icon: ShoppingBag },
  { name: "Plateau Bureau", icon: Briefcase }
];

const FormStep1Project = ({ formData, updateFormData, onNext }: FormStep1ProjectProps) => {
  const { t } = useLanguage();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const projectLabelKey: Record<string, string> = {
    "Appartement": 'project.type.apartment',
    "Villa": 'project.type.villa',
    "Maison": 'project.type.house',
    "Magasin": 'project.type.store',
    "Plateau Bureau": 'project.type.office',
  };

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.projectType) newErrors.projectType = t('error.projectTypeRequired');
    if (!formData.city) newErrors.city = t('error.cityRequired');
    if (!formData.surface) newErrors.surface = t('error.surfaceRequired');
    if (!formData.floors) newErrors.floors = t('error.floorsRequired');

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{t('project.type.title')}</h1>
        <p className="text-muted-foreground text-lg">{t('project.type.subtitle')}</p>
      </div>

      {/* Project Type Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {projectTypes.map((project) => {
          const Icon = project.icon;
          const isSelected = formData.projectType === project.name;
          
          return (
            <button
              key={project.name}
              onClick={() => {
                updateFormData({ projectType: project.name });
                setErrors({ ...errors, projectType: "" });
              }}
              className={`project-card ${isSelected ? "selected" : ""}`}
            >
              <div className="flex flex-col items-center justify-center py-4">
                <Icon className={`w-10 h-10 mb-3 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-sm font-medium text-center ${isSelected ? "text-primary" : "text-foreground"}`}>
                  {t(projectLabelKey[project.name] || project.name)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      {errors.projectType && (
        <p className="text-destructive text-sm mb-4 text-center">{errors.projectType}</p>
      )}

      {/* Input Fields */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="space-y-2">
          <Label htmlFor="surface">{t('project.surface')}</Label>
          <Input
            id="surface"
            type="number"
            placeholder={t('project.surfacePlaceholder')}
            value={formData.surface || ""}
            onChange={(e) => {
              updateFormData({ surface: e.target.value });
              setErrors({ ...errors, surface: "" });
            }}
            className={errors.surface ? "border-destructive" : ""}
          />
          {errors.surface && (
            <p className="text-destructive text-sm">{errors.surface}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">{t('project.city')}</Label>
          <Input
            id="city"
            placeholder={t('project.cityPlaceholder')}
            value={formData.city || ""}
            onChange={(e) => {
              updateFormData({ city: e.target.value });
              setErrors({ ...errors, city: "" });
            }}
            className={errors.city ? "border-destructive" : ""}
          />
          {errors.city && (
            <p className="text-destructive text-sm">{errors.city}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="floors">{t('project.floors')}</Label>
          <Input
            id="floors"
            type="number"
            placeholder={t('project.floorsPlaceholder')}
            value={formData.floors || ""}
            onChange={(e) => {
              updateFormData({ floors: e.target.value });
              setErrors({ ...errors, floors: "" });
            }}
            className={errors.floors ? "border-destructive" : ""}
          />
          {errors.floors && (
            <p className="text-destructive text-sm">{errors.floors}</p>
          )}
        </div>
      </div>

      <Button 
        onClick={validateAndNext}
        className="w-full h-12 text-base font-semibold"
        size="lg"
      >
        {t('form.next')}
      </Button>
    </div>
  );
};

export default FormStep1Project;
