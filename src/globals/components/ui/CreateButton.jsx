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
      className={`flex items-center ${text ? "p-5" : "py-3 px-5"} gap-2 bg-black font-poppins transition duration-500
      focus:animate-click-effect
      hover:shadow-lg
      dark:bg-white dark:hover:shadow-[0px_0px_32px_-11px_#ffffff]`}
    >
      <Icon
        name={icon ? icon : "add"}
        weight={500}
        className="text-white
        dark:text-black"
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
