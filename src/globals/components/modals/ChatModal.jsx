// Hooks
import { useRef, useEffect } from "react";
import { useChat } from "@hooks/useChat";
// Componentes
import Icon from "@components/ui/Icon";
import LiquidGlass from "@components/ui/LiquidGlass";
import AnimatedBackground from "@components/ui/AnimatedBackground";
// Modales
import Modal from "@modals/Modal";

export default function ChatModal({ triggerRef, onClose }) {
  const { messages, chatInfo, isPending, handleChange, handleSubmit } =
    useChat();
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isPending]);

  return (
    <Modal
      isOpen={true}
      type="chat"
      triggerRef={triggerRef}
      location="center"
      onClose={onClose}
    >
      <AnimatedBackground className="rounded-[40px]" />

      <div className="relative w-full h-full rounded-[30px] overflow-hidden">
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

        <div
          ref={chatRef}
          className="absolute w-full h-[90%] flex flex-col p-2 gap-4 mt-2 bg-linear-to-b font-dmsans overflow-hidden overflow-y-auto"
        >
          {messages?.map((message) => (
            <LiquidGlass
              key={message.id}
              className={`max-w-[80%] min-h-fit px-6 py-3.5 rounded-4xl font-medium wrap-break-word
              ${
                message.role === "user"
                  ? `self-end bg-[#00000028] text-[#ffffff] animate-message-in-right
                  dark:bg-[#ffffff46] dark:text-[#000000]`
                  : `self-start bg-[#ffffffc7] animate-message-in-left
                  dark:bg-[#000000d5] dark:text-[#E4E2E5]`
              }`}
            >
              <p>{message.content}</p>
            </LiquidGlass>
          ))}

          {isPending && (
            <LiquidGlass
              className="max-w-[80%] min-h-fit self-start px-6 py-4 rounded-4xl bg-[#ffffffc7] wrap-break-word animate-message-in-left
              dark:bg-[#000000a2] dark:text-[#E4E2E5]"
            >
              <p className="animate-pulse">Pensando...</p>
            </LiquidGlass>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="absolute bottom-0 w-full h-[10%] flex items-center px-2 py-3 font-dmsans"
        >
          <textarea
            autoFocus
            id="message"
            type="text"
            name="message"
            value={chatInfo.message}
            onChange={handleChange}
            placeholder="Escribe un mensaje..."
            className="h-full w-full p-3 text-2xl outline-0
            dark:text-[#E4E2E5]"
          />

          <LiquidGlass
            role="button"
            disable={isPending}
            onClick={(e) => handleSubmit(e)}
            className={`flex items-center justify-center p-5 rounded-full bg-[#fbf9fccc]
            ${isPending ? "hover:cursor-not-allowed" : "hover:cursor-pointer"}
            hover:bg-[#4a484b17] 
            dark:bg-[#000000]`}
          >
            <Icon
              name="arrow_upward"
              className={`
              ${
                isPending
                  ? `text-black/20
                  dark:text-white/20`
                  : `text-black
                  dark:text-[#E4E2E5]`
              }`}
            />
          </LiquidGlass>
        </form>
      </div>
    </Modal>
  );
}
