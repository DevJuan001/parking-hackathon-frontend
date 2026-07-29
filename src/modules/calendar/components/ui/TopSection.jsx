import Icon from "@components/ui/Icon";
import ShareButton from "@components/ui/ShareButton";
import CreateButton from "@components/ui/CreateButton";
import ExportButton from "@components/ui/ExportButton";

export default function TopSection({
  text,
  prevButtonOnClick,
  nextButtonOnClick,
  activeCalendarLayout,
  setActiveCalendarLayout,
  openModal,
}) {
  return (
    <div
      className="h-[13%] flex items-center justify-between
      sm:h-[9%]
      md:h-[8%]
      dark:text-[#E4E2E5]"
    >
      <div className="h-full flex items-center gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={prevButtonOnClick}
            className="w-fit h-fit flex items-center justify-center p-2.5 rounded-3xl
            hover:bg-[#EFEDF0]
            dark:hover:bg-[#101012]"
          >
            <Icon name={"keyboard_arrow_left"} />
          </button>

          <span className="text-2xl font-medium font-poppins">{text}</span>

          <button
            onClick={nextButtonOnClick}
            className="w-fit h-fit flex items-center justify-center text-center p-2.5 rounded-3xl
            hover:bg-[#EFEDF0]
            dark:hover:bg-[#101012]"
          >
            <Icon name={"keyboard_arrow_right"} />
          </button>
        </div>

        <div
          className="h-fit flex py-1.5 px-3.5 gap-1 bg-[#F5F3F6] rounded-4xl
          dark:bg-[#101012]"
        >
          <button
            onClick={() => setActiveCalendarLayout("dayLayout")}
            className="h-full flex items-center justify-center p-2"
          >
            <Icon
              name={"calendar_view_day"}
              fill={activeCalendarLayout === "dayLayout" ? true : false}
              className="text-[#75777E]
              dark:text-[#7E8088]"
            />
          </button>

          <button
            onClick={() => setActiveCalendarLayout("weekLayout")}
            className="flex items-center justify-center p-2"
          >
            <Icon
              name={"calendar_view_week"}
              fill={activeCalendarLayout === "weekLayout" ? true : false}
              className="text-[#75777E]
              dark:text-[#7E8088]"
            />
          </button>

          <button
            onClick={() => setActiveCalendarLayout("monthLayout")}
            className="h-full flex items-center justify-center p-2"
          >
            <Icon
              name={"calendar_view_month"}
              fill={activeCalendarLayout === "monthLayout" ? true : false}
              className="text-[#75777E]
              dark:text-[#7E8088]"
            />
          </button>
        </div>
      </div>

      <div
        className="flex gap-2
          lg:gap-3"
      >
        <ShareButton
          onClick={(e) => openModal(null, "share", e.currentTarget)}
        />

        <ExportButton
          onClick={(e) => openModal(null, "export", e.currentTarget)}
        />

        <CreateButton
          onClick={(e) => openModal(null, "createReservation", e.currentTarget)}
        />
      </div>
    </div>
  );
}
