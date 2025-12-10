import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormData } from "@/pages/FormPage";
import { Calendar, Clock, Target, BookOpen, ChevronDown, ChevronUp } from "lucide-react";

interface FormStep2Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
}

const planningData: Record<string, any> = {
  "AutoCAD": {
    modules: [
      { name: "Introduction à AutoCAD", content: "Interface, outils de base, premiers dessins", duration: "S1-S2" },
      { name: "Dessin 2D avancé", content: "Calques, blocs, annotations, cotations", duration: "S3-S4" },
      { name: "Modélisation 3D", content: "Volumes, surfaces, rendu basique", duration: "S5-S6" },
      { name: "Projet pratique", content: "Plan complet d'une villa moderne", duration: "S7-S8" }
    ]
  },
  "Revit": {
    modules: [
      { name: "Introduction au BIM", content: "Concepts BIM, interface Revit, navigation", duration: "S1-S2" },
      { name: "Modélisation architecturale", content: "Murs, sols, toits, escaliers", duration: "S3-S5" },
      { name: "Documentation", content: "Plans, coupes, détails, nomenclatures", duration: "S6-S7" },
      { name: "Familles et rendu", content: "Création de familles, rendu photoréaliste", duration: "S8-S10" }
    ]
  },
  "3ds Max": {
    modules: [
      { name: "Interface et modélisation", content: "Primitives, modificateurs, modélisation poly", duration: "S1-S3" },
      { name: "Matériaux et textures", content: "Shader, UV mapping, textures réalistes", duration: "S4-S5" },
      { name: "Éclairage et caméras", content: "Lumières, caméras, composition", duration: "S6-S7" },
      { name: "Rendu et post-production", content: "V-Ray, Corona, retouches finales", duration: "S8-S9" }
    ]
  },
  "Formation DCE": {
    modules: [
      { name: "Standards de documentation", content: "Normes, formats, échelles", duration: "S1-S2" },
      { name: "Plans d'exécution", content: "Détails techniques, nomenclature", duration: "S3-S4" },
      { name: "Dossiers réglementaires", content: "Permis de construire, CCTP", duration: "S5-S6" }
    ]
  },
  "Formation Présentielle & En ligne": {
    modules: [
      { name: "AutoCAD Foundation", content: "Maîtrise complète du dessin 2D/3D", duration: "S1-S8" },
      { name: "Revit Architecture", content: "BIM et maquette numérique", duration: "S9-S18" },
      { name: "3ds Max Rendu", content: "Visualisation photoréaliste", duration: "S19-S27" },
      { name: "Projet de synthèse", content: "Villa complète de A à Z", duration: "S28-S30" }
    ]
  },
  "Pack Formations & Bibliothèque": {
    modules: [
      { 
        name: "Module - Pack Complet", 
        content: "Parcours complet multi-logiciels de A à Z", 
        duration: "Accès permanent",
        expandable: true
      }
    ],
    description: `حزمة دورات تدريبية من الألف إلى الياء
من الصفر إلى الاحتراف

وثائق إدارية في الهندسة المدنية والأشغال العمومية
+100 ملف شامل لكل ما يتعلق بالهندسة المدنية وأشغال البناء

تدريب كامل من الألف إلى الياء:

AutoCAD
Archicad
REVIT ARCHITECTURE & STRUCTURE & MEP & BIM
ROBOT STRUCTURE ANALYSIS "الخرسانة المسلحة والهياكل المعدنية"
COVADIS VRD والطرق
الهندسة الإنشائية المعدنية (Construction Métallique)
Lumion
Sketchup
CYPECAD / CYPE 3D
CANECO
DIALUX
CIVIL 3D
Ms Project
المترية والميزانية (Métré TCE)
Microsoft Excel
وغيرها من الدورات......

دورات عبارة عن فيديوهات مسجلة باحتراف، كل ما ذكرنا وأكثر من 200 ساعة في المجموع، بالإضافة إلى الوثائق

الوثائق التقنية - مذكرة حساب - مخططات -
التقرير اليومي - تقدم المشروع - وصف المناقصة العمومية - CCAG - DGA

والعديد غيرها
كل هذا بسعر رمزي جداً

لمزيد من المعلومات، تواصل معنا على الواتساب`
  }
};

const FormStep2 = ({ formData, updateFormData, onNext }: FormStep2Props) => {
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const selectedFormation = formData.projectType || "AutoCAD";
  const planning = planningData[selectedFormation] || planningData["AutoCAD"];

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
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Planning – {selectedFormation}
        </h2>
        <p className="text-lg text-muted-foreground">
          Découvrez le parcours pédagogique détaillé de votre formation
        </p>
      </div>

      {/* Key Info Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-10 animate-scale-in">
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-5 border border-primary/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-foreground">Durée</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {selectedFormation === "Pack Formations & Bibliothèque" ? "À votre rythme" : `${planning.modules.length * 5} heures`}
          </p>
        </div>

        <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-5 border border-accent/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-accent" />
            </div>
            <span className="font-semibold text-foreground">Modules</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {planning.modules.length} modules progressifs
          </p>
        </div>

        <div className="bg-gradient-to-br from-primary-light/10 to-primary-light/5 rounded-xl p-5 border border-primary-light/20">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary-light/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary-light" />
            </div>
            <span className="font-semibold text-foreground">Objectif</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Formation professionnelle
          </p>
        </div>
      </div>


      {/* Planning Table */}
      <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="bg-gradient-to-r from-primary to-primary-light p-6">
          <h3 className="text-xl font-bold text-white">Programme détaillé</h3>
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
                      {module.name}
                      {module.expandable && (
                        expandedModule === index ? 
                          <ChevronUp className="w-5 h-5 text-primary" /> : 
                          <ChevronDown className="w-5 h-5 text-primary" />
                      )}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {module.content}
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
              {module.expandable && expandedModule === index && planning.description && (
                <div className="px-6 pb-6 animate-fade-in">
                  <div className="bg-gradient-to-br from-secondary/50 to-background rounded-xl p-6 border border-border" dir="rtl">
                    <h3 className="text-xl font-bold text-foreground mb-4 text-right">تفاصيل الحزمة</h3>
                    <div className="text-muted-foreground whitespace-pre-line text-right leading-relaxed">
                      {planning.description}
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
          Continuer
        </Button>
      </div>
    </form>
  );
};

export default FormStep2;
