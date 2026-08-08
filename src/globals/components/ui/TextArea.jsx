export default function TextArea({
  id,
  name,
  value,
  onChange,
  children,
  labelText,
  className,
  placeholder,
}) {
  return (
    <div
      tabIndex={0}
      className={`relative flex w-full border border-[#E4E2E5] pr-1 pb-1 rounded-2xl
        focus-within:shadow-[0_0_3px_2px_#e5e7eb]
        dark:border-[#1e1e20cb] dark:focus-within:shadow-[0_0_4px_3px_#28282b]
        ${className}
      `}
    >
      <textarea
        required
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-full p-[2rem_1rem_0.5rem_1rem] bg-transparent rounded-xl outline-none transition-all duration-200
        autofill:bg-white autofill:shadow-[inset_0_0_0px_1000px_white]
        dark:text-[#E4E2E5] dark:placeholder:text-[#b4aab4]
        "
      />

      <label
        htmlFor={id}
        className="absolute left-3.5 top-5 px-0.5 text-xs text-[#7E777E] bg-[#FBF9FC] pointer-events-none -translate-y-1/2 transition-all duration-200
        dark:bg-black dark:text-[#b4aab4]
        "
      >
        {labelText}
      </label>
      {children}
    </div>
  );
}
