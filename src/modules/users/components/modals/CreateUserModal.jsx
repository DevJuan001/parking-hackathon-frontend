// Hooks
import { useCreateUser } from "@/modules/users/hooks/useCreateUser";
import { useInnerModal } from "@hooks/useInnerModal";
import { useRoles } from "@/modules/users/hooks/useRoles";
// Components
import Loader from "@components/ui/Loader";
import FormField from "@components/ui/FormField";
import SelectMenu from "@modals/SelectMenu";
import ConfirmCancelButtons from "@modals/ConfirmCancelButtons";
// Modals
import ErrorModal from "@modals/ErrorModal";
import SuccessModal from "@modals/SuccessModal";

export default function CreateUserModal({ onClose }) {
  const { innerType, innerTrigger, openInnerModal } = useInnerModal();
  const { handleChange, handleSubmit, form, loading, error } = useCreateUser();
  const { roles } = useRoles();

  return (
    <section className="flex flex-col items-center gap-2">
      <SelectMenu
        id={"role-menu"}
        name={"role_id"}
        spanText={"Rol"}
        value={form.role_id}
        onChange={handleChange}
        options={roles.map((role) => ({
          value: role.id,
          label: role.name,
        }))}
      />

      <FormField
        id={"name"}
        name={"name"}
        labelText={"Nombre"}
        value={form.name}
        onChange={handleChange}
        autoComplete="off"
      />

      <FormField
        id={"first_surname"}
        name={"first_surname"}
        labelText={"Primer Apellido"}
        value={form.first_surname}
        onChange={handleChange}
        autoComplete="off"
      />

      <FormField
        id={"second_surname"}
        name={"second_surname"}
        labelText={"Segundo Apellido"}
        value={form.second_surname}
        onChange={handleChange}
        autoComplete="off"
      />

      <FormField
        id={"email"}
        name={"email"}
        labelText={"Correo electronico"}
        value={form.email}
        onChange={handleChange}
        autoComplete="off"
      />

      <ConfirmCancelButtons
        confirmText={loading ? <Loader /> : "Crear"}
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
        cancelButtonOnClick={onClose}
      />

      {innerType === "success" && (
        <SuccessModal
          triggerRef={innerTrigger}
          isOpen={true}
          confirmTitle={"Usuario creado con éxito!"}
          confirmText={
            "El usuario se ha registrado correctamente, toca el botón de volver a la pagina para verlo"
          }
          confirmButtonText={"Volver a la pagina"}
          onClose={() => {
            openInnerModal(null);
            onClose();
          }}
        />
      )}

      {innerType === "error" && (
        <ErrorModal
          triggerRef={innerTrigger}
          isOpen={true}
          errorTitle="¡No se pudo crear el usuario!"
          errorText={error}
          confirmButtonText="Volver a intentarlo"
          onClose={() => openInnerModal(null)}
        />
      )}
    </section>
  );
}
