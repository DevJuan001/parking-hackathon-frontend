/// Hooks
import { useExits } from "@/modules/exits/hooks/useExits";
// Utils
import { formatTime } from "@/utils/formatTime";
import { formatDateTime } from "@/utils/formatDateTime";
// Componentes
import Icon from "@components/ui/Icon";
import Skeleton from "@components/ui/Skeleton";

export default function HistorialSection() {
  const { exits, loading } = useExits();
  const expenses = [{}];
  const noItems = exits?.length === 0 && expenses.length === 0;
  const items = [
    ...exits.map((exit) => ({
      ...exit,
      typeOfAction: "income",
      action: "Salida",
    })),
    ...expenses.map((expense) => ({
      ...expense,
      typeOfAction: "expense",
    })),
  ];

  return (
    <div
      className="row-span-4 p-5 rounded-4xl border border-[#E4E2E5]
      dark:border-[#17171a]"
    >
      <span className="text-lg">Historial</span>

      <div className="h-[95%] flex flex-col py-2 gap-1.5 rounded-2xl overflow-hidden overflow-y-auto">
        {loading && (
          <div className="w-full h-full flex flex-col gap-1.5">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton
                key={index}
                width="100%"
                height="64px"
                backgroundColor={"#F3EEF5"}
                darkModeBackgroundColor={"#101012"}
                shineColor="#C5C1C7"
                darkModeShineColor="#1e1e1e"
                borderRadius={"16px"}
              />
            ))}
          </div>
        )}

        {noItems && (
          <div
            className="h-full w-full flex flex-col items-center justify-center gap-2 text-[#75777E]
            dark:text-[#7E8088]"
          >
            <Icon name={"border_clear"} size={90} />

            <span className="text-xl font-medium font-poppins">
              No se encontraron movimientos registrados
            </span>
          </div>
        )}

        {!noItems &&
          items?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 pr-4 bg-[#F5F3F6] rounded-2xl text-sm
              dark:bg-[#101012]"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center justify-center p-3 rounded-xl
                  ${
                    item?.typeOfAction === "income"
                      ? `bg-green-100
                    dark:bg-green-950/40`
                      : `bg-red-100
                    dark:bg-red-950/40`
                  }
                `}
                >
                  <Icon
                    name={`${
                      item?.typeOfAction === "income"
                        ? "garage_money"
                        : "receipt_long"
                    }`}
                    fill
                    className={`${
                      item?.typeOfAction === "income"
                        ? `text-green-800
                    dark:bg-green-950/40`
                        : `text-red-800
                    dark:bg-red-950/40`
                    }`}
                  />
                </div>

                <div className="flex flex-col">
                  <span>{item?.action}</span>

                  <span
                    className={`text-lg font-medium
                    ${item?.value > 0 ? "text-green-600 dark:text-green-700" : "text-red-800"}`}
                  >
                    {`${item?.value > 0 ? `+$${item?.value}` : `${item?.value}`}` ||
                      "No registrado"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span>{formatDateTime(item?.created_at) ?? 0}</span>

                <span>{formatTime(item?.created_at) ?? 0}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
