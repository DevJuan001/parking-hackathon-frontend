export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Orb blanco — movimiento circular uniforme */}
      <div className="absolute top-1/2 left-1/2">
        <div
          className="w-[800px] h-[800px] mt-[-400px] ml-[-400px] rounded-full opacity-70 animate-orbit-white"
          style={{
            background:
              "radial-gradient(circle, #000000 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Orb morado — misma ruta, distinto ritmo */}
      <div className="absolute top-1/2 left-1/2">
        <div
          className="w-[800px] h-[800px] mt-[-400px] ml-[-400px] rounded-full opacity-70 animate-orbit-purple"
          style={{
            background:
              "radial-gradient(circle, rgba(162,53,198,1) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Textura SVG noise/grain overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] dark:opacity-[0.06]">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="2"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}
