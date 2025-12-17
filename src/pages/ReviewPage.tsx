import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormData } from "./FormPage";
import { Phone, Send, ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { uploadMultipleFiles } from "@/lib/uploadFile";
import { useLanguage } from "@/contexts/LanguageContext"; 

const ReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const formData = location.state?.formData as FormData;
  const formType = location.state?.formType || "formation";
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState("");

  if (!formData) {
    navigate("/");
    return null;
  }

  // Détecter si c'est une inscription formation
  const isFormation = formType === "formation";

  const projectLabelKey: Record<string, string> = {
    "Appartement": 'project.type.apartment',
    "Villa": 'project.type.villa',
    "Maison": 'project.type.house',
    "Magasin": 'project.type.store',
    "Plateau Bureau": 'project.type.office',
  };

  const formatWhatsAppMessage = (fileUrls: string[] = []) => {
    if (isFormation) {
      // Message pour inscription formation
      const message = `🎓 ${t('review.inscriptionDetails')}\n\n${t('review.formation')}: *${t(`formation.options.${formData.projectType}.name`)}*\n${t('review.fullName')}: *${formData.city}*\n${t('review.phone')}: *${formData.surface}*\n${t('review.email')}: *${formData.floors}*\n\n━━━━━━━━━━━━━━━\n📲 ${t('toast.preparedDesc')}`;
      return encodeURIComponent(message);
    }

    // Message pour projet architecture
    const tasksText = formData.tasks && formData.tasks.length > 0
      ? `\n\n✅ *${t('review.tasks')}*\n${formData.tasks.map(t => `• ${t}`).join('\n')}`
      : '';

    const filesText = fileUrls.length > 0
      ? fileUrls.map((url, index) => `• ${t('review.filesCount').replace('fichier(s)', '')} ${index + 1} : ${url}`).join('\n')
      : t('review.noFiles');

    const projectTypeLabel = projectLabelKey[formData.projectType] ? t(projectLabelKey[formData.projectType]) : formData.projectType;

    const message = `📐 ${t('review.projectDetails')}\n\n${t('review.projectType')}: *${projectTypeLabel}*\n${t('review.surface')}: *${formData.surface} m²*\n${t('review.floors')}: *${formData.floors}*\n${t('review.city')}: *${formData.city}*\n${t('review.landRef')}: *${formData.landReference || t('review.notSpecified')}*\n\n${t('review.remarks')}\n${formData.remarks || t('review.notSpecified')}${tasksText}\n\n${t('review.documents')}\n${filesText}\n\n📲 ${t('toast.preparedDesc')}`;

    return encodeURIComponent(message);
  };

  const handleSendToWhatsApp = async () => {
    setIsUploading(true);
    setUploadProgress(0);
    setCurrentFile("");

    try {
      const fileUrls: string[] = [];

      // For formations, no file upload - just send WhatsApp message
      if (isFormation || !formData.images || formData.images.length === 0) {
        const message = formatWhatsAppMessage(fileUrls);
        const whatsappUrl = `https://wa.me/212665051381?text=${message}`;
        window.open(whatsappUrl, "_blank");

        toast({
          title: t('toast.prepared'),
          description: t('toast.preparedDesc'),
        });

        setTimeout(() => {
          navigate("/success");
        }, 1000);
      } else {
        // For projects with uploaded files, upload them first
        const uploadedUrls = await uploadMultipleFiles(
          formData.images,
          (index, fileName, progress) => {
            setCurrentFile(fileName);
          },
          (totalProgress) => {
            setUploadProgress(totalProgress);
          }
        );

        const message = formatWhatsAppMessage(uploadedUrls);
        const whatsappUrl = `https://wa.me/212665051381?text=${message}`;
        window.open(whatsappUrl, "_blank");

        toast({
          title: t('toast.prepared'),
          description: t('toast.preparedDesc'),
        });

        setTimeout(() => {
          navigate("/success");
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error instanceof Error ? error.message : "Une erreur inconnue est survenue";
      toast({
        title: t('toast.error'),
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      setCurrentFile("");
    }
  };

  const handleCall = () => {
    window.location.href = "tel:+212665051381";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('form.back')}
        </Button>

        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">{t('review.title')}</h1>
          <p className="text-muted-foreground mb-8">{t('review.subtitle')}</p>

          <Card className="shadow-[var(--shadow-elegant)] mb-8">
            <CardHeader>
              <CardTitle>{isFormation ? t('review.inscriptionDetails') : t('review.projectDetails')}</CardTitle>
            </CardHeader> 
            <CardContent className="space-y-4">
              {isFormation ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('review.formation')}</p>
                    <p className="font-medium">{t(`formation.options.${formData.projectType}.name`)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('review.phone')}</p>
                    <p className="font-medium">{formData.surface}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('review.fullName')}</p>
                    <p className="font-medium">{formData.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('review.email')}</p>
                    <p className="font-medium">{formData.floors}</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('review.projectType')}</p>
                    <p className="font-medium">{projectLabelKey[formData.projectType] ? t(projectLabelKey[formData.projectType]) : formData.projectType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('review.surface')}</p>
                    <p className="font-medium">{formData.surface} m²</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('review.city')}</p>
                    <p className="font-medium">{formData.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('review.floors')}</p>
                    <p className="font-medium">{formData.floors}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">{t('review.landRef')}</p>
                    <p className="font-medium">{formData.landReference || t('review.notSpecified')}</p>
                  </div>
                </div>
              )}

              {formData.remarks && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">{t('review.remarks')}</p>
                  <p className="text-sm">{formData.remarks}</p>
                </div>
              )}

              {formData.tasks && formData.tasks.length > 0 && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">{t('review.tasks')}</p>
                  <ul className="space-y-1">
                    {formData.tasks.map((task, index) => (
                      <li key={index} className="text-sm flex items-center">
                        <span className="text-primary mr-2">✓</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div> 
              )}

              {formData.images.length > 0 && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">{t('review.documents')}</p>
                  <p className="text-sm font-medium">{formData.images.length} {t('review.filesCount')}</p>
                </div> 
              )}
            </CardContent>
          </Card>

          {isUploading && formData.images.length > 0 && (
            <Card className="mb-6 overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{t('review.uploading')}</span>
                    <span className="text-muted-foreground">{uploadProgress}%</span>
                  </div>

                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>

                  {currentFile && (
                    <p className="text-xs text-muted-foreground truncate">
                      {currentFile}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleSendToWhatsApp}
              className="flex-1 h-14 text-lg bg-[#25D366] hover:bg-[#20BD5A] text-white"
              size="lg"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {t('review.uploading')}
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  {t('review.sendWhatsApp')}
                </>
              )} 
            </Button>
            <Button
              onClick={handleCall}
              variant="outline"
              className="h-14 text-lg"
              size="lg"
            >
              <Phone className="mr-2 h-5 w-5" />
              {t('review.call')}
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">{t('review.sentTo')} 0665051381</p> 
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
