import { useFilterUsers } from "@/modules/users/hooks/useFilterUsers";
import { useSurnames } from "@/modules/users/hooks/useSurnames";
import SelectMenu from "@modals/SelectMenu";
import FilterModal from "@modals/FilterModal";

export default function FilterUsersModal({ filters, setFilters, onClose }) {
  const { handleChange } = useFilterUsers(setFilters);
  const { surnames } = useSurnames();

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
    >
      <div className="flex flex-col">
        <SelectMenu
          showAllOption
          id={"surnames-menu"}
          spanText={"Apellido"}
          name={"first_surname"}
          value={filters.first_surname}
          onChange={handleChange}
          options={surnames.map((surname) => ({
            value: surname.surname,
            label: surname.surname,
          }))}
        />
      </div>
    </FilterModal>
  );
}
