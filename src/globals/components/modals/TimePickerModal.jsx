import Modal from "@components/modals/Modal";

export default function TimePickerModal({
  isOpen,
  triggerRef,
  location,
  growDirection,
  onClose,
}) {
  return (
    <Modal
      disableHeader
      isOpen={isOpen}
      onClose={onClose}
      location={location}
      type={"timePicker"}
      triggerRef={triggerRef}
      growDirection={growDirection}
    >
      <div className="flex flex-col items-center gap-5 font-dmsans">
        <div className="flex items-center justify-center gap-2 text-[44px] font-medium">
          <button
            className="px-6.5 rounded-3xl bg-white text-white
            dark:text-black"
          >
            08
          </button>

          <span
            className="text-[#75777E]
            dark:text-[#C5C6CE]"
          >
            :
          </span>

          <button className="px-6.5 rounded-3xl bg-[#101012] text-[#C5C6CE]">
            00
          </button>
        </div>

        {/* Reloj */}
        <div
          className="w-64 h-64 rounded-full bg-[#F5F3F6]
          dark:bg-[#101012]"
        ></div>

        <div className="flex gap-2 text-xl font-medium">
          <button
            className="px-8 py-2 rounded-2xl bg-white text-white
            dark:text-black"
          >
            AM
          </button>

          <button className="px-8 py-2 rounded-2xl bg-[#101012] text-[#C5C6CE]">
            PM
          </button>
        </div>
      </div>
    </Modal>
  );
}
