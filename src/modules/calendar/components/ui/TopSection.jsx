// Hooks
import { useInnerModal } from "@hooks/useInnerModal";
// Componentes
import Icon from "@components/ui/Icon";
import ShareButton from "@components/ui/ShareButton";
import CreateButton from "@components/ui/CreateButton";
import ExportButton from "@components/ui/ExportButton";
// Modales
import Modal from "@/globals/components/modals/Modal";

export default function TopSection({
  text,
  prevButtonOnClick,
  nextButtonOnClick,
  activeCalendarLayout,
  setActiveCalendarLayout,
  openModal,
}) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();

  return (
    <div
      className="h-[13%] flex items-center justify-between
      sm:h-[9%]
      md:h-[8%]
      dark:text-[#E4E2E5]"
    >
      <div className="h-full w-full flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={prevButtonOnClick}
            className="w-fit h-fit flex items-center justify-center p-1 rounded-3xl
            md:p-2.5
            hover:bg-[#EFEDF0]
            dark:hover:bg-[#101012]"
          >
            <Icon name={"keyboard_arrow_left"} />
          </button>

          <span
            className="text-xl text-nowrap font-medium font-dmsans
            md:text-2xl"
          >
            {text}
          </span>

          <button
            onClick={nextButtonOnClick}
            className="w-fit h-fit flex items-center justify-center p-1 rounded-3xl
            md:p-2.5
            hover:bg-[#EFEDF0]
            dark:hover:bg-[#101012]"
          >
            <Icon name={"keyboard_arrow_right"} />
          </button>

          <div
            className="hidden h-fit py-1.5 px-3.5 gap-1 bg-[#F5F3F6] rounded-4xl
            md:flex
            dark:bg-[#101012]"
          >
            <button
              onClick={() => setActiveCalendarLayout("dayLayout")}
              className="h-full flex items-center justify-center p-2"
            >
              <Icon
                name={"calendar_view_day"}
                fill={activeCalendarLayout === "dayLayout" ? true : false}
                className="text-[#75777E]
                dark:text-[#7E8088]"
              />
            </button>

            <button
              onClick={() => setActiveCalendarLayout("weekLayout")}
              className="flex items-center justify-center p-2"
            >
              <Icon
                name={"calendar_view_week"}
                fill={activeCalendarLayout === "weekLayout" ? true : false}
                className="text-[#75777E]
                dark:text-[#7E8088]"
              />
            </button>

            <button
              onClick={() => setActiveCalendarLayout("monthLayout")}
              className="h-full flex items-center justify-center p-2"
            >
              <Icon
                name={"calendar_view_month"}
                fill={activeCalendarLayout === "monthLayout" ? true : false}
                className="text-[#75777E]
                dark:text-[#7E8088]"
              />
            </button>
          </div>
        </div>

        <button
          onClick={(e) => openInnerModal("topSectionMobileOptions", e)}
          className="flex items-center justify-center p-4.5 rounded-4xl border border-[#E4E2E5]
          focus:animate-click-effect
          md:hidden
          hover:bg-[#F5F3F6]
          dark:border-[#202022] dark:text-[#E4E2E5] dark:hover:bg-[#202022]"
        >
          <Icon name={"more_horiz"} />
        </button>
      </div>

      <div
        className="hidden gap-2
        md:flex
        lg:gap-3"
      >
        <ShareButton
          onClick={(e) => openModal(null, "share", e.currentTarget)}
        />

        <ExportButton
          onClick={(e) => openModal(null, "export", e.currentTarget)}
        />

        <CreateButton
          onClick={(e) => openModal(null, "createReservation", e.currentTarget)}
        />
      </div>

      {innerType === "topSectionMobileOptions" && (
        <Modal
          disableHeader
          isOpen={true}
          type={innerType}
          triggerRef={innerTrigger}
          onClose={closeInnerModal}
          styles={"w-[300px] p-1.5 rounded-4xl"}
        >
          <div className="flex flex-col gap-1">
            <button
              onClick={(e) =>
                openModal(null, "createReservation", e.currentTarget)
              }
              className="flex items-center p-4 gap-2 bg-[#F5F3F6] rounded-4xl
              dark:bg-[#101012] dark:text-[#E4E2E5]"
            >
              <Icon name={"add"} />

              <span>Crear reserva</span>
            </button>

            <button
              onClick={(e) => openModal(null, "share", e.currentTarget)}
              className="flex items-center p-4 gap-2 bg-[#F5F3F6] rounded-4xl
              dark:bg-[#101012] dark:text-[#E4E2E5]"
            >
              <Icon data-shared-id="share-icon" name={"event_upcoming"} />

              <span
                data-shared-id="share-text"
                className="flex flex-col items-center gap-5 font-dmsans"
              >
                Compartir
              </span>
            </button>

            <button
              onClick={(e) => openModal(null, "export", e.currentTarget)}
              className="flex items-center p-4 gap-2 bg-[#F5F3F6] rounded-4xl
              dark:bg-[#101012] dark:text-[#E4E2E5]"
            >
              <Icon data-shared-id="export-icon" name={"download"} />

              <span>Exportar</span>
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
