import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormData } from "@/pages/FormPage";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, Clock, Target, BookOpen, ChevronDown, ChevronUp } from "lucide-react";

interface FormStep2Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
}

const planningData: Record<string, any> = {
  "autocad": {
    modules: [
      { nameKey: "planning.modules.autocad.0.name", contentKey: "planning.modules.autocad.0.content", duration: "S1-S2" },
      { nameKey: "planning.modules.autocad.1.name", contentKey: "planning.modules.autocad.1.content", duration: "S3-S4" },
      { nameKey: "planning.modules.autocad.2.name", contentKey: "planning.modules.autocad.2.content", duration: "S5-S6" },
      { nameKey: "planning.modules.autocad.3.name", contentKey: "planning.modules.autocad.3.content", duration: "S7-S8" }
    ]
  },
  "revit": {
    modules: [
      { nameKey: "planning.modules.revit.0.name", contentKey: "planning.modules.revit.0.content", duration: "S1-S2" },
      { nameKey: "planning.modules.revit.1.name", contentKey: "planning.modules.revit.1.content", duration: "S3-S5" },
      { nameKey: "planning.modules.revit.2.name", contentKey: "planning.modules.revit.2.content", duration: "S6-S7" },
      { nameKey: "planning.modules.revit.3.name", contentKey: "planning.modules.revit.3.content", duration: "S8-S10" }
    ]
  },
  "3dsmax": {
    modules: [
      { nameKey: "planning.modules.3dsmax.0.name", contentKey: "planning.modules.3dsmax.0.content", duration: "S1-S3" },
      { nameKey: "planning.modules.3dsmax.1.name", contentKey: "planning.modules.3dsmax.1.content", duration: "S4-S5" },
      { nameKey: "planning.modules.3dsmax.2.name", contentKey: "planning.modules.3dsmax.2.content", duration: "S6-S7" },
      { nameKey: "planning.modules.3dsmax.3.name", contentKey: "planning.modules.3dsmax.3.content", duration: "S8-S9" }
    ]
  },
  "dce": {
    modules: [
      { nameKey: "planning.modules.dce.0.name", contentKey: "planning.modules.dce.0.content", duration: "S1-S2" },
      { nameKey: "planning.modules.dce.1.name", contentKey: "planning.modules.dce.1.content", duration: "S3-S4" },
      { nameKey: "planning.modules.dce.2.name", contentKey: "planning.modules.dce.2.content", duration: "S5-S6" }
    ]
  },
  "presentielle_online": {
    modules: [
      { nameKey: "planning.modules.presentielle_online.0.name", contentKey: "planning.modules.presentielle_online.0.content", duration: "S1-S8" },
      { nameKey: "planning.modules.presentielle_online.1.name", contentKey: "planning.modules.presentielle_online.1.content", duration: "S9-S18" },
      { nameKey: "planning.modules.presentielle_online.2.name", contentKey: "planning.modules.presentielle_online.2.content", duration: "S19-S27" },
      { nameKey: "planning.modules.presentielle_online.3.name", contentKey: "planning.modules.presentielle_online.3.content", duration: "S28-S30" }
    ]
  },
  "pack": {
    modules: [
      { 
        nameKey: "planning.modules.pack.0.name", 
        contentKey: "planning.modules.pack.0.content", 
        duration: "Accès permanent",
        expandable: true
      }
    ],
    descriptionKey: "formation.options.pack.description"
  }
};

const FormStep2 = ({ formData, updateFormData, onNext }: FormStep2Props) => {
  const { t } = useLanguage();
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const selectedFormation = formData.projectType || "autocad";
  const planning = planningData[selectedFormation] || planningData["autocad"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const toggleModule = (index: number) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto px-4">
      <div className="text-center mb-8 animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t('planning.title')} – {t(`formation.options.${selectedFormation}.name`)}</h2>
        <p className="text-lg text-muted-foreground">{t('planning.subtitle')}</p>
      </div> 

      {/* Key Info Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-10 animate-scale-in">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-5 border border-primary/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-foreground">{t('planning.duration')}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {selectedFormation === "pack" ? t('planning.atYourPace') : `${planning.modules.length * 5} ${t('planning.durationUnit') || 'heures'}`}
          </p>
        </div>

        <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-5 border border-accent/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-accent" />
            </div>
            <span className="font-semibold text-foreground">{t('planning.modules')}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {planning.modules.length} {t('planning.progressive')}
          </p>
        </div>

        <div className="bg-gradient-to-br from-primary-light/10 to-primary-light/5 rounded-xl p-5 border border-primary-light/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary-light/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary-light" />
            </div>
            <span className="font-semibold text-foreground">{t('planning.objective')}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {t('planning.professional')}
          </p>
        </div>
      </div>


      {/* Planning Table */}
      <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="bg-gradient-to-r from-primary to-primary-light p-6">
          <h3 className="text-xl font-bold text-white">{t('planning.detailed')}</h3>
        </div>
        
        <div className="divide-y divide-border">
          {planning.modules.map((module: any, index: number) => (
            <div key={index}>
              <div 
                className={`p-6 hover:bg-secondary/50 transition-colors ${module.expandable ? 'cursor-pointer' : ''}`}
                onClick={() => module.expandable && toggleModule(index)}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">{index + 1}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-foreground text-lg mb-1 flex items-center gap-2">
                      {t(module.nameKey)}
                      {module.expandable && (
                        expandedModule === index ? 
                          <ChevronUp className="w-5 h-5 text-primary" /> : 
                          <ChevronDown className="w-5 h-5 text-primary" />
                      )}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {t(module.contentKey)}
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <div className="flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full">
                      <Clock className="w-4 h-4" />
                      {module.duration}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Expanded Description */}
              {module.expandable && expandedModule === index && planning.descriptionKey && (
                <div className="px-6 pb-6 animate-fade-in">
                  <div className="bg-gradient-to-br from-secondary/50 to-background rounded-xl p-6 border border-border" dir="rtl">
                    <h3 className="text-xl font-bold text-foreground mb-4 text-right">{t('planning.packageDetails')}</h3>
                    <div className="text-muted-foreground whitespace-pre-line text-right leading-relaxed">
                      {t(planning.descriptionKey)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-6">
        <Button 
          type="submit" 
          size="lg" 
          className="formation-button min-w-[200px] text-base"
        >
          {t('form.continue')}
        </Button>
      </div>
    </form>
  );
};

export default FormStep2;
