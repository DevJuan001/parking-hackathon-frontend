export default function Loader({ invert = false }) {
  return (
    <span
      className={`inline-block w-4 h-4 rounded-2xl border-b-transparent! border-2 animate-rotation
      ${invert ? "border-black!" : "border-white"}
      dark:invert`}
    />
  );
}
