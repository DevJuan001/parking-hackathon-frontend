// Hooks
import { useSurnames } from "@/modules/users/hooks/useSurnames";
import { useFilterUsers } from "@/modules/users/hooks/useFilterUsers";
// Componentes
import SelectMenu from "@modals/SelectMenu";
import FilterModal from "@modals/FilterModal";

export default function FilterUsersModal({ filters, setFilters, onClose }) {
  const { surnames } = useSurnames();
  const { form, handleChange } = useFilterUsers(filters);

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
      <div className="flex flex-col gap-2">
        <SelectMenu
          showAllOption
          id={"surnames-menu"}
          spanText={"Apellido"}
          name={"first_surname"}
          value={form.first_surname}
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
