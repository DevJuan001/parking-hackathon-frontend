// Componentes
import Icon from "@components/ui/Icon";
import LiquidGlass from "@components/ui/LiquidGlass";
import AnimatedBackground from "@components/ui/AnimatedBackground";
// Modales
import Modal from "@modals/Modal";

export default function ChatModal({ triggerRef, onClose }) {
  return (
    <Modal
      isOpen={true}
      type="chat"
      triggerRef={triggerRef}
      location="center"
      onClose={onClose}
    >
      <AnimatedBackground />

      <div className="relative w-full h-full">
        <div className="absolute flex items-center gap-1 m-3 z-50">
          <LiquidGlass
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full
            hover:bg-[#49454f21] hover:cursor-pointer"
          >
            <Icon
              name={"close"}
              size={20}
              className="text-[#000000]
            dark:text-[#E4E2E5]"
            />
          </LiquidGlass>

          <LiquidGlass
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full
            hover:bg-[#49454f21] hover:cursor-pointer"
          >
            <Icon
              name={"maps_ugc"}
              size={20}
              className="text-[#000000]
            dark:text-[#E4E2E5]"
            />
          </LiquidGlass>
        </div>

        <div className="absolute w-full h-[80%] flex flex-col p-4 gap-4 font-dmsans overflow-hidden overflow-y-auto">
          <LiquidGlass
            className="max-w-[80%] min-h-fit self-end px-6 py-4 rounded-4xl text-[#ffffff] wrap-break-word bg-[#00000028]
            dark:bg-[#ffffff3d] dark:text-[#000000F5]"
          >
            <p className="w-full h-full">Mensaje user</p>
          </LiquidGlass>

          <LiquidGlass
            className="max-w-[80%] min-h-fit self-start px-6 py-4 rounded-4xl bg-[#ffffffc7] wrap-break-word
            dark:bg-[#000000e0] dark:text-[#E4E2E5]"
          >
            <p>Mensaje asistant</p>
          </LiquidGlass>
        </div>

        <div className="absolute bottom-3 w-full h-[10%] flex items-center px-2 py-3 font-dmsans">
          <input
            id="chat-input"
            type="text"
            placeholder="Escribe un mensaje..."
            className="h-20 w-full p-3 text-2xl outline-0"
          />

          <LiquidGlass
            className="flex items-center justify-center p-5 rounded-full bg-[#fbf9fccc]
            hover:bg-[#4a484b17] hover:cursor-pointer"
          >
            <Icon name="arrow_upward" />
          </LiquidGlass>
        </div>
      </div>
    </Modal>
  );
}
