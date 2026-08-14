// Constantes
import { paymentMethodStyles } from "@/modules/vehicle-payment/constants/paymentMethodStyles";
// Componentes
import Icon from "@components/ui/Icon";

export default function PaymentMethodCard({
  id,
  icon,
  text,
  onClick,
  activePaymentMethod,
}) {
  return (
    <button
      id={`payment-method-${id}`}
      onClick={onClick}
      className={`h-32 w-[48%] flex flex-col items-center justify-center p-5 gap-1 rounded-2xl leading-4.5 font-medium border border-[#ffffff99] shadow outline-0
      active:animate-click-effect
      hover:scale-[1.02]
      dark:border-[#101012]
      ${
        activePaymentMethod === id
          ? `bg-[#00000015]
          dark:bg-[#303032]`
          : `bg-[#ffffff3d] 
          hover:bg-[#00000006]
          dark:bg-[#101012] dark:hover:bg-[#1d1d20ee]`
      }
      `}
    >
      <Icon
        name={icon}
        size={40}
        fill
        className={paymentMethodStyles[text]?.styles}
      />

      <span>{text}</span>
    </button>
  );
}
