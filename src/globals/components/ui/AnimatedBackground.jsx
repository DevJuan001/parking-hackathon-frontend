export default function AnimatedBackground({ className }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none
      ${className}`}
    >
      {/* Orb secundario — movimiento circular uniforme */}
      <div className="absolute top-1/2 left-1/2">
        <div
          className="w-[800px] h-[800px] mt-[-400px] ml-[-400px] rounded-full opacity-50 animate-main-orbit
          bg-[radial-gradient(circle,#000000_0%,transparent_70%)]
          dark:bg-[radial-gradient(circle_at_center,#FFFFFF_0%,transparent_70%)] dark:opacity-70"
        />
      </div>

      {/* Orb morado — misma ruta, distinto ritmo */}
      <div className="absolute top-1/2 left-1/2">
        <div
          className="w-[800px] h-[800px] mt-[-400px] ml-[-400px] rounded-full opacity-70 animate-second-orbit
          bg-[radial-gradient(circle_at_center,#A235C6_0%,transparent_70%)] dark:opacity-100"
        />
      </div>

      {/* Textura SVG noise/grain overlay */}
      <svg
        fill="currentColor"
        className="absolute inset-0 w-full h-full opacity-8
        dark:opacity-45"
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="4"
            result="noise"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0   0.21 0.71 0.07 0 0"
            in="noise"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}
