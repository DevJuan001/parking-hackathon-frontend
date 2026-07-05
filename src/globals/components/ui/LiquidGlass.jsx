import { useId } from "react";

export default function LiquidGlass({ children, className, onClick }) {
  const filterId = `liquid-glass-distort-${useId()}`;

  return (
    <>
      <svg style={{ display: "none" }} xmlns="http://www.w3.org/2000/svg">
        <filter
          id={filterId}
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.015"
            numOctaves="2"
            result="noise"
          />

          <feFlood floodColor="white" result="whiteRect" />
          <feMorphology
            in="whiteRect"
            operator="erode"
            radius="0.2"
            result="eroded"
          />
          <feComposite
            in="whiteRect"
            in2="eroded"
            operator="out"
            result="ring"
          />
          <feGaussianBlur in="ring" stdDeviation="0.2" result="blurredRing" />

          <feComposite
            in="noise"
            in2="blurredRing"
            operator="arithmetic"
            k1="0.6"
            k2="0.6"
            k3="0.6"
            k4="0.6"
            result="modulatedNoise"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="modulatedNoise"
            scale="20"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div
        onClick={onClick}
        className={`relative ${className}`}
        style={{ backdropFilter: `url(#${filterId})` }}
      >
        <div
          className="pointer-events-none absolute w-full h-full rounded-full bg-linear-to-b from-white/5 to-white/1 
          dark:from-white/1 dark:to-black/30"
        />

        <div
          className="pointer-events-none absolute w-full h-full rounded-full shadow-[0px_0px_1.5px_0.1px_#999999] ring ring-inset ring-white/20
          dark:ring-white/10 dark:shadow-[0px_0px_1px_0.1px_#fff]"
        />

        <div className="relative w-full h-full flex items-center justify-center">
          {children}
        </div>
      </div>
    </>
  );
}
