export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Orb secundario — movimiento circular uniforme */}
      <div className="absolute top-1/2 left-1/2">
        <div
          className="w-[800px] h-[800px] mt-[-400px] ml-[-400px] rounded-full opacity-70 animate-main-orbit
          bg-[radial-gradient(circle,#000000_0%,transparent_70%)]
          dark:bg-[radial-gradient(circle_at_center,#FFFFFF_0%,transparent_70%)] dark:opacity-30"
        />
      </div>

      {/* Orb morado — misma ruta, distinto ritmo */}
      <div className="absolute top-1/2 left-1/2">
        <div
          className="w-[800px] h-[800px] mt-[-400px] ml-[-400px] rounded-full opacity-70 animate-second-orbit
          bg-[radial-gradient(circle_at_center,rgba(162,53,198,1)_0%,transparent_70%)]"
        />
      </div>

      {/* Textura SVG noise/grain overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20 
        dark:opacity-8"
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.5"
            numOctaves="3"
            result="noise"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1   0 0 0 1 0"
            in="noise"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}
