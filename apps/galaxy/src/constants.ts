import type { ResolvedTheme } from "./theme";

export const GALAXY_RADIUS = 70;

export interface PaperEntry {
  id: number;
  arxiv: string;
  title: string;
  date: string;
  stance: "supports" | "balanced" | "challenges";
  cluster: string;
  core_finding: string;
  smoking_gun: boolean;
  quotes: string[];
  analysis_path: string;
  word_count: number;
}

const GITHUB_BASE = "https://github.com/Proteusiq/unthinking/blob/main/";

export const analysisUrl = (entry: PaperEntry): string =>
  `${GITHUB_BASE}${entry.analysis_path}`;

export const STANCE_PALETTE: Record<
  ResolvedTheme,
  Record<PaperEntry["stance"], string>
> = {
  dark: {
    supports: "#4ade80",
    balanced: "#e2e8f0",
    challenges: "#f87171",
  },
  light: {
    supports: "#16a34a",
    balanced: "#475569",
    challenges: "#dc2626",
  },
};

export const SUN_HALO_COLOR: Record<ResolvedTheme, string> = {
  dark: "#fde68a",
  light: "#f59e0b",
};

export const SMOKING_GUN_ACCENT: Record<ResolvedTheme, string> = {
  dark: "#facc15",
  light: "#b45309",
};

export const stanceColor = (
  stance: PaperEntry["stance"],
  theme: ResolvedTheme = "dark",
): string => STANCE_PALETTE[theme][stance];

// Larger papers carry the argument. Smoking guns are the most prominent;
// otherwise, scale by depth-of-engagement (proxied by analysis word count).
export const paperSize = (entry: PaperEntry): number => {
  if (entry.smoking_gun) return 0.55;
  if (entry.word_count >= 2000) return 0.38;
  if (entry.word_count >= 1400) return 0.28;
  if (entry.word_count >= 900) return 0.22;
  return 0.16;
};

export interface LoadedCorpus {
  entries: PaperEntry[];
  raw: string;
}

export const loadCorpus = async (): Promise<LoadedCorpus> => {
  const response = await fetch("./corpus.json");
  if (!response.ok) {
    throw new Error(`Failed to load corpus.json: ${response.status}`);
  }
  const raw = await response.text();
  return { entries: JSON.parse(raw) as PaperEntry[], raw };
};
