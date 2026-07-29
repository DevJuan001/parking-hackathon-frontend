// Componentes
import Icon from "@components/ui/Icon";
import FormField from "@components/ui/FormField";
import LiquidGlass from "@components/ui/LiquidGlass";
import SelectMenu from "@components/modals/SelectMenu";

export default function ReservationInfoModal({
  reservation,
  deleteButtonOnClick,
  onClose,
}) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="h-48 w-full flex flex-col p-2.5 border border-[#E4E2E5] rounded-4xl">
        <div className="h-full w-full flex items-center justify-between">
          <LiquidGlass
            onClick={deleteButtonOnClick}
            className="self-start flex items-center justify-center p-3 rounded-3xl bg-[#fbf9fc] group
            active:animate-click-effect
            hover:cursor-pointer hover:bg-[#ff5b5b41]
            dark:bg-black dark:text-[#7E8088] dark:border-[#202022]"
          >
            <Icon
              name={"delete"}
              size={20}
              className={"group-hover:text-red-700"}
            />
          </LiquidGlass>

          <span
            className="font-medium"
          >
            {reservation?.name}
          </span>

          <LiquidGlass
            role="button"
            onClick={onClose}
            className="self-start flex items-center justify-center p-3 rounded-full
            active:animate-click-effect
            hover:bg-[#9c9a9a2c] hover:cursor-pointer"
          >
            <Icon
              name={"close"}
              size={20}
              className="text-[#75777E]
            dark:text-[#7E8088]"
            />
          </LiquidGlass>
        </div>

        <div className="w-full flex flex-wrap gap-1">
          <div
            className="w-fit py-2 px-4 bg-[#F5F3F6] rounded-full text-sm text-[#75777E]
            dark:text-[#7E8088]"
          >
            <span>Cliente VIP</span>
          </div>
        </div>
      </div>

      <form className="flex flex-col gap-2">
        <FormField
          disabled
          id={"client-name"}
          name={"client"}
          labelText={"Cliente"}
          value={reservation?.client || "Miguelino"}
        />

        <SelectMenu
          id={"status-menu"}
          name={"status"}
          spanText={"Estado"}
          options={[
            { value: 1, label: "Cancelada" },
            { value: 2, label: "Activa" },
            { value: 3, label: "Completada" },
          ]}
        />
      </form>
    </div>
  );
}
