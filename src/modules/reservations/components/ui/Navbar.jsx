import { icons } from "@/assets/icons";

export default function Navbar() {
  return (
    <nav className="sticky w-[80%] flex">
      <button className="flex items-center gap-2">
        <icons.googleIcon className="w-6 h-6" />

        <span className="font-semibold">Parking hackathon</span>
      </button>
    </nav>
  );
}
