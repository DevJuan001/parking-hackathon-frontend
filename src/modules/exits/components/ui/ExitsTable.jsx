// Componentes
import Icon from "@components/ui/Icon";
import Skeleton from "@components/ui/Skeleton";
// Utils
import { formatDateTime, formatTimeDate } from "@/utils/formatDateTime";

export default function ExitsTable({ exits, loading }) {
  const noExits = exits.length === 0 && !loading;
  const isFirstLoad = exits.length === 0 && loading;

  return (
    <div
      className={`${noExits || isFirstLoad ? "h-full" : "h-auto border"} w-full border border-[#E4E2E5] rounded-3xl overflow-y-auto
      dark:border-[#17171a] dark:text-[#E4E2E5]`}
    >
      {noExits && (
        <div
          className="h-[700px] flex flex-col items-center justify-center gap-1 rounded-2xl text-[#7E8088] bg-[#f5f3f6]
          dark:text-[#E4E2E5] dark:bg-black"
        >
          <Icon name={"border_clear"} size={64} />

          <span
            className="text-xl font-medium text-center
            dark:text-[#E4E2E5]"
          >
            No hay salidas registradas
          </span>
        </div>
      )}

      {isFirstLoad ? (
        <Skeleton
          width="100%"
          height="700px"
          borderRadius={"15px"}
          backgroundColor={"#F3EEF5"}
          darkModeBackgroundColor={"#101012"}
          shineColor="#C5C1C7"
          darkModeShineColor="#1e1e1e"
        />
      ) : (
        !noExits && (
          <table className="h-full w-full dark:bg-black">
            <thead
              className="sticky h-10 text-[#75777E] text-sm text-start border-b border-[#E4E2E5]
              hover:bg-[#f5f3f6]
              dark:border-[#17171a] dark:text-[#7E8088] dark:hover:bg-[#101012]"
            >
              <tr>
                <th className="font-medium pl-4">
                  <div className="flex items-center gap-1">
                    <Icon name={"emoji_transportation"} size={18} fill />

                    <span>Placa</span>
                  </div>
                </th>

                <th className="font-medium pl-4">
                  <div className="flex items-center gap-1">
                    <Icon name={"attach_money"} size={18} fill />

                    <span>Monto pagado</span>
                  </div>
                </th>

                <th className="font-medium pl-4">
                  <div className="flex items-center gap-1">
                    <Icon name={"wallet"} size={18} />

                    <span>Metodo de pago</span>
                  </div>
                </th>

                <th className="font-medium pl-4">
                  <div className="flex items-center gap-1">
                    <Icon name={"nest_clock_farsight_analog"} size={18} />

                    <span>Hora de salida</span>
                  </div>
                </th>

                <th className="font-medium pl-4">
                  <div className="flex items-center gap-1">
                    <Icon name={"calendar_month"} size={18} fill />

                    <span>Fecha de salida</span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="dark:text-white">
              {exits.map((exit) => (
                <tr
                  key={exit?.id}
                  className="h-12 transition-colors duration-200
                  hover:bg-[#f5f3f6]
                  dark:hover:bg-[#101012]"
                >
                  <th className="font-medium text-sm pl-4 text-start">
                    {exit?.plate}
                  </th>

                  <th className="font-semibold text-sm pl-4 text-start">
                    {`$${exit?.value ?? 0}`}
                  </th>

                  <th className="font-medium text-sm pl-4 text-start">
                    {exit?.payment_method ?? "No registrado"}
                  </th>

                  <th className="font-medium text-sm pl-4 text-start">
                    {formatTimeDate(exit?.created_at)}
                  </th>

                  <th className="font-medium text-sm pl-4 text-start">
                    {formatDateTime(exit?.created_at)}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
}
