
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";
type ContentDensity = "compact" | "comfortable" | "spacious";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  animations: boolean;
  setAnimations: (enabled: boolean) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  contentDensity: ContentDensity;
  setContentDensity: (density: ContentDensity) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  animations: true,
  setAnimations: () => null,
  highContrast: false,
  setHighContrast: () => null,
  contentDensity: "compact",
  setContentDensity: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  
  const [animations, setAnimations] = useState<boolean>(
    () => localStorage.getItem("animations") !== "false"
  );
  
  const [highContrast, setHighContrast] = useState<boolean>(
    () => localStorage.getItem("highContrast") === "true"
  );
  
  const [contentDensity, setContentDensity] = useState<ContentDensity>(
    () => (localStorage.getItem("contentDensity") as ContentDensity) || "compact"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);
  
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Handle animations
    if (animations) {
      root.classList.remove("reduce-motion");
    } else {
      root.classList.add("reduce-motion");
    }
    
    // Handle high contrast
    if (highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }
    
    // Handle content density
    root.classList.remove("density-compact", "density-comfortable", "density-spacious");
    root.classList.add(`density-${contentDensity}`);
    
  }, [animations, highContrast, contentDensity]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    animations,
    setAnimations: (enabled: boolean) => {
      localStorage.setItem("animations", String(enabled));
      setAnimations(enabled);
    },
    highContrast,
    setHighContrast: (enabled: boolean) => {
      localStorage.setItem("highContrast", String(enabled));
      setHighContrast(enabled);
    },
    contentDensity,
    setContentDensity: (density: ContentDensity) => {
      localStorage.setItem("contentDensity", density);
      setContentDensity(density);
    }
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
