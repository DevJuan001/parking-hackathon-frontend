import Modal from "@modals/Modal";
import LiquidGlass from "../ui/LiquidGlass";

export default function DeleteChatModal({ triggerRef, onClose }) {
  return (
    <Modal
      isOpen={true}
      disableHeader
      onClose={onClose}
      location="anchored"
      triggerRef={triggerRef}
      growDirection="bottom-right"
      styles={`w-fit p-7 rounded-[40px]`}
    >
      <div
        className="w-full flex flex-col gap-4 font-dmsans
        dark:text-[#E4E2E5]"
      >
        <span className="text-2xl font-semibold">Nuevo chat</span>

        <span className="text-nowrap">
          Se borrara este chat perdiendo todo el progreso
        </span>

        <div className="w-full flex justify-end gap-2">
          <LiquidGlass
            role={"button"}
            onClick={onClose}
            className="px-5 py-3 rounded-4xl text-sm text-[#75777E] font-medium
            active:animate-click-effect
            hover:bg-[#49454f21] hover:cursor-pointer
            dark:text-[#7E8088]"
          >
            Cancelar
          </LiquidGlass>

          <button
            className="px-4 py-3 rounded-full bg-black font-medium text-white text-sm
            active:animate-click-effect
            dark:bg-white dark:text-black"
          >
            Crear nuevo chat
          </button>
        </div>
      </div>
    </Modal>
  );
}
