// Three weighted dots — the stance distribution of the corpus, at a glance.
const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    fill="none"
  >
    <circle cx="20" cy="36" r="14" fill="#4ade80" />
    <circle cx="42" cy="28" r="8" fill="#e2e8f0" />
    <circle cx="50" cy="48" r="4" fill="#f87171" />
  </svg>
);

export default Logo;
