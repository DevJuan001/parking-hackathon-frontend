import FilterModal from "@modals/FilterModal";
import { useFilterExits } from "@/modules/exits/hooks/useFilterExits";

export default function FilterExitsModal({ filters, setFilters, onClose }) {
  const { handleChange } = useFilterExits(setFilters);

  return (
    <FilterModal
      orderByStartDateValue={filters.start_date}
      orderByStartDateOnChange={handleChange}
      orderByFinishDateValue={filters.end_date}
      orderByFinishDateOnChange={handleChange}
      applyButtonOnClick={() => {
        setFilters({ ...filters });
        onClose();
      }}
      seeCleanFiltersButton={Object.keys(filters).length > 0}
      cleanFiltersOnClick={() => {
        setFilters({});
        onClose();
      }}
    />
  );
}
