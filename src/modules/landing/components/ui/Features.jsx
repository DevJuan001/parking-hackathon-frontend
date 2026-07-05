import { features } from "../../data/features";

export default function Features() {
  return (
    <section
      id="features"
      className="mt-36 w-full flex flex-col gap-4 items-center"
    >
      <span
        className="font-medium
        dark:text-[#e4e2e5]"
      >
        Características
      </span>

      <span
        className="text-4xl text-center text-[#1b1b1e] font-semibold
        md:text-5xl
        dark:text-[#e4e2e5]"
      >
        Potencia tu operación
      </span>

      <span
        className="max-w-xl text-xl px-5 text-center text-[#75777e] font-medium
        dark:text-[#7E8088]"
      >
        Todo lo que necesitas para gestionar tu parqueadero de forma eficiente
        desde una sola plataforma.
      </span>

      <div
        className="mt-5 w-full flex flex-col px-3 gap-2 rounded-full
        md:px-24
        2xl:px-36"
      >
        {features.map((feature, index) => (
          <div
            key={feature.name}
            className={`w-full flex flex-col p-2 bg-[#f5f3f6] rounded-3xl
            ${index % 2 === 0 ? "xl:flex-row" : "xl:flex-row-reverse"}
            dark:bg-[#121214]`}
          >
            <img
              src={feature.video}
              className="h-auto rounded-2xl aspect-video
              xl:h-[400px]"
            />

            <div
              className="flex flex-col justify-center p-6 gap-2
              md:p-12"
            >
              <span
                className="text-5xl font-semibold text-[#1B1B1E]
                dark:text-white"
              >
                {feature.name}
              </span>

              <span
                className="text-2xl text-[#7E8088]
                dark:text-[#75777E]"
              >
                {feature.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
