import Navbar from "@components/Layout/aside/Navbar";
import { useCurrentUser } from "@hooks/useCurrentUser";

export default function Aside() {
  const { hasRole } = useCurrentUser();

  return (
    <aside
      className="sticky flex order-2 h-[80px] py-1 z-10 transition-all duration-700"
    >
      <Navbar hasRole={hasRole} />
    </aside>
  );
}
