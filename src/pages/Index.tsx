import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import villaHero from "@/assets/villa-sunset-hero.jpg";
import teamOffice from "@/assets/team-office-new.jpg";
import casablancaAerial from "@/assets/casablanca-aerial.jpg";
import buildingEntrance from "@/assets/building-entrance.jpg";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const heroTitleLines = t('hero.title').split('\n');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Villa */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${villaHero})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="hero-overlay absolute inset-0" />
        
        <div className="container mx-auto px-4 relative z-10">

          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Building2 className="h-8 w-8 text-white" />
              <span className="text-white font-semibold text-lg tracking-wide uppercase">{t('hero.badge')}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-center text-white animate-fade-in">
              {heroTitleLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i !== heroTitleLines.length - 1 && <br />}
                </span>
              ))}
            </h1>
            
            <p className="text-lg md:text-xl mb-12 text-white/95 font-normal leading-relaxed text-center max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {t('hero.subtitle')}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <Button
                onClick={() => navigate("/form?type=project")}
                size="lg"
                className="relative bg-primary text-white border-2 border-white px-8 py-4 text-base font-medium rounded-lg shadow-lg min-w-[220px] overflow-hidden group"
              >
                <span className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-lg scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-[5000ms] ease-out"></span>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">{t('hero.cta.project')}</span>
              </Button>
              
              {/* Button for formations */}
              <Button
                onClick={() => navigate("/form?type=formation")}
                size="lg"
                variant="outline"
                className="relative bg-transparent border-2 border-white text-white px-8 py-4 text-base font-medium rounded-lg backdrop-blur-sm min-w-[220px] overflow-hidden group"
              >
                <span className="absolute inset-0 bg-primary rounded-lg scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-[5000ms] ease-out"></span>
                <span className="relative z-10">{t('hero.cta.formation')}</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Différence Section */}
      <section className="py-32 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-5xl md:text-6xl font-semibold text-center mb-20 tracking-tight">{t('difference.title')}</h2>
            
            <div className="grid md:grid-cols-2 gap-10 md:gap-16">
              {/* Projets d'Architecture */}
                <div className="space-y-7 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="bg-primary py-5 px-8 rounded-lg shadow-elegant">
                  <h3 className="font-heading text-2xl font-semibold text-center text-primary-foreground tracking-wide">{t('difference.projects.title')}</h3>
                </div>

                <div className="p-6 bg-card rounded-lg shadow-[var(--shadow-soft)] border border-border hover:shadow-[var(--shadow-elegant)] transition-all duration-300">
                  <p className="font-body text-base leading-relaxed">
                  {t('difference.projects.desc')}
                  </p>
                </div>
                </div>

                {/* Formations aux Logiciels */}
                <div className="space-y-7 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="bg-primary py-5 px-8 rounded-lg shadow-elegant">
                  <h3 className="font-heading text-2xl font-semibold text-center text-primary-foreground tracking-wide">{t('difference.formations.title')}</h3>
                </div>

                <div className="p-6 bg-card rounded-lg shadow-[var(--shadow-soft)] border border-border hover:shadow-[var(--shadow-elegant)] transition-all duration-300">
                  <p className="font-body text-base leading-relaxed">
                  {t('difference.formations.desc')}
                  </p>
                </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Équipe Section */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 animate-fade-in">
                <h2 className="font-heading text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
                  {t('team.title')}
                </h2>
                <div className="space-y-6">
                  <p className="font-body text-lg text-muted-foreground leading-relaxed">
                    {t('team.p1')}
                  </p>
                  <p className="font-body text-lg text-muted-foreground leading-relaxed">
                    {t('team.p2')}
                  </p>
                  <p className="font-body text-lg text-muted-foreground leading-relaxed">
                    {t('team.p3')}
                  </p>
                </div>
                <div className="pt-6">
                  <Button
                    onClick={() => navigate("/portfolio")}
                    size="lg"
                    className="h-14 px-10 text-base font-medium shadow-elegant hover:shadow-strong transition-all duration-300"
                  >
                    {t('team.cta')}
                  </Button>
                </div>
              </div>
              <div className="animate-scale-in" style={{ animationDelay: "0.2s" }}>
                <div className="relative">
                  <img 
                    src={teamOffice} 
                    alt="Équipe d'architectes au travail" 
                    className="rounded-2xl shadow-elegant w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bureau Casablanca Section */}
      <section className=" bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-card rounded-3xl shadow-elegant overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left side - Images */}
                <div className="relative h-[500px] lg:h-auto">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${casablancaAerial})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  
                  {/* Floating building entrance card - bottom left */}
                  <div className="absolute bottom-6 left-6 w-48 h-56 rounded-xl shadow-strong overflow-hidden border-4 border-white animate-scale-in" style={{ animationDelay: "0.3s" }}>
                    <img 
                      src={buildingEntrance} 
                      alt="Entrée de l'immeuble - Espace Ranime" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Right side - Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-between">
                  <div className="space-y-6">
                    <h2 className="font-heading text-4xl md:text-5xl font-semibold tracking-tight">
                      {t('office.title')}
                    </h2>
                    <p className="font-body text-base text-muted-foreground leading-relaxed">
                      {t('office.desc')}
                    </p>
                    
                    {/* Address */}
                    <div className="pt-4 space-y-1 font-body text-sm">
                      <p className="font-semibold">{t('office.floor')}</p>
                      <p>{t('office.street')}</p>
                      <p>{t('office.boulevard')}</p>
                    </div>
                  </div>

                  {/* Google Maps */}
                  <div className="mt-8">
                    <div className="rounded-xl overflow-hidden shadow-md border border-border">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.8!2d-7.6196!3d33.5731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd6b51c6d0c1%3A0x0!2s16%20Rue%20des%20Asphod%C3%A8les%2C%20Casablanca!5e0!3m2!1sfr!2sma!4v1234567890"
                        width="100%"
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`${t('office.title')} - ${t('office.street')}, ${t('office.boulevard')}`} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-5xl md:text-6xl font-semibold mb-8 tracking-tight">{t('cta.title')}</h2>
            <p className="font-body text-xl md:text-2xl text-muted-foreground mb-12 font-light leading-relaxed">
              {t('cta.subtitle')}
            </p> 
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/form?type=project")}
                size="lg"
                className="h-16 px-14 text-base font-medium shadow-elegant hover:shadow-strong transition-all duration-300"
              >
                {t('cta.submit')}
              </Button>
              <Button
                onClick={() => navigate("/form?type=formation")}
                size="lg"
                variant="outline"
                className="h-16 px-14 text-base font-medium shadow-elegant hover:shadow-strong transition-all duration-300 border-2"
              >
                {t('cta.formations')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-border/10">
        <div className="container mx-auto px-4 text-center">
          <p className="font-body text-sm font-light tracking-wide">
            {t('footer.rights')}
          </p>
            <a
            href="https://wa.me/212665051381"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm mt-3 opacity-90 font-light inline-flex items-center gap-2 hover:opacity-100 hover:text-white-400 hover:-translate-y-1 hover:scale-105 transition-transform transform duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded"
            aria-label={t('footer.contactAria')}
            >
            {t('footer.contact')} +212 665 051 381
            </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;