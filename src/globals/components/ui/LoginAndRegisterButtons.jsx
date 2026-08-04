import { icons } from "@/assets/icons";

export default function LoginAndRegisterButtons({
  googleButton,
  githubButton,
  confirmButtonText,
  confirmButtonOnClick,
  recoverPasswordButtonOnClick,
  disabled,
}) {
  return (
    <section className="flex flex-col items-center mt-2 gap-3">
      {recoverPasswordButtonOnClick && (
        <button
          id="recover-password-button"
          disabled={disabled}
          type="button"
          onClick={recoverPasswordButtonOnClick}
          className="w-full mb-3 text-start text-sm text-blue-800 underline
          focus:animate-click-effect
          hover:cursor-pointer"
        >
          <span>¿Olvidaste tu contraseña?</span>
        </button>
      )}

      <button
        id="login-button"
        type="submit"
        disabled={disabled}
        onClick={confirmButtonOnClick}
        className="w-full h-15 flex items-center justify-center px-5 py-2.5 gap-2 font-semibold text-sm bg-black text-white rounded-2xl transition duration-300
        focus:animate-click-effect
        hover:text-gray-300 hover:cursor-pointer
        dark:bg-white dark:text-black dark:hover:text-gray-800"
      >
        <span className="dark:text-black">{confirmButtonText}</span>
      </button>

      {googleButton && (
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center justify-center gap-2">
            <div
              className="w-full border border-[#e5e7eb]
              dark:border-[#1e1e20cb]"
            />

            <span
              className="text-sm text-center text-[#75777E]
              dark:text-[#7E8088]"
            >
              O
            </span>

            <div
              className="w-full border border-[#e5e7eb]
              dark:border-[#1e1e20cb]"
            />
          </div>

          <div className="h-14 flex gap-2">
            <a
              disabled
              target="_blank"
              rel="noopener noreferrer"
              href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_GOOGLE_REDIRECT_URL}&response_type=code&scope=openid%20email%20profile&access_type=offline`}
              className="w-full flex items-center justify-center py-3 gap-3 rounded-2xl border border-[#e5e7eb] text-sm outline-0 transition duration-300
              focus:animate-click-effect
              hover:bg-gray-200 hover:cursor-pointer
              dark:border-[#1e1e20cb] dark:text-white dark:hover:bg-[#28282bbd]"
            >
              <icons.googleIcon className="w-4 h-4" />
            </a>

            {githubButton && (
              <a
                disabled
                href="http://localhost:8000/api/auth/google-login"
                className="w-full flex items-center justify-center py-3 gap-3 rounded-2xl border border-[#e5e7eb] text-sm outline-0 transition duration-300
                focus:animate-click-effect
                hover:bg-gray-200 hover:cursor-pointer
                dark:border-[#1e1e20cb] dark:text-white dark:hover:bg-[#28282bbd]"
              >
                <icons.githubIcon
                  className="w-5 h-5
                  dark:invert"
                />
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
