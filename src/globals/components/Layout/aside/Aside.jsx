// Hooks
import { useInnerModal } from "@hooks/useInnerModal";
import { useCurrentUser } from "@hooks/useCurrentUser";
// Componentes
import Icon from "@components/ui/Icon";
import Navbar from "@components/Layout/aside/Navbar";
// Modales
import ChatModal from "@components/Layout/aside/ChatModal";

export default function Aside() {
  const { hasRole } = useCurrentUser();
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();

  return (
    <aside className="sticky flex items-center order-2 h-[80px] py-1 z-10 transition-all duration-500">
      <Navbar hasRole={hasRole} />

      <button
        onClick={(e) => openInnerModal("chat", e)}
        className="flex items-center justify-center p-3 rounded-2xl border border-[#E4E2E5]
        hover:bg-[#F5F3F6]
        dark:border-[#202022] dark:hover:bg-[#101012]"
      >
        <Icon
          name={"wand_stars"}
          fill
          className="text-[#1B1B1E]
          dark:text-[#E4E2E5]"
        />
      </button>

      {innerType === "chat" && (
        <ChatModal triggerRef={innerTrigger} onClose={closeInnerModal} />
      )}
    </aside>
  );
}
