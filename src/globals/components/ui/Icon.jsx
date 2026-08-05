import "material-symbols/rounded.css";

export default function Icon({
  name,
  animateFill = false,
  fillDuration = 125,
  fill = false,
  weight = 400,
  size = 24,
  color,
  className,
  ...props
}) {
  return (
    <span
      {...props}
      className={`material-symbols-rounded ${className} select-none`}
      style={{
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' var(--icon-weight, ${weight}), 'GRAD' 0, 'opsz' ${size}`,
        fontSize: size,
        color,
        transition: animateFill
          ? `font-variation-settings ${fillDuration}ms cubic-bezier(.48, 0, 0, 1);`
          : undefined,
      }}
    >
      {name}
    </span>
  );
}
