import Icon from "@components/ui/Icon";
import { spotStatus } from "@/modules/parking/constants/spotStatus";

export default function SpotItem({ name, status = 2, icon, onClick }) {
  const config = spotStatus[status] || spotStatus[2];

  return (
    <button
      onClick={onClick}
      className={`h-full w-full flex flex-col items-center justify-center gap-1 rounded-3xl transition-colors duration-200 overflow-hidden text-ellipsis
      ${config.styles}`}
    >
      <Icon
        data-shared-id="spot-icon"
        name={icon}
        size={14}
        fill={config.fill}
      />

      <span
        data-shared-id="spot-text"
        className="w-fit max-w-20 overflow-hidden font-semibold"
      >
        {name}
      </span>

      <span className="text-xs">{config.text}</span>
    </button>
  );
}
