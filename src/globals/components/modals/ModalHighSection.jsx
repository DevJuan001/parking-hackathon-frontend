import Icon from "@components/ui/Icon";
import LiquidGlass from "../ui/LiquidGlass";

export default function ModalHighSection({
  deleteButtonOnClick,
  closeButtonOnClick,
  icon,
  iconDataSharedId,
  iconClassName = "dark:text-[#E4E2E5]",
  text,
  textDataSharedId,
}) {
  return (
    <div
      className="w-full h-44 flex justify-between items-center py-2 px-2 gap-2 bg-[#efedf0] border-2 border-[#EBE6E7] rounded-3xl font-inter
      dark:bg-[#101012] dark:border-[#202022]"
    >
      {deleteButtonOnClick && (
        <LiquidGlass
          onClick={deleteButtonOnClick}
          className="self-start flex items-center justify-center p-2.5 rounded-3xl bg-[#fbf9fc] border border-[#EBE6E7] transition-colors duration-200 group
          focus:animate-click-effect
          hover:bg-[#ff5b5b41]
          dark:bg-black dark:text-[#7E8088] dark:border-[#202022]"
        >
          <Icon
            name={"delete"}
            size={20}
            className={"group-hover:text-red-700"}
          />
        </LiquidGlass>
      )}

      <div className="justify-self-center flex flex-col items-center gap-3">
        <Icon
          data-shared-id={iconDataSharedId}
          name={icon}
          size={60}
          fill
          className={iconClassName}
        />

        <span
          data-shared-id={textDataSharedId}
          className="w-fit max-w-52 font-semibold text-lg text-center
          dark:text-[#E4E2E5]"
        >
          {text}
        </span>
      </div>

      <LiquidGlass
        type="button"
        onClick={closeButtonOnClick}
        className="self-start flex items-center justify-center p-2.5 rounded-3xl bg-[#fbf9fc] border border-[#EBE6E7] transition-colors duration-200
        focus:animate-click-effect
        hover:bg-[#ffffff3d]
        dark:bg-black dark:text-[#7E8088] dark:hover:bg-[#101012] dark:border-[#202022]"
      >
        <Icon name={"close"} size={20} />
      </LiquidGlass>
    </div>
  );
}
