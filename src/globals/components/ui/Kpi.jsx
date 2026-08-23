export default function Kpi({ title, value }) {
  return (
    <div
      className="w-full flex flex-1 grow basis-32 flex-col items-start px-6 py-5.5 rounded-3xl bg-[#f5f3f6] font-dmsans
      md:w-full
      dark:bg-[#101012]"
    >
      <span
        className="text-[#75777E]
        dark:text-[#7E8088]"
      >
        {title}
      </span>

      <span
        className="text-2xl font-medium
        dark:text-[#E4E2E5]"
      >
        {value}
      </span>
    </div>
  );
}
