export default function Kpi({ title, value }) {
  return (
    <div
      className="w-[48.8%] flex flex-col items-start py-5 px-6 rounded-3xl bg-[#f5f3f6]
      md:w-full
      dark:bg-[#101012]"
    >
      <span
        className="text-sm text-[#75777E]
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
