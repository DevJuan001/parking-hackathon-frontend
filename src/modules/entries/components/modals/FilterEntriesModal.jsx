import { useFilterEntries } from "@/modules/entries/hooks/useFilterEntries";
import SelectMenu from "@modals/SelectMenu";
import FilterModal from "@modals/FilterModal";

export default function FilterEntriesModal({ filters, setFilters, onClose }) {
  const { form, handleChange } = useFilterEntries(filters);

  return (
    <FilterModal
      orderByStartDateValue={form.start_date}
      orderByStartDateOnChange={handleChange}
      orderByFinishDateValue={form.end_date}
      orderByFinishDateOnChange={handleChange}
      applyButtonOnClick={() => {
        setFilters({ ...form });
        onClose();
      }}
      seeCleanFiltersButton={Object.keys(filters).length > 0}
      cleanFiltersOnClick={() => {
        setFilters({});
        onClose();
      }}
      onClose={onClose}
    >
      <div className="flex flex-col">
        <SelectMenu
          showAllOption
          id={"plates-menu"}
          spanText={"Placa"}
          value={form.plate_id}
          onChange={handleChange}
          options={[]}
        />
      </div>
    </FilterModal>
  );
}
