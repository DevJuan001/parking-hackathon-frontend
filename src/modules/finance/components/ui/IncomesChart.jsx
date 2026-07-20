import SelectMenu from "@components/modals/SelectMenu";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

export default function IncomesChart() {
  const thisYearData = [
    { label: "Enero", value: 4 },
    { label: "Febrero", value: 12 },
    { label: "Marzo", value: 22 },
    { label: "Abril", value: 22 },
    { label: "Mayo", value: 22 },
    { label: "Junio", value: 22 },
    { label: "Julio", value: 22 },
    { label: "Agosto", value: 4 },
    { label: "Octubre", value: 15 },
    { label: "Septiembre", value: 22 },
    { label: "Noviembre", value: 15 },
    { label: "Diciembre", value: 10 },
  ];

  return (
    <div
      className="col-span-2 row-span-4 flex flex-col p-5 gap-2 rounded-4xl border border-[#E4E2E5]
      dark:border-[#17171a]"
    >
      <div className="flex justify-between">
        <span className="text-lg">Ingresos</span>

        <SelectMenu
          miniVersion
          options={[{ value: 1, label: "Este año" }]}
          value={1}
        />
      </div>

      <ResponsiveContainer>
        <BarChart responsive data={thisYearData}>
          <Bar dataKey={"value"} radius={[42, 42, 0, 0]} fill="var(--color-chart-bar)" />

          <XAxis dataKey={"label"} style={{ fontSize: "14px" }} />

          <Tooltip cursor={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
