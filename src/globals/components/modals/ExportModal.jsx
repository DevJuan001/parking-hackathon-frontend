import Icon from "../ui/Icon";

export default function ExportModal({
  exportToPdfButtonOnClick,
  exportToExcelButtonOnCLick,
}) {
  return (
    <div
      className="flex flex-col
      dark:text-[#E4E2E5]"
    >
      <button
        onClick={exportToPdfButtonOnClick}
        className="w-full flex items-center rounded-4xl p-4 gap-2 text-start
        hover:bg-[#f5f3f6]
        dark:hover:bg-[#101012]"
      >
        <Icon data-shared-id="export-icon" name={"download"} />

        <span>Exportar PDF</span>
      </button>

      <button
        onClick={exportToExcelButtonOnCLick}
        className="w-full flex items-center rounded-4xl p-4 gap-2 text-start
        hover:bg-[#f5f3f6]
        dark:hover:bg-[#101012]"
      >
        <Icon name={"table"} />

        <span>Exportar CSV</span>
      </button>
    </div>
  );
}
