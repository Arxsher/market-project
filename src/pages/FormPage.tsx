import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import FormStep1 from "@/components/FormStep1";
import FormStep2 from "@/components/FormStep2";
import FormStep3 from "@/components/FormStep3";
import FormStep1Project from "@/components/FormStep1Project";
import FormStep2Project from "@/components/FormStep2Project";
import FormStep3Project from "@/components/FormStep3Project";
import ProgressStepper from "@/components/ProgressStepper";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export interface FormData {
  projectType: string;
  surface: string;
  city: string;
  floors: string;
  landReference: string;
  remarks: string;
  images: File[];
  tasks: string[];
  name?: string;
  phone?: string;
  email?: string;
}

const FormPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const formType = searchParams.get("type") || "formation";
  const isProjectFlow = formType === "project";
  const totalSteps = 3;

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    projectType: "",
    surface: "",
    city: "",
    floors: "",
    landReference: "",
    remarks: "",
    images: [],
    tasks: [],
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/review", { state: { formData, formType } });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/");
    }
  };

  const renderStep = () => {
    if (isProjectFlow) {
      switch (currentStep) {
        case 1:
          return <FormStep1Project formData={formData} updateFormData={updateFormData} onNext={handleNext} />;
        case 2:
          return <FormStep2Project formData={formData} updateFormData={updateFormData} onNext={handleNext} />;
        case 3:
          return <FormStep3Project formData={formData} updateFormData={updateFormData} onNext={handleNext} />;
        default:
          return null;
      }
    } else {
      switch (currentStep) {
        case 1:
          return <FormStep1 formData={formData} updateFormData={updateFormData} onNext={handleNext} />;
        case 2:
          return <FormStep2 formData={formData} updateFormData={updateFormData} onNext={handleNext} />;
        case 3:
          return <FormStep3 formData={formData} updateFormData={updateFormData} onNext={handleNext} />;
        default:
          return null;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('form.back')}
          </Button> 
        </div>

        <ProgressStepper currentStep={currentStep} totalSteps={totalSteps} />

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-12 max-w-5xl mx-auto">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default FormPage;
