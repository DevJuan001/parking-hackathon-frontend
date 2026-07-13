import Icon from "@/globals/components/ui/Icon";

export default function FloorItem({ floor, openModal }) {
  return (
    <button
      onClick={(e) => openModal(floor, "editFloor", e.currentTarget)}
      className="h-26 w-24 flex flex-col items-center justify-center gap-3 px-3 py-2 rounded-3xl bg-[#efedf0] transition-colors
      md:w-32 md:h-32 
      hover:bg-[#EAE8EB] 
      dark:bg-[#101012] dark:hover:bg-[#ffffff15]"
    >
      <Icon data-shared-id="floor-icon" name="stairs" size={32} fill />

      <span data-shared-id="floor-text" className="font-semibold">
        {floor.name}
      </span>
    </button>
  );
}
