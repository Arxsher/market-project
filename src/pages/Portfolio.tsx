import { Button } from "@/components/ui/button";
import {
  Phone,
  MapPin,
  Instagram,
  MessageCircle,
  Youtube,
  FolderOpen,
  Award,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import abLogo from "@/assets/ab-logo.png";
import { useState } from "react";
import { Menu, X } from "lucide-react";

// TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
);

const Portfolio = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const services = [
    "Conceptions 2D et 3D",
    "Plans plafond, électricité, menuiserie",
    "Plans carrelage, cuisine, dressing",
    "Revêtements de sol et habillage",
    "CPS, métré TCE",
    "Planning et PV de chantier",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Name */}
            <div className="flex items-center gap-3">
              <img
                src={abLogo}
                alt="AB Logo"
                className="w-12 h-12 md:w-16 md:h-16 object-contain"
              />
              <div>
                <h1 className="text-base md:text-xl font-semibold tracking-tight">
                  AB Anas BENLECHGAR
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Architecture d'intérieur
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost" onClick={() => navigate("/")}>
                Home
              </Button>
              <Button
                variant="ghost"
                onClick={() =>
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                About me
              </Button>
              <Button
                variant="ghost"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Contact
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {open && (
            <div className="md:hidden mt-4 flex flex-col gap-2">
              <Button variant="ghost" onClick={() => navigate("/")}>
                Home
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" });
                  setOpen(false);
                }}
              >
                About me
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                  setOpen(false);
                }}
              >
                Contact
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section with About Me */}
      <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Logo & Name */}
            <div className="space-y-8">
              <div className="space-y-6">
                <img
                  src={abLogo}
                  alt="AB Logo"
                  className="w-40 h-40 object-contain"
                />
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                    AB Anas BENLECHGAR
                  </h1>
                  <p className="text-xl text-muted-foreground font-medium">
                    Architecture d'intérieur
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <h2 className="text-3xl font-bold mb-6">
                  Conception / Aménagement / Travaux
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Transformez vos espaces avec des conceptions innovantes et
                  personnalisées qui reflètent votre vision et votre style
                  unique.
                </p>
              </div>

              {/* Portfolio & Reference Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {/* Portefeuille général */}
                <a
                  href="https://drive.google.com/file/d/1_JoDuia65a3-XHoIwqihWFr1OWKOYV0f/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card rounded-xl shadow-sm p-6 border border-border hover:shadow-md hover:border-primary/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary/60 flex items-center justify-center mb-4 group-hover:bg-secondary transition-colors">
                    <FolderOpen className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    Portefeuille général
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Découvrez l'ensemble de nos réalisations et projets
                    d'architecture d'intérieur
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <span>Voir le portfolio</span>
                    <ExternalLink className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>

                {/* Référence */}
                <a
                  href="https://drive.google.com/file/d/1A3TfZGUFYj2XXsCsRnWyRt1tFIB8Nb2E/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card rounded-xl shadow-sm p-6 border border-border hover:shadow-md hover:border-primary/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary/60 flex items-center justify-center mb-4 group-hover:bg-secondary transition-colors">
                    <Award className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    Référence
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Nos certifications, attestations et références
                    professionnelles
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <span>Voir les références</span>
                    <ExternalLink className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </div>
            </div>

            {/* Right Side - About Me Content */}
            <div
              id="about"
              className="bg-card rounded-2xl shadow-elegant p-8 border border-border scroll-mt-24"
            >
              <h2 className="text-3xl font-semibold mb-6">À propos de moi</h2>

              <div className="space-y-6">
                <div className="prose prose-slate max-w-none">
                  <p className="text-base leading-relaxed text-muted-foreground">
                    <strong className="text-foreground">
                      AB Anas BENLECHGAR
                    </strong>{" "}
                    est un bureau de design d'intérieur et d'aménagement
                    professionnel spécialisé dans la création de concepts
                    personnalisés pour les espaces professionnels et
                    résidentiels.
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Avec une passion pour l'architecture d'intérieur, nous nous
                    engageons à offrir des solutions de design innovantes qui
                    allient esthétique et fonctionnalité. Notre approche repose
                    sur la qualité, la créativité, le professionnalisme et un
                    service personnalisé adapté aux besoins uniques de chaque
                    client.
                  </p>
                </div>

                <div className="pt-4">
                  <h3 className="text-xl font-semibold mb-4">Services</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {services.map((service, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-secondary/40 rounded-lg border border-border hover:bg-secondary/60 transition-colors"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                        <span className="text-sm font-medium">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="text-xl font-semibold mb-4">Compétences</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "AutoCAD",
                      "SketchUp",
                      "3DS Max",
                      "V-Ray",
                      "Photoshop",
                      "Revit",
                      "Lumion",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 bg-gradient-to-b from-background to-secondary/20 scroll-mt-24"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Contactez-nous
              </h2>
              <p className="text-muted-foreground text-lg">
                Notre équipe est à votre écoute pour donner vie à vos projets
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Phone */}
              <div className="bg-card rounded-xl shadow-lg p-8 border border-border hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <Phone className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-center mb-3">
                  Téléphone
                </h3>
                <p className="text-center text-muted-foreground font-medium">
                  +212 665 051 381
                </p>
              </div>

              {/* Address */}
              <div className="bg-card rounded-xl shadow-lg p-8 border border-border hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <MapPin className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-center mb-3">
                  Adresse
                </h3>
                <div className="text-center text-muted-foreground text-sm font-medium space-y-1">
                  <p>6ème étage, Espace Ranime</p>
                  <p>16 Rue des Asphodèles</p>
                  <p>Bd Ghandi</p>
                  <p>Casablanca, Maroc</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-card rounded-xl shadow-lg p-8 border border-border">
              <h3 className="text-2xl font-semibold text-center mb-8">
                {t("portfolio.follow")}
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://linkbio.co/Plateforme-AB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 hover:scale-105 transition-all shadow-sm"
                >
                  <ExternalLink className="h-5 w-5" />
                  <span className="font-medium">Plateforme AB</span>
                </a>
                <a
                  href="https://wa.me/212665051381"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 hover:scale-105 transition-all shadow-sm"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-medium">WhatsApp</span>
                </a>
                <a
                  href="https://www.instagram.com/ab.anas.benlechgar?igsh=MWpyYXpobDE4MTM5Nw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-pink-500/10 text-pink-600 rounded-lg hover:bg-pink-500/20 hover:scale-105 transition-all shadow-sm"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="font-medium">Instagram</span>
                </a>
                <a
                  href="https://youtube.com/@ab.anas.benlechgar?si=RUq_6s2zJcsSBm8v"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-red-500/10 text-red-600 rounded-lg hover:bg-red-500/20 hover:scale-105 transition-all shadow-sm"
                >
                  <Youtube className="h-5 w-5" />
                  <span className="font-medium">YouTube</span>
                </a>
                <a
                  href="https://tiktok.com/@abanassbenlechgar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-gray-500/10 text-gray-700 rounded-lg hover:bg-gray-500/20 hover:scale-105 transition-all shadow-sm"
                >
                  <TikTokIcon className="h-5 w-5" />
                  <span className="font-medium">TikTok</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            © 2025 AB Anas BENLECHGAR. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
