export default function Hero({ openModal }) {
  return (
    <section
      id="hero"
      className="w-full mt-20 mb-28 flex flex-col items-center gap-5
      md:px-1.5 md:mt-32
      dark:text-white"
    >
      <h1
        className="text-[40px] text-center px-3 font-semibold leading-10
        md:leading-13
        md:text-6xl
        dark:text-[#E4E2E5]"
      >
        Gestiona tu Parqueadero Fácil
      </h1>

      <p
        className="text-xl px-2 text-center text-[#7E8088] font-medium
        md:max-w-xl md:text-2xl"
      >
        Registra vehículos, asigna plazas, calcula tarifas automáticamente y
        administra toda tu operación desde un único panel.
      </p>

      <div className="flex gap-2 mt-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            openModal(null, "register", e.currentTarget);
          }}
          className="px-7 py-3 border rounded-4xl font-semibold bg-black text-white transition-transform duration-300
          focus:animate-click-effect
          hover:scale-[1.02] hover:text-[#ffffffb4]
          dark:bg-white dark:text-black dark:hover:text-black"
        >
          Prueba gratis
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            openModal(null, "logIn", e.currentTarget);
          }}
          className="px-6 py-3 rounded-4xl bg-[#fbf9fc] border-2 border-[#e5e7eb] font-semibold transition-colors duration-300
          focus:animate-click-effect
          hover:bg-gray-200
          dark:text-[#e4e2e5] dark:bg-[#0a0a0a] dark:border-[#202022] dark:hover:bg-[#202022]"
        >
          <span data-shared-id="login-modal-title">Iniciar sesión</span>
        </button>
      </div>
    </section>
  );
}
