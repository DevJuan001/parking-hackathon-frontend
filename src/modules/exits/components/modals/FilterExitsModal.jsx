import FilterModal from "@modals/FilterModal";
import { useFilterExits } from "@/modules/exits/hooks/useFilterExits";

export default function FilterExitsModal({ filters, setFilters, onClose }) {
  const { form, handleChange } = useFilterExits();

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
    />
  );
}
