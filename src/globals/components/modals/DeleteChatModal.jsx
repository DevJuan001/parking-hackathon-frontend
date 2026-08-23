import Modal from "@modals/Modal";
import LiquidGlass from "@components/ui/LiquidGlass";

export default function DeleteChatModal({ triggerRef, onClose }) {
  return (
    <Modal
      dragToClose
      isOpen={true}
      disableHeader
      onClose={onClose}
      location="anchored"
      triggerRef={triggerRef}
      growDirection="bottom-right"
      styles={`w-sm p-7 rounded-[40px]
      md:w-md`}
    >
      <div
        className="w-full flex flex-col gap-4 font-dmsans
        dark:text-[#E4E2E5]"
      >
        <span className="text-2xl font-semibold">Nuevo chat</span>

        <span>Al crear un nuevo chat, se borrara la conversación actual</span>

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
