// Three weighted stars connected = a small constellation.
// Sizes mirror the corpus stance distribution. The connecting line
// says "these speak to each other" — the project IS the interaction
// graph between papers.
const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    fill="none"
  >
    <g
      stroke="#475569"
      strokeWidth="0.8"
      strokeLinecap="round"
      opacity="0.55"
    >
      <line x1="20" y1="36" x2="42" y2="28" />
      <line x1="42" y1="28" x2="50" y2="48" />
    </g>
    <circle cx="20" cy="36" r="13" fill="#4ade80" />
    <circle cx="42" cy="28" r="7.5" fill="#e2e8f0" />
    <circle cx="50" cy="48" r="3.5" fill="#f87171" />
  </svg>
);

export default Logo;
