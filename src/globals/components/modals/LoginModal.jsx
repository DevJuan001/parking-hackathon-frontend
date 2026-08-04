// Hooks
import { useLogin } from "@hooks/useLogin";
import { useInnerModal } from "@hooks/useInnerModal";
// Componentes
import Icon from "@components/ui/Icon";
import Loader from "@components/ui/Loader";
import FormField from "@components/ui/FormField";
import LoginAndRegisterButtons from "@components/ui/LoginAndRegisterButtons";
// Modales
import ErrorModal from "@modals/ErrorModal";
import AddInnerModal from "@modals/AddInnerModal";
import RegisterModal from "@modals/RegisterModal";
import RecoverPasswordModal from "@modals/RecoverPasswordModal";

export default function LoginModal({
  googleLoading,
  handleGoogleLogin,
}) {
  const {
    form,
    loading,
    error,
    handleChange,
    handleSubmit,
    setShowPassword,
    showPassword,
    fieldError,
  } = useLogin();
  const {
    innerType,
    innerTrigger,
    innerData,
    openInnerModal,
    closeInnerModal,
  } = useInnerModal();

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
        onSubmit={(e) => handleSubmit(e, openInnerModal)}
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
          githubButtonOnClick={() => alert("No disponible")}
          googleButtonOnClick={(e) => handleGoogleLogin(e, openInnerModal)}
          disabled={loading || googleLoading}
          confirmButtonOnClick={(e) => handleSubmit(e, openInnerModal)}
          confirmButtonText={
            loading || googleLoading ? <Loader /> : "Iniciar sesión"
          }
          recoverPasswordButtonOnClick={(e) =>
            openInnerModal("recoverPassword", e)
          }
        />
      </form>

      {innerType === "recoverPassword" && (
        <RecoverPasswordModal
          triggerRef={innerTrigger}
          onClose={closeInnerModal}
        />
      )}

      {innerType === "register" && (
        <AddInnerModal
          isOpen={true}
          type="register"
          location="center"
          triggerRef={innerTrigger}
          onClose={closeInnerModal}
        >
          <RegisterModal
            googleLoading={googleLoading}
            handleGoogleLogin={handleGoogleLogin}
          />
        </AddInnerModal>
      )}

      {innerType === "error" && (
        <ErrorModal
          isOpen={true}
          location="center"
          triggerRef={innerTrigger}
          errorTitle={"Usuario o contraseña incorrectos"}
          errorText={error}
          confirmButtonText={"Volver"}
          onClose={closeInnerModal}
        />
      )}

      {innerType === "googleError" && (
          <ErrorModal
            isOpen={true}
            triggerRef={innerTrigger}
            location="anchored"
            errorTitle={"No se pudo iniciar sesión con Google"}
            errorText={innerData}
            confirmButtonText="Volver"
          onClose={closeInnerModal}
        />
      )}

      {innerType === "notRegistered" && (
        <ErrorModal
          isOpen={true}
          location="center"
          triggerRef={innerTrigger}
          errorTitle={"Cuenta no encontrada"}
          errorText={error}
          confirmButtonText={"Registrarse"}
          confirmButtonOnClick={(e) => openInnerModal("register", e)}
          onClose={closeInnerModal}
        />
      )}
    </section>
  );
}
