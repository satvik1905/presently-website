import FieldError from "./FieldError";

const inputClass =
  "w-full font-[inherit] text-sm py-3 px-3.5 border border-[#E7E5DF] rounded-[8px] text-[#101828] bg-white transition-[border-color] duration-150 focus:outline-none focus:border-[#2563EB] focus:shadow-[0_0_0_3px_#EEF3FE] placeholder:text-[#B0B5BE]";

interface Props {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  type?: "text" | "tel" | "email";
  disabled?: boolean;
  className?: string;
}

export default function TextField({
  label,
  placeholder,
  value,
  onChange,
  required,
  error,
  type = "text",
  disabled,
  className,
}: Props) {
  return (
    <div className={`mb-4 ${className ?? ""}`}>
      <label className="block text-[13.5px] font-medium text-[#101828] mb-1.5">
        {label}
        {required && <span className="text-[#DC2626]"> *</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
      <FieldError message={error} />
    </div>
  );
}

export { inputClass };
