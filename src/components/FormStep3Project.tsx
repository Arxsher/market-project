import { FormData } from "@/pages/FormPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Plus, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FormStep3ProjectProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
}

const FormStep3Project = ({ formData, updateFormData, onNext }: FormStep3ProjectProps) => {
  const { t } = useLanguage();
  const [newTask, setNewTask] = useState("");
  // Initialize from formData if available, otherwise empty
  const [uploadedFiles, setUploadedFiles] = useState<File[]>(formData.images || []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // Combine existing files with new ones
    const newFiles = [...uploadedFiles, ...files];
    setUploadedFiles(newFiles);
    updateFormData({ images: newFiles });
  };

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    updateFormData({ images: newFiles });
  };

  const addTask = () => {
    if (newTask.trim()) {
      const currentTasks = formData.tasks || [];
      updateFormData({ tasks: [...currentTasks, newTask] });
      setNewTask("");
    }
  };

  const removeTask = (index: number) => {
    const currentTasks = formData.tasks || [];
    updateFormData({ tasks: currentTasks.filter((_, i) => i !== index) });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{t('project.docs.title')}</h1>
        <p className="text-muted-foreground text-lg">{t('project.docs.subtitle')}</p>
      </div>

      {/* Upload Zone */}
      <div className="mb-8">
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-12 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
        >
          <Upload className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-foreground font-medium mb-1">{t('project.docs.upload')}</p>
          <p className="text-sm text-muted-foreground">{t('project.docs.formats')}</p>
          <input
            id="file-upload"
            type="file"
            multiple
            accept=".png,.jpg,.jpeg,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.dwg,.dxf,.zip,.rar,.7z"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-secondary p-3 rounded-lg"
              >
                <span className="text-sm text-foreground truncate flex-1">{file.name}</span>
                <button
                  onClick={() => removeFile(index)}
                  className="text-muted-foreground hover:text-destructive ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Tasks */}
      <div className="mb-8">
        <Label className="text-base font-medium mb-3 block">{t('project.tasks') + ' (' + t('project.optional') + ')'}
        </Label>
        <div className="flex gap-2">
          <Input
            placeholder={t('project.tasksPlaceholder')}
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
          />
          <Button
            onClick={addTask}
            variant="outline"
            size="icon"
            className="shrink-0"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Tasks List */}
        {formData.tasks && formData.tasks.length > 0 && (
          <div className="mt-4 space-y-2">
            {formData.tasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-secondary p-3 rounded-lg"
              >
                <span className="text-sm text-foreground">{task}</span>
                <button
                  onClick={() => removeTask(index)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        onClick={onNext}
        className="w-full h-12 text-base font-semibold"
        size="lg"
      >
        {t('form.viewSummary')}
      </Button>
    </div>
  );
};

export default FormStep3Project;
