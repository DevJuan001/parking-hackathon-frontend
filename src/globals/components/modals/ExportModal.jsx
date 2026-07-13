import Icon from "../ui/Icon";

export default function ExportModal({
  exportToPdfButtonOnClick,
  exportToExcelButtonOnCLick,
}) {
  return (
    <div className="flex flex-col">
      <button
        onClick={exportToPdfButtonOnClick}
        className="w-full flex items-center rounded-4xl p-4 gap-2 text-start
        hover:bg-[#f5f3f6]"
      >
        <Icon data-shared-id="export-icon" name={"download"} />

        <span>Exportar PDF</span>
      </button>

      <button
        onClick={exportToExcelButtonOnCLick}
        className="w-full flex items-center rounded-4xl p-4 gap-2 text-start
        hover:bg-[#f5f3f6]"
      >
        <Icon name={"table"} />

        <span>Exportar CSV</span>
      </button>
    </div>
  );
}
