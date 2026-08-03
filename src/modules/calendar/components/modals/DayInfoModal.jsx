// Hooks
import { useInnerModal } from "@hooks/useInnerModal";
import { useReservations } from "@/modules/calendar/hooks/useReservations";
// Utils
import { months } from "@/utils/months";
import { filterReservationsByDate } from "@/utils/filterReservations";
// Componentes
import Icon from "@components/ui/Icon";
import CreateButton from "@components/ui/CreateButton";
import ReservationField from "@/modules/calendar/components/ui/ReservationField";
// Modales
import Modal from "@modals/Modal";
import EditReservationModal from "@/modules/calendar/components/modals/EditReservationModal";
import CreateReservationModal from "@/modules/calendar/components/modals/CreateReservationModal";

export default function DayInfoModal({ dayInfo, onClose }) {
  const {
    innerType,
    innerTrigger,
    innerData,
    openInnerModal,
    closeInnerModal,
  } = useInnerModal();
  const { reservations } = useReservations();

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            onClick={onClose}
            className="w-fit h-fit flex items-center justify-center p-3 rounded-full
            hover:bg-[#acaaaa1e] hover:cursor-pointer"
          >
            <Icon name={"close"} />
          </button>

          <span
            className="text-xl text-nowrap font-medium
            md:text-2xl
            dark:text-white"
          >
            <span data-shared-id="day-number">{dayInfo?.day} </span>
            de {months[dayInfo?.month]} del {dayInfo?.year}
          </span>
        </div>

        <CreateButton
          miniVersion
          onClick={(e) => openInnerModal("createReservation", e, dayInfo)}
        />
      </div>

      <div className="w-full h-full flex flex-col gap-1 overflow-hidden overflow-y-auto">
        {filterReservationsByDate(
          reservations,
          dayInfo?.year,
          dayInfo?.month,
          dayInfo?.day,
        )?.map((reservation) => (
          <ReservationField
            active
            key={reservation?.id}
            reservation={reservation}
            onClick={(e) => openInnerModal("editReservation", e, reservation)}
          />
        ))}
      </div>

      {innerType === "createReservation" && (
        <Modal
          isOpen={true}
          triggerRef={innerTrigger}
          title={"Crear reserva"}
          growDirection="bottom-left"
          onClose={closeInnerModal}
        >
          <CreateReservationModal dayInfo={innerData} onClose={onClose} />
        </Modal>
      )}

      {innerType === "editReservation" && (
        <Modal
          disableHeader
          margin={8}
          isOpen={true}
          type={innerType}
          triggerRef={innerTrigger}
          growDirection="anchored"
          onClose={closeInnerModal}
        >
          <EditReservationModal
            reservation={innerData}
            onClose={() => {
              closeInnerModal();
              onClose();
            }}
          />
        </Modal>
      )}
    </div>
  );
}
