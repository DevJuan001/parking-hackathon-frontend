// Hooks
import { useLogout } from "@hooks/useLogout";
import { useInnerModal } from "@hooks/useInnerModal";
// Constants
import { secondSectionItems } from "@/globals/constants/asideMenuItems";
// Components
import Icon from "@components/ui/Icon";
import NavItem from "@components/Layout/aside/NavItem";
import AvatarButton from "@components/Layout/aside/AvatarButton";
// Modals
import Modal from "@modals/Modal";
import ChatModal from "@modals/ChatModal";
import ProfileModal from "@modals/profileModal/ProfileModal";

export default function NavbarMenuModal({
  isOpen,
  onClose,
  triggerRef,
  firstSectionItems,
}) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { logout } = useLogout();

  return (
    <Modal
      dragToClose
      disableHeader
      type={"menu"}
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      styles={`p-2 max-w-[280px] h-auto flex flex-col gap-2 rounded-[40px]`}
    >
      <AvatarButton avatarOnClick={(e) => openInnerModal("user", e)} />

      <button
        onClick={(e) => openInnerModal("chat", e)}
        className="w-full h-auto flex items-center py-4 px-6 gap-2 rounded-4xl text-[#75777E] transition cursor-pointer
        hover:cursor-pointer
        hover:bg-[#e5e7eb96] hover:text-black
        dark:text-[#75777eb7] dark:hover:bg-[#181818] dark:hover:text-[#E4E2E5]"
      >
        <Icon name={"wand_stars"} />

        <span className="font-medium overflow-hidden">Chat</span>
      </button>

      {firstSectionItems.slice(4, 7).map((item) => (
        <NavItem
          showName={true}
          itemId={`${item.itemId}`}
          key={item.name}
          path={item.path}
          name={item.name}
          icon={item.icon}
          onClick={closeInnerModal}
        />
      ))}

      {secondSectionItems.map((item) => (
        <NavItem
          showName={true}
          itemId={`${item.itemId}`}
          key={item.name}
          path={item.path}
          name={item.name}
          icon={item.icon}
          onClick={logout}
        />
      ))}

      {innerType === "user" && (
        <ProfileModal
          triggerRef={innerTrigger}
          onCloseModal={closeInnerModal}
        />
      )}

      {innerType === "chat" && (
        <ChatModal triggerRef={innerTrigger} onClose={closeInnerModal} />
      )}
    </Modal>
  );
}
