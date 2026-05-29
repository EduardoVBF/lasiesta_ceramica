interface GlowOrbProps {
  className?: string;
}

export default function GlowOrb({ className = "" }: GlowOrbProps) {
  return (
    <div
      className={`
        absolute
        blur-3xl
        rounded-full
        ${className}
      `}
    />
  );
}
