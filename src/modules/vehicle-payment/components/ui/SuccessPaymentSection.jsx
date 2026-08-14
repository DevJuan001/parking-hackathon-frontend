import Icon from "@components/ui/Icon";

export default function SuccessPaymentSection({
  setActiveSection,
  setPaymentData,
}) {
  setTimeout(() => {
    setPaymentData({});
    setActiveSection("calculatePayment");
  }, 5000);

  return (
    <div
      className="self-center h-full flex flex-col justify-center gap-2 animate-blur-down
      dark:text-[#E4E2E5]"
    >
      <div
        className="w-20 h-20 flex items-center justify-center bg-green-200 rounded-full
        dark:bg-green-950"
      >
        <Icon name={"check"} size={50} color={"#008236"} />
      </div>

      <span
        className="text-3xl text-[#75777E]
        dark:text-[#7E8088]"
      >
        ¡Gracias por elegirnos!
      </span>

      <span className="text-6xl font-semibold">
        Pago registrado correctamente
      </span>

      <span className="text-3xl text-[#75777E]">
        Esperamos tenerte de vuelta
      </span>
    </div>
  );
}
