// Hooks
import { useIncomesChartData } from "@/modules/finance/hooks/useIncomesChartData";
// Componentes
import Icon from "@components/ui/Icon";
import SelectMenu from "@modals/SelectMenu";
import Skeleton from "@components/ui/Skeleton";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export default function IncomesChart() {
  const { incomesData, form, loading, handleChange, handleSubmit } =
    useIncomesChartData();
  const noIncomes = incomesData.length === 0 && !loading;

  return (
    <div
      className="flex flex-col p-5 gap-2 rounded-4xl border border-[#E4E2E5]
      md:col-span-2 md:row-span-4 
      dark:border-[#17171a]"
    >
      <div className="flex justify-between">
        <span className="text-lg">Ingresos</span>

        <SelectMenu
          miniVersion
          name={"period"}
          value={form.period}
          onChange={handleChange}
          optionOnClick={handleSubmit}
          options={[
            { value: "1y", label: "Este año" },
            { value: "1m", label: "Este mes" },
            { value: "1w", label: "Esta semana" },
          ]}
        />
      </div>

      {noIncomes && (
        <div
          className="h-full w-full flex flex-col items-center justify-center gap-2 text-[#75777E]
          dark:text-[#7E8088]"
        >
          <Icon name={"border_clear"} size={90} />

          <span className="text-xl font-semibold font-poppins">
            No se encontraron ingresos registrados
          </span>
        </div>
      )}

      {loading ? (
        <Skeleton
          width="100%"
          height="100%"
          backgroundColor={"#F3EEF5"}
          darkModeBackgroundColor={"#101012"}
          shineColor="#C5C1C7"
          darkModeShineColor="#1e1e1e"
          borderRadius={"50px"}
        />
      ) : (
        <ResponsiveContainer>
          <BarChart responsive data={incomesData}>
            <Bar
              dataKey={"value"}
              radius={[42, 42, 0, 0]}
              fill="var(--color-chart-bar)"
            />

            <XAxis dataKey={"label"} style={{ fontSize: "14px" }} />

            <Tooltip cursor={false} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
