// Utils
import { months } from "@/utils/months";
import { useInnerModal } from "@hooks/useInnerModal";
// Componentes
import Icon from "@components/ui/Icon";
import CreateButton from "@components/ui/CreateButton";
import ReservationField from "@/modules/calendar/components/ui/ReservationField";
// Modales
import Modal from "@modals/Modal";
import ReservationInfoModal from "@/modules/calendar/components/modals/EditReservationModal";
import CreateReservationModal from "@/modules/calendar/components/modals/CreateReservationModal";

export default function DayInfoModal({ dayInfo, onClose }) {
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();

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
            className="text-2xl text-nowrap font-medium
            dark:text-white"
          >
            <span data-shared-id="day-number">{dayInfo?.day} </span>
            de {months[dayInfo?.month]} del {dayInfo?.year}
          </span>
        </div>

        <CreateButton
          miniVersion
          onClick={(e) => openInnerModal("createReservation", e)}
        />
      </div>

      {dayInfo?.reservations?.map((reservation) => (
        <ReservationField
          active
          key={reservation?.id}
          reservation={reservation}
          onClick={(e) => openInnerModal("reservationInfo", e)}
        />
      ))}

      {innerType === "createReservation" && (
        <Modal
          isOpen={true}
          triggerRef={innerTrigger}
          title={"Crear reserva"}
          growDirection="bottom-left"
          onClose={closeInnerModal}
        >
          <CreateReservationModal />
        </Modal>
      )}

      {innerType === "reservationInfo" && (
        <Modal
          isOpen={true}
          type={innerType}
          triggerRef={innerTrigger}
          growDirection="anchored"
          onClose={closeInnerModal}
        >
          <ReservationInfoModal reservation={dayInfo.reservations[0]} />
        </Modal>
      )}
    </div>
  );
}
