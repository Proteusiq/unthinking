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

export const loadCorpus = async (): Promise<PaperEntry[]> => {
  const response = await fetch("./corpus.json");
  if (!response.ok) {
    throw new Error(`Failed to load corpus.json: ${response.status}`);
  }
  return (await response.json()) as PaperEntry[];
};
