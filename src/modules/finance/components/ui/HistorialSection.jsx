import Icon from "@components/ui/Icon";
import { formatTime } from "@/utils/formatTime";
import { formatDateTime } from "@/utils/formatDateTime";

export default function HistorialSection() {
  const items = [
    {
      typeOfAction: "expense",
      action: "Gasto",
      value: "-1.000",
      date: "2026-07-12T17:17:30",
    },
    {
      typeOfAction: "income",
      action: "Salida",
      value: "5.000",
      date: "2026-07-12T17:17:30",
    },
    {
      typeOfAction: "income",
      action: "Salida",
      value: "5.000",
      date: "2026-07-12T17:17:30",
    },
    {
      typeOfAction: "income",
      action: "Salida",
      value: "5.000",
      date: "2026-07-12T17:17:30",
    },
    {
      typeOfAction: "income",
      action: "Salida",
      value: "5.000",
      date: "2026-07-12T17:17:30",
    },
    {
      typeOfAction: "income",
      action: "Salida",
      value: "5.000",
      date: "2026-07-12T17:17:30",
    },
    {
      typeOfAction: "income",
      action: "Salida",
      value: "5.000",
      date: "2026-07-12T17:17:30",
    },
    {
      typeOfAction: "income",
      action: "Salida",
      value: "5.000",
      date: "2026-07-12T17:17:30",
    },
  ];

  return (
    <div
      className="row-span-4 p-5 rounded-4xl border border-[#E4E2E5]
      dark:border-[#17171a]"
    >
      <span className="text-lg">Historial</span>

      <div className="h-[95%] flex flex-col py-2 gap-1.5 rounded-2xl overflow-hidden overflow-y-auto">
        {items?.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 pr-4 bg-[#F5F3F6] rounded-2xl text-sm
            dark:bg-[#101012]"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center justify-center p-3 rounded-xl
                  ${
                    item.typeOfAction === "income"
                      ? `bg-green-100
                    dark:bg-green-950/40`
                      : `bg-red-100
                    dark:bg-red-950/40`
                  }
                `}
              >
                <Icon
                  name={`${
                    item.typeOfAction === "income"
                      ? "garage_money"
                      : "receipt_long"
                  }`}
                  fill
                  className={`${
                    item.typeOfAction === "income"
                      ? `text-green-800
                    dark:bg-green-950/40`
                      : `text-red-800
                    dark:bg-red-950/40`
                  }`}
                />
              </div>

              <div className="flex flex-col">
                <span>{item.action}</span>

                <span
                  className={`text-lg font-medium
                    ${item.value > 0 ? "text-green-600 dark:text-green-700" : "text-red-800"}`}
                >
                  {`${item.value > 0 ? `+$${item.value}` : `${item.value}`}`}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span>{formatDateTime(item.date)}</span>

              <span>{formatTime(item.date)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
