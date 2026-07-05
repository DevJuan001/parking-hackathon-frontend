// Hooks
import { useLogin } from "../../hooks/useLogin";
import { useInnerModal } from "../../../../globals/hooks/useInnerModal";
// Componentes
import Icon from "../../../../globals/components/ui/Icon";
import Loader from "../../../../globals/components/ui/Loader";
import LoginAndRegisterButtons from "./LoginAndRegisterButtons";
import FormField from "../../../../globals/components/ui/FormField";
// Modales
import RecoverPasswordModal from "./RecoverPasswordModal";
import ErrorModal from "../../../../globals/components/modals/ErrorModal";

export default function LoginModal() {
  const {
    form,
    loading,
    handleChange,
    handleSubmit,
    setShowPassword,
    showPassword,
    fieldError,
  } = useLogin();
  const { innerType, innerTrigger, openInnerModal, closeInnerModal } =
    useInnerModal();

  return (
    <section
      className="flex flex-col py-10 gap-3 font-poppins
      md:py-28 md:px-36
      xl:py-32 xl:px-52"
    >
      <div className="flex gap-1 font-inter">
        <Icon name={"parking_sign"} fill size={24} className={"dark:invert"} />

        <span
          className="font-semibold 
          dark:text-white"
        >
          Parking
        </span>
      </div>

      <span
        data-shared-id="login-modal-title"
        className="text-4xl font-semibold font-dmsans
        dark:text-white"
      >
        Iniciar sesión
      </span>

      <form
        action={(e) => handleChange(e, openInnerModal)}
        className="flex flex-col gap-2"
      >
        <FormField
          id={"email"}
          name={"email"}
          labelText={"Correo"}
          value={form.email}
          onChange={handleChange}
          placeholder={"Escribe tu correo"}
          className={fieldError("email")}
        />

        <FormField
          id={"password"}
          name={"password"}
          labelText={"Contraseña"}
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={handleChange}
          placeholder={"Escribe tu contraseña"}
          className={fieldError("password")}
        >
          <button
            className="flex items-center pr-1"
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <Icon name={showPassword ? "visibility_off" : "visibility"} />
          </button>
        </FormField>

        <LoginAndRegisterButtons
          confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
          confirmButtonText={loading ? <Loader /> : "Iniciar sesión"}
          recoverPasswordButtonOnClick={(e) =>
            openInnerModal("recoverPassword", e)
          }
          googleButtonOnClick={() => alert("a")}
          githubButtonOnClick={() => alert("a")}
        />
      </form>

      {innerType === "recoverPassword" && (
        <RecoverPasswordModal
          triggerRef={innerTrigger}
          onClose={closeInnerModal}
        />
      )}

      {innerType === "error" && (
        <ErrorModal
          isOpen={true}
          location="center"
          triggerRef={innerTrigger}
          errorTitle={"Usuario o contraseña incorrectos"}
          errorText={
            "Verifica que tus credenciales esten escritas correctamente e intentalo nuevamente"
          }
          confirmButtonText={"Volver"}
          onClose={closeInnerModal}
        />
      )}
    </section>
  );
}
