import { Outlet } from "react-router-dom";
import Aside from "@components/Layout/aside/Aside";

export default function Layout() {
  return (
    // Container
    <div className="relative w-dvw h-dvh flex flex-col py-2.5 px-4">
      <Outlet />

      <Aside />
    </div>
  );
}
