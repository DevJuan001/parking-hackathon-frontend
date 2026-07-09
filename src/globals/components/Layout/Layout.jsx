import { Outlet } from "react-router-dom";
import Aside from "@components/Layout/aside/Aside";

export default function Layout() {
  return (
    // Container
    <div className="w-screen h-screen flex flex-col py-2.5 px-4">
      <Outlet />

      <Aside />
    </div>
  );
}
