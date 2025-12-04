import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormData } from "./FormPage";
import { Phone, Send, ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { uploadMultipleFiles } from "@/lib/uploadFile";

const ReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
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
  const formations = ["AutoCAD", "Revit", "3ds Max", "Formation sur DOC", "Pack Formation"];
  const isFormation = formations.includes(formData.projectType);

  const formatWhatsAppMessage = (fileUrls: string[] = []) => {
    if (isFormation) {
      // Message pour inscription formation
      const message = `🎓 *Nouvelle inscription formation*

📚 *Détails de l'inscription*
• Formation : *${formData.projectType}*
• Nom & Prénom : *${formData.city}*
• Téléphone : *${formData.surface}*
• Email : *${formData.floors}*

━━━━━━━━━━━━━━━
📲 Message généré automatiquement depuis l'application Formation Request`;
      return encodeURIComponent(message);
    }

    // Message pour projet architecture
    const tasksText = formData.tasks && formData.tasks.length > 0
      ? `\n\n✅ *Tâches sélectionnées*\n${formData.tasks.map(t => `• ${t}`).join('\n')}`
      : '';

    const filesText = fileUrls.length > 0
      ? fileUrls.map((url, index) => `• Fichier ${index + 1} : ${url}`).join('\n')
      : 'Aucun fichier joint (les documents sont conservés sur votre espace).';

    const message = `📐 *Nouveau projet client – Récapitulatif*

🏠 *Détails du projet*
• Type de projet : *${formData.projectType}*
• Surface : *${formData.surface} m²*
• Nombre d'étages : *${formData.floors}*
• Ville : *${formData.city}*
• Référence du terrain : *${formData.landReference || "Non spécifié"}*

📝 *Remarques du client*
${formData.remarks || "Aucune remarque"}${tasksText}

📎 *Documents fournis par le client*
${filesText}

━━━━━━━━━━━━━━━
📲 Message généré automatiquement depuis l'application Architect Request Now`;

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
          title: "Message préparé!",
          description: "WhatsApp va s'ouvrir avec votre demande.",
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
          title: "Message préparé!",
          description: "WhatsApp va s'ouvrir avec votre demande.",
        });

        setTimeout(() => {
          navigate("/success");
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error instanceof Error ? error.message : "Une erreur inconnue est survenue";
      toast({
        title: "Erreur",
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
          Retour
        </Button>

        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Récapitulatif</h1>
          <p className="text-muted-foreground mb-8">
            Vérifiez vos informations avant l'envoi
          </p>

          <Card className="shadow-[var(--shadow-elegant)] mb-8">
            <CardHeader>
              <CardTitle>{isFormation ? "Détails de l'inscription" : "Détails du Projet"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isFormation ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Formation</p>
                    <p className="font-medium">{formData.projectType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Téléphone</p>
                    <p className="font-medium">{formData.surface}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nom & Prénom</p>
                    <p className="font-medium">{formData.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{formData.floors}</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Type de Projet</p>
                    <p className="font-medium">{formData.projectType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Surface</p>
                    <p className="font-medium">{formData.surface} m²</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ville</p>
                    <p className="font-medium">{formData.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nombre d'étages</p>
                    <p className="font-medium">{formData.floors}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Référence du terrain</p>
                    <p className="font-medium">{formData.landReference || "Non spécifié"}</p>
                  </div>
                </div>
              )}

              {formData.remarks && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Remarques</p>
                  <p className="text-sm">{formData.remarks}</p>
                </div>
              )}

              {formData.tasks && formData.tasks.length > 0 && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Tâches sélectionnées</p>
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
                  <p className="text-sm text-muted-foreground mb-2">
                    Documents joints
                  </p>
                  <p className="text-sm font-medium">
                    {formData.images.length} fichier(s)
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {isUploading && formData.images.length > 0 && (
            <Card className="mb-6 overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Upload en cours...</span>
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
                  Upload en cours...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Envoyer sur WhatsApp
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
              Appeler
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Envoyé à: 0665051381
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
