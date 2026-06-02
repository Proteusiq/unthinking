import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ThemeChoice = "auto" | "light" | "dark";
export type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "unthinking.theme";
const THEME_COLORS = { dark: "#08080b", light: "#f5f6fb" } as const;

const isResolved = (value: unknown): value is ResolvedTheme =>
  value === "light" || value === "dark";

const isChoice = (value: unknown): value is ThemeChoice =>
  value === "auto" || isResolved(value);

const readChoice = (): ThemeChoice => {
  if (typeof window === "undefined") return "auto";
  const raw = window.localStorage?.getItem(STORAGE_KEY);
  return isChoice(raw) ? raw : "auto";
};

const systemTheme = (): ResolvedTheme => {
  if (typeof window === "undefined" || !window.matchMedia) return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
};

export const resolveTheme = (choice: ThemeChoice): ResolvedTheme =>
  choice === "auto" ? systemTheme() : choice;

const applyTheme = (theme: ResolvedTheme) => {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  const meta = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]',
  );
  if (meta) meta.setAttribute("content", THEME_COLORS[theme]);
};

interface ThemeContextValue {
  choice: ThemeChoice;
  theme: ResolvedTheme;
  setChoice: (next: ThemeChoice) => void;
  cycle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [choice, setChoiceState] = useState<ThemeChoice>(() => readChoice());
  const [theme, setTheme] = useState<ResolvedTheme>(() =>
    resolveTheme(readChoice()),
  );

  // Track OS theme changes when the user picked "auto".
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      if (choice === "auto") setTheme(systemTheme());
    };
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, [choice]);

  // Re-resolve whenever the explicit choice changes.
  useEffect(() => {
    const next = resolveTheme(choice);
    setTheme(next);
    applyTheme(next);
  }, [choice]);

  // Apply on mount in case the inline boot script raced us.
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setChoice = useCallback((next: ThemeChoice) => {
    setChoiceState(next);
    try {
      window.localStorage?.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage might be unavailable in private mode; ignore.
    }
  }, []);

  const cycle = useCallback(() => {
    setChoice(choice === "light" ? "auto" : choice === "auto" ? "dark" : "light");
  }, [choice, setChoice]);

  const value = useMemo<ThemeContextValue>(
    () => ({ choice, theme, setChoice, cycle }),
    [choice, theme, setChoice, cycle],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
