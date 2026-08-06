import { months } from "@utils/months";

export default function ReservationTimeSection({ day, month, year }) {
  return (
    <div className="flex flex-col p-5 gap-5 animate-blur-down">
      <span className="text-nowrap">{`${day} ${months[month]} ${year}`}</span>

      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-col p-5 border border-[#E4E2E5]">
          <span>1:00 a.m</span>
        </div>
      </div>
    </div>
  );
}
