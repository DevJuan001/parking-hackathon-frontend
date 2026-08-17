// Hooks
import { useInnerModal } from "@hooks/useInnerModal";
import { useCurrentUser } from "@hooks/useCurrentUser";
// Componentes
import Icon from "@components/ui/Icon";
import Navbar from "@components/Layout/aside/Navbar";
// Modales
import ChatModal from "@modals/ChatModal";

export default function Aside() {
  const { hasRole } = useCurrentUser();
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();

  return (
    <aside
      className="sticky bottom-0 h-20 flex items-center order-2 py-1 z-10 transition-all duration-500
      md:bottom-3"
    >
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
