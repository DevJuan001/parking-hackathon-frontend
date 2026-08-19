// Hooks
import { useLogout } from "@hooks/useLogout";
import { useInnerModal } from "@hooks/useInnerModal";
// Constants
import { secondSectionItems } from "@/globals/constants/asideMenuItems";
// Components
import NavItem from "@components/Layout/aside/NavItem";
import AvatarButton from "@components/Layout/aside/AvatarButton";
// Modals
import Modal from "@modals/Modal";
import ProfileModal from "@modals/profileModal/ProfileModal";

export default function NavbarMenuModal({ isOpen, triggerRef, onClose }) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { logout } = useLogout();

  return (
    <Modal
      disableHeader
      type={"menu"}
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      styles={`p-2 max-w-[280px] h-auto rounded-[40px]`}
    >
      <AvatarButton avatarOnClick={(e) => openInnerModal("user", e)} />

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
    </Modal>
  );
}
