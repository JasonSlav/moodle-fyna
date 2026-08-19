export function WaveDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        fill="#2E7D32"
        d="M0,58 C240,86 480,30 720,48 C960,66 1200,86 1440,52 L1440,100 L0,100 Z"
      />
      <path
        fill="#F7A823"
        d="M0,76 C240,98 480,56 720,70 C960,84 1200,98 1440,74 L1440,100 L0,100 Z"
      />
      <path
        fill="#FFFFFF"
        d="M0,90 C240,100 480,80 720,88 C960,96 1200,100 1440,92 L1440,100 L0,100 Z"
      />
    </svg>
  );
}
