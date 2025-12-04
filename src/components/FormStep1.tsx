import { FormData } from "@/pages/FormPage";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import villaHero from "@/assets/villa-sunset-hero.jpg";

interface FormStep1Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
}

const formations = [
  {
    name: "AutoCAD",
    description: "Maîtrisez le dessin technique 2D/3D",
    skills: "Plans, coupes, façades",
    level: "Débutant à Avancé",
    duration: "40 heures",
    isPaid: false
  },
  {
    name: "Revit",
    description: "BIM et modélisation architecturale",
    skills: "Maquettes numériques, coordination",
    level: "Intermédiaire",
    duration: "50 heures",
    isPaid: false
  },
  {
    name: "3ds Max",
    description: "Rendus 3D photoréalistes",
    skills: "Modélisation, textures, éclairage",
    level: "Intermédiaire à Avancé",
    duration: "45 heures",
    isPaid: false
  },
  {
    name: "Formation sur DOC",
    description: "Documentation technique professionnelle",
    skills: "Standards, nomenclature, dossiers",
    level: "Débutant",
    duration: "30 heures",
    isPaid: false
  },
  {
    name: "Pack Formation",
    description: "Parcours complet multi-logiciels",
    skills: "AutoCAD + Revit + 3ds Max",
    level: "Tous niveaux",
    duration: "120 heures",
    isPaid: false
  },
  {
    name: "Formation Payante",
    description: "Acheter une formation et apprendre seul",
    skills: "Auto-étude, accès illimité aux ressources",
    level: "Auto-apprentissage",
    duration: "Accès permanent",
    isPaid: true
  }
];

const FormStep1 = ({ formData, updateFormData, onNext }: FormStep1Props) => {
  const handleFormationSelect = (formationName: string) => {
    updateFormData({ projectType: formationName });
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in">
            Choisissez votre formation
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Sélectionnez une formation pour découvrir son planning détaillé et vous inscrire
          </p>
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
                    onClick={() => handleFormationSelect(formation.name)}
                    className="formation-card text-left group animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {formation.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {formation.description}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <span className="text-xs font-medium text-primary bg-secondary px-3 py-1 rounded-full">
                        {formation.level}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formation.duration}
                      </span>
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="tooltip-content">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-base text-foreground">{formation.name}</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Compétences :</span> {formation.skills}</p>
                      <p><span className="font-medium">Niveau :</span> {formation.level}</p>
                      <p><span className="font-medium">Durée :</span> {formation.duration}</p>
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
