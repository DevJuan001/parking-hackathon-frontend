import Icon from "@components/ui/Icon";
import { NavLink } from "react-router-dom";

export default function NavItem({
  itemId,
  path,
  name,
  icon,
  showName,
  onClick,
}) {
  return (
    <NavLink to={path} onClick={onClick}>
      {({ isActive }) => (
        <div
          id={`${itemId}-aside-button`}
          className={`w-auto h-14 flex items-center py-3 px-6 gap-2 subpixel-antialiased rounded-full transition-[background-color,color,box-shadow] duration-500 ease-in-out group
            ${
              isActive
                ? `bg-black shadow-[0px_0px_18px_-11px_#000000] text-white
              dark:bg-white dark:text-black dark:shadow-[0px_0px_18px_-11px_#ffffff]`
                : `bg-transparent text-[#75777E]
              hover:bg-[#e5e7eb96]
              dark:bg-transparent dark:text-[#75777eb7] dark:hover:bg-[#181818]`
            }`}
        >
          <Icon
            name={icon}
            size={25}
            fill={isActive}
            className={`transition-colors duration-500 ease-in-out
            ${
              isActive
                ? `group-hover:scale-105
                dark:fill-black`
                : `text-[#75777eb7]
                group-hover:text-black group-hover:[--icon-weight:500] dark:group-hover:text-white`
            }`}
          />

          <div
            className={`text-center font-medium overflow-hidden transition-[max-width,opacity] duration-500 ease-in-out
            ${
              showName
                ? `max-w-[200px] opacity-100`
                : `max-w-0 opacity-0
                group-hover:max-w-[200px] group-hover:opacity-100`
            }
            ${
              isActive
                ? `font-semibold max-w-[200px] opacity-100`
                : `group-hover:text-black
                dark:group-hover:text-white`
            }`}
          >
            <span
              className={`inline-block text-nowrap whitespace-nowrap origin-left`}
            >
              {name}
            </span>
          </div>
        </div>
      )}
    </NavLink>
  );
}
