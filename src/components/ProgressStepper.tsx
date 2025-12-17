import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProgressStepperProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressStepper = ({ currentStep, totalSteps }: ProgressStepperProps) => {
  const { t } = useLanguage();
  const projectStepLabels = [t('step.project'), t('step.details'), t('step.documents')];
  const formationStepLabels = [t('step.formations'), t('step.planning'), t('step.information')];

  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  const stepLabels = totalSteps === 3 && window.location.search.includes("type=project") 
    ? projectStepLabels 
    : formationStepLabels;

  return (
    <div className="flex items-center justify-center max-w-3xl mx-auto mb-12">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center flex-1">
          <div className="flex flex-col items-center flex-1">
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all shadow-md mb-2",
                step <= currentStep
                  ? "bg-gradient-to-br from-primary to-primary-light text-white scale-110"
                  : "bg-white text-muted-foreground border-2 border-border"
              )}
            >
              {step <= currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                step
              )}
            </div>
            <span className={cn(
              "text-xs md:text-sm font-medium transition-colors",
              step <= currentStep ? "text-primary" : "text-muted-foreground"
            )}>
              {stepLabels[index]}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={cn(
              "h-0.5 flex-1 mx-2 transition-all",
              step < currentStep ? "bg-gradient-to-r from-primary to-primary-light" : "bg-border"
            )} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressStepper;
