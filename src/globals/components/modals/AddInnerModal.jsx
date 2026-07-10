import Modal from "@modals/Modal";

export default function AddInnerModal({
  children,
  isOpen,
  onClose,
  title,
  triggerRef,
  disableClose = false,
  type = "innerModal",
  location = "center",
}) {
  return (
    <Modal
      z_index="150"
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      type={type}
      triggerRef={triggerRef}
      location={location}
      disableClose={disableClose}
    >
      {children}
    </Modal>
  );
}
