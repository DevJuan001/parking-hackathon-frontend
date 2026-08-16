export default function MapsField({
  id,
  name,
  value,
  disabled,
  onChange,
  className,
  labelText,
  minLength,
  maxLength,
  type = "text",
  placeholder,
  autoComplete = "off",
}) {
  return (
    <div
      className={`relative flex w-full h-16.5 pr-2 rounded-2xl bg-[#FBF9FC] border border-[#E4E2E5] overflow-hidden transition-shadow
      focus-within:shadow-[0_0_3px_2px_#e5e7eb]
      dark:bg-black dark:border-[#202022] dark:focus-within:shadow-[0_0_3px_3px_#28282b]
      ${disabled ? "opacity-60" : className}
      `}
    >
      <input
        required
        id={id}
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="
          w-full h-16 pt-7 px-4 pb-2 outline-none
          bg-transparent rounded-xl
          transition-all duration-200
          dark:text-[#E4E2E5] dark:placeholder:text-[#b4aab4]
        "
      />

      {labelText && (
        <label
          htmlFor={id}
          className="
          absolute left-3.5 top-5 px-0.5 -translate-y-1/2 bg-[#FBF9FC] text-xs text-[#7E777E] pointer-events-none transition-all duration-200
          dark:bg-black dark:text-[#b4aab4]
        "
        >
          {labelText}
        </label>
      )}
    </div>
  );
}
