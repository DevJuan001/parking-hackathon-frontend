import Icon from "@components/ui/Icon";
import DateField from "@components/ui/DateField";
import LiquidGlass from "../ui/LiquidGlass";
import ConfirmCancelButtons from "./ConfirmCancelButtons";

export default function FilterModal({
  applyButtonOnClick,
  orderByStartDateOnChange,
  orderByStartDateValue,
  orderByFinishDateOnChange,
  orderByFinishDateValue,
  children,
  fieldName = "Creación",
  seeCleanFiltersButton = false,
  cleanFiltersOnClick,
}) {
  return (
    <section className="w-full flex flex-col gap-2 font-dmsans">
      <div className="w-full flex items-center justify-between p-2 gap-5 font-poppins">
        <div className="flex items-center gap-2">
          <Icon
            data-shared-id="filter-icon"
            name={"page_info"}
            size={24}
            className={"font-bold"}
          />

          <span data-shared-id="filter-text" className="font-medium text-lg">
            Filtros
          </span>
        </div>

        <LiquidGlass
          onClick={cleanFiltersOnClick}
          className="flex items-center justify-center p-2.5 rounded-3xl border border-[#E4E2E5] transition-colors duration-200
          hover:bg-[#49454f21] hover:cursor-pointer
          dark:text-[#7E8088] dark:hover:bg-[#28282bbd]"
        >
          <Icon name={"close"} size={20} />
        </LiquidGlass>
      </div>

      <div className="flex flex-col gap-1 px-1">
        <span className="text-sm dark:text-white">Fecha de {fieldName}</span>

        <div className="max-w-full flex gap-2">
          <DateField
            spanText={"Desde:"}
            name={"start_date"}
            value={orderByStartDateValue ? orderByStartDateValue : "yyyy-mm-dd"}
            onChange={orderByStartDateOnChange}
          />

          <DateField
            spanText={"Hasta:"}
            name={"end_date"}
            value={
              orderByFinishDateValue ? orderByFinishDateValue : "yyyy-mm-dd"
            }
            onChange={orderByFinishDateOnChange}
          />
        </div>
      </div>

      <div className="px-1">{children}</div>

      <div className="flex items-end gap-2 px-2">
        <ConfirmCancelButtons
          confirmButtonOnClick={applyButtonOnClick}
          confirmText="Aplicar"
          cancelButtonOnClick={cleanFiltersOnClick}
        />

        {seeCleanFiltersButton && (
          <button
            onClick={cleanFiltersOnClick}
            className="h-11 flex items-center px-3 py-2.5 gap-2 text-[#c0392b] rounded-2xl border border-[#E4E2E5]
            hover:bg-red-100 transition-colors duration-200
            dark:hover:bg-[#450a0a96] dark:border-[#28282ba1]"
          >
            <Icon name={"filter_list_off"} size={20} />

            <span className="text-xs md:text-sm">Limpiar filtros</span>
          </button>
        )}
      </div>
    </section>
  );
}
