import Icon from "@components/ui/Icon";
import LiquidGlass from "../ui/LiquidGlass";

export default function ConfirmCancelButtons({
  disabled = false,
  itemsPosition = "center",
  flexDirection,
  confirmImage,
  confirmImageDisplay = false,
  confirmText = "Confirmar",
  confirmBgColor = "#000",
  confirmButtonOnClick,
  cancelText = "Cancelar",
  cancelButtonWidth,
  cancelButtonOnClick,
  confirmBtnRef,
}) {
  return (
    <div
      className={`w-full flex ${flexDirection} items-center self-${itemsPosition} pt-5 gap-2`}
    >
      <button
        type="submit"
        id="confirm-button"
        ref={confirmBtnRef}
        disabled={disabled}
        onClick={confirmButtonOnClick}
        style={{ backgroundColor: confirmBgColor }}
        className={`flex items-center px-6 py-3.5 gap-2 rounded-4xl text-sm text-white font-medium transition
          ${disabled && "opacity-70"}
        active:animate-click-effect
        hover:text-gray-300
        dark:bg-white dark:text-black dark:hover:text-gray-800`}
      >
        {confirmImage && (
          <Icon
            name={confirmImage}
            size={24}
            className={`dark:invert-0 ${confirmImageDisplay ? "block" : "hidden"}`}
          />
        )}

        <span>{confirmText}</span>
      </button>

      <LiquidGlass
        id="cancel-button"
        type="button"
        disabled={disabled}
        onClick={cancelButtonOnClick}
        className={`${cancelButtonWidth} flex items-center px-6 py-3.5 rounded-4xl text-sm text-[#75777E] font-medium transition
        active:animate-click-effect
        hover:cursor-pointer hover:bg-[#F5F3F6]
        dark:bg-[#101012] dark:text-white dark:hover:bg-[#28282bbd]`}
      >
        <span>{cancelText}</span>
      </LiquidGlass>
    </div>
  );
}
