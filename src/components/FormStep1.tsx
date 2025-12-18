import { FormData } from "@/pages/FormPage";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import villaHero from "@/assets/villa-sunset-hero.jpg";

interface FormStep1Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
}

import { useLanguage } from "@/contexts/LanguageContext"; 
const formations = [
  {
    id: "autocad",
    name: "AutoCAD",
    descriptionKey: "formation.options.autocad.description",
    skillsKey: "formation.options.autocad.skills",
    levelKey: "formation.options.autocad.level",
    durationKey: "formation.options.autocad.duration",
    isPaid: false
  },
  {
    id: "revit",
    name: "Revit",
    descriptionKey: "formation.options.revit.description",
    skillsKey: "formation.options.revit.skills",
    levelKey: "formation.options.revit.level",
    durationKey: "formation.options.revit.duration",
    isPaid: false
  },
  {
    id: "3dsmax",
    name: "3ds Max",
    descriptionKey: "formation.options.3dsmax.description",
    skillsKey: "formation.options.3dsmax.skills",
    levelKey: "formation.options.3dsmax.level",
    durationKey: "formation.options.3dsmax.duration",
    isPaid: false
  },
  {
    id: "dce",
    name: "Formation DCE",
    descriptionKey: "formation.options.dce.description",
    skillsKey: "formation.options.dce.skills",
    levelKey: "formation.options.dce.level",
    durationKey: "formation.options.dce.duration",
    isPaid: false
  },
  {
    id: "presentielle_online",
    name: "Formation Présentielle & En ligne",
    descriptionKey: "formation.options.presentielle_online.description",
    skillsKey: "formation.options.presentielle_online.skills",
    levelKey: "formation.options.presentielle_online.level",
    durationKey: "formation.options.presentielle_online.duration",
    isPaid: false
  },
  {
    id: "pack",
    name: "Pack Formations & Bibliothèque",
    descriptionKey: "formation.options.pack.description",
    skillsKey: "formation.options.pack.skills",
    levelKey: "formation.options.pack.level",
    durationKey: "formation.options.pack.duration",
    isPaid: true
  }
];

const FormStep1 = ({ formData, updateFormData, onNext }: FormStep1Props) => {
  const { t } = useLanguage();

  const handleFormationSelect = (formationId: string) => {
    updateFormData({ projectType: formationId });
    // Automatically go to next step after selection
    setTimeout(() => {
      onNext();
    }, 300);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] -mx-4 md:mx-0">
      {/* Hero Section with Background Image */}
      <div 
        className="relative rounded-none md:rounded-2xl overflow-hidden mb-12"
        style={{
          backgroundImage: `url(${villaHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '400px'
        }}
      >
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[400px] px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in">{t('formation.title')}</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl animate-fade-in" style={{ animationDelay: '0.1s' }}>{t('formation.subtitle')}</p>
        </div>
      </div>

      {/* Formation Cards Grid */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TooltipProvider delayDuration={200}>
            {formations.map((formation, index) => (
              <Tooltip key={formation.name}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleFormationSelect(formation.id)}
                    className="formation-card text-left group animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {t(`formation.options.${formation.id}.name`)}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 max-h-20 overflow-hidden whitespace-pre-line">
                      {t(formation.descriptionKey)}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <span className="text-xs font-medium text-primary bg-secondary px-3 py-1 rounded-full">
                        {t(formation.levelKey)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {t(formation.durationKey)}
                      </span>
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="tooltip-content">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-base text-foreground">{t(`formation.options.${formation.id}.name`)}</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">{t('formation.skills') + ' :'}</span> {t(formation.skillsKey)}</p>
                      <p><span className="font-medium">{t('formation.level') + ' :'}</span> {t(formation.levelKey)}</p>
                      <p><span className="font-medium">{t('formation.duration') + ' :'}</span> {t(formation.durationKey)}</p>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default FormStep1;
