import Icon from "@components/ui/Icon";

export default function SectionButtons({
  continueButtonText,
  continueButtonOnClick,
  returnButtonOnClick,
}) {
  return (
    <div
      className="h-15 w-full flex gap-2 mt-2
      lg:h-16.5"
    >
      {returnButtonOnClick && (
        <button
          type="button"
          onClick={returnButtonOnClick}
          className="w-full h-full flex items-center justify-center gap-3 rounded-4xl text-sm font-semibold border-2 border-[#e5e7eb] outline-0 transition-colors
          md:text-base
          focus:animate-click-effect
          hover:bg-gray-200
          dark:border-[#20202296] dark:text-white dark:hover:bg-[#20202296]"
        >
          <Icon name={"arrow_back"} />

          <span>Volver</span>
        </button>
      )}

      <button
        type="button"
        onClick={continueButtonOnClick}
        className="w-full h-full border rounded-4xl text-sm text-white font-semibold bg-black transition-transform duration-300
        md:text-base
        focus:animate-click-effect
        hover:text-[#ffffffb4]
        dark:bg-white dark:text-black dark:hover:text-black"
      >
        {continueButtonText}
      </button>
    </div>
  );
}
