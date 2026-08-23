// Hooks
import { useInnerModal } from "@hooks/useInnerModal";
import { useRoles } from "@/modules/users/hooks/useRoles";
import { useCreateUser } from "@/modules/users/hooks/useCreateUser";
// Components
import Loader from "@components/ui/Loader";
import SelectMenu from "@modals/SelectMenu";
import FormField from "@components/ui/FormField";
import ConfirmCancelButtons from "@modals/ConfirmCancelButtons";
// Modals
import ErrorModal from "@modals/ErrorModal";
import SuccessModal from "@modals/SuccessModal";

export default function CreateUserModal({ onClose }) {
  const { roles } = useRoles();
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();
  const { handleChange, handleSubmit, form, loading, error } = useCreateUser();

  return (
    <form
      onSubmit={(e) => handleSubmit(e, openInnerModal)}
      className="flex flex-col gap-2"
    >
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
        value={form.name}
        disabled={loading}
        autoComplete="off"
        labelText={"Nombre"}
        placeholder={"Miguel"}
        onChange={handleChange}
      />

      <FormField
        disabled={loading}
        autoComplete="off"
        id={"first_surname"}
        placeholder={"Pérez"}
        name={"first_surname"}
        onChange={handleChange}
        value={form.first_surname}
        labelText={"Primer Apellido"}
      />

      <FormField
        autoComplete="off"
        disabled={loading}
        id={"second_surname"}
        name={"second_surname"}
        onChange={handleChange}
        placeholder={"Contreras"}
        value={form.second_surname}
        labelText={"Segundo Apellido"}
      />

      <FormField
        id={"email"}
        name={"email"}
        disabled={loading}
        value={form.email}
        autoComplete="off"
        onChange={handleChange}
        labelText={"Correo electronico"}
        placeholder={"miguel@gmail.com"}
      />

      <ConfirmCancelButtons
        disabled={loading}
        cancelButtonOnClick={onClose}
        confirmText={loading ? <Loader /> : "Crear"}
        confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
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
            closeInnerModal();
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
          onClose={closeInnerModal}
        />
      )}
    </form>
  );
}
