import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes"; // fallback import if available, but we will handle CSS vars directly
import { Droplet, SunMedium } from "lucide-react";

type Palette = {
  id: string;
  label: string;
  vars: Record<string, string>;
};

const PALETTES: Palette[] = [
  {
    id: "default",
    label: "Default",
    vars: {
      "--primary": "0 0% 40%",
      "--primary-foreground": "0 0% 100%",
      "--primary-light": "0 0% 50%",
      "--primary-dark": "0 0% 30%",
    },
  },
  {
    id: "sunset",
    label: "Sunset",
    vars: {
      "--primary": "22 85% 45%",
      "--primary-foreground": "0 0% 100%",
      "--primary-light": "22 85% 55%",
      "--primary-dark": "22 85% 35%",
    },
  },
  {
    id: "teal",
    label: "Teal",
    vars: {
      "--primary": "170 60% 30%",
      "--primary-foreground": "0 0% 100%",
      "--primary-light": "170 60% 40%",
      "--primary-dark": "170 60% 20%",
    },
  },
];

const ColorSwitcher = ({ className }: { className?: string }) => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem("app_palette");
    const i = PALETTES.findIndex((p) => p.id === saved);
    if (i >= 0) {
      setIndex(i);
      applyPalette(PALETTES[i]);
    }
  }, []);

  const applyPalette = (p: Palette) => {
    const root = document.documentElement;
    Object.entries(p.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  };

  const next = () => {
    const nextIndex = (index + 1) % PALETTES.length;
    setIndex(nextIndex);
    localStorage.setItem("app_palette", PALETTES[nextIndex].id);
    applyPalette(PALETTES[nextIndex]);
  };

  return (
    <Button
      variant="default"
      size="sm"
      onClick={next}
      aria-label={`Change theme color (${PALETTES[index].label})`}
      className={`${className || ""} flex items-center gap-2`}
    >
      {index === 0 ? <SunMedium className="w-4 h-4" /> : <Droplet className="w-4 h-4" />}
      <span className="sr-only">{`Palette ${PALETTES[index].label}`}</span>
    </Button>
  );
};

export default ColorSwitcher;
