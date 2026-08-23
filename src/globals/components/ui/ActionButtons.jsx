import Icon from "@components/ui/Icon";

export default function ActionButtons({
  children,
  editButtonId,
  deleteButtonId,
  editButtonOnClick,
  deleteButtonOnClick,
  visibilityIcon = true,
  moreInfoButtonOnClick,
}) {
  return (
    <section className="flex items-center justify-center gap-3">
      {children}

      {moreInfoButtonOnClick && (
        <button
          onClick={moreInfoButtonOnClick}
          className="flex items-center p-2 rounded-xl transition-colors bg-white
          hover:bg-[#969292a8]
          dark:bg-black dark:hover:bg-[#9692924b]"
        >
          <Icon
            name={"arrow_outward"}
            className="text-[#75777E]
            dark:text-[#7E8088]"
          />
        </button>
      )}

      {editButtonOnClick && (
        <button
          id={editButtonId}
          onClick={editButtonOnClick}
          className="flex items-center p-2 rounded-xl transition-colors bg-white
          hover:bg-[#969292a8]
          dark:bg-black dark:hover:bg-[#9692924b]"
        >
          <Icon
            size={22}
            name={"edit"}
            className="text-[#75777E]
            dark:text-[#7E8088]"
          />
        </button>
      )}

      {deleteButtonOnClick && (
        <button
          id={deleteButtonId}
          onClick={deleteButtonOnClick}
          className="flex items-center p-2 rounded-xl transition-colors bg-white
          hover:bg-[#969292a8]
          dark:bg-black dark:hover:bg-[#9692924b]"
        >
          <Icon
            size={22}
            name={`${visibilityIcon ? "visibility" : "visibility_off"}`}
            className="text-[#75777E]
            dark:text-[#7E8088]"
          />
        </button>
      )}
    </section>
  );
}
