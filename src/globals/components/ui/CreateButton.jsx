import Icon from "@components/ui/Icon";

export default function CreateButton({
  icon,
  text,
  borderRadius = "40px",
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      style={{ borderRadius: borderRadius }}
      className={`flex items-center ${text ? "px-5" : "px-3"} py-5 gap-2 bg-black font-poppins transition duration-500
      lg:py-3
      hover:shadow-lg
      dark:bg-white dark:hover:shadow-[0px_0px_32px_-11px_#ffffff]`}
    >
      <Icon
        name={icon ? icon : "add"}
        weight={500}
        className="invert
        dark:invert-0"
      />

      {text && (
        <span
          data-flip-id="modal-title"
          className="hidden text-white font-medium
          lg:block
          dark:text-black"
        >
          {text}
        </span>
      )}
    </button>
  );
}
