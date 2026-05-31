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

const GITHUB_BASE =
  "https://github.com/Proteusiq/unthinking/blob/main/";

export const analysisUrl = (entry: PaperEntry): string =>
  `${GITHUB_BASE}${entry.analysis_path}`;

export const stanceColor = (stance: PaperEntry["stance"]): string => {
  switch (stance) {
    case "supports":
      return "#4ade80"; // green
    case "challenges":
      return "#f87171"; // red
    case "balanced":
    default:
      return "#cbd5e1"; // slate
  }
};

// Larger papers carry the argument. Smoking guns are the most prominent;
// otherwise, scale by depth-of-engagement (proxied by analysis word count).
export const paperSize = (entry: PaperEntry): number => {
  if (entry.smoking_gun) return 0.55;
  if (entry.word_count >= 2000) return 0.38;
  if (entry.word_count >= 1400) return 0.28;
  if (entry.word_count >= 900) return 0.22;
  return 0.16;
};

export const isHeavyweight = (entry: PaperEntry): boolean =>
  entry.smoking_gun || entry.word_count >= 2000;

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
