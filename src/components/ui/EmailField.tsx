import FieldError from "./FieldError";

const inputBase =
  "font-[inherit] text-sm py-3 px-3.5 border border-[#E7E5DF] text-[#101828] bg-white transition-[border-color] duration-150 focus:outline-none focus:border-[#2563EB] focus:shadow-[0_0_0_3px_#EEF3FE] placeholder:text-[#B0B5BE]";

interface Props {
  label: string;
  username: string;
  onUsernameChange: (value: string) => void;
  domain: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  className?: string;
}

export default function EmailField({
  label,
  username,
  onUsernameChange,
  domain,
  required,
  error,
  placeholder = "maya",
  className,
}: Props) {
  return (
    <div className={`mb-4 ${className ?? ""}`}>
      <label className="block text-[13.5px] font-medium text-[#101828] mb-1.5">
        {label}
        {required && <span className="text-[#DC2626]"> *</span>}
      </label>
      <div className="flex items-stretch">
        <input
          type="text"
          className={`${inputBase} w-full rounded-l-[8px] rounded-r-none border-r-0`}
          placeholder={placeholder}
          required={required}
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
        />
        <span
          className={`${inputBase} rounded-r-[8px] rounded-l-none bg-[#FAFAF7] text-[#5B6472] whitespace-nowrap select-none flex items-center w-auto shrink-0`}
        >
          {domain}
        </span>
      </div>
      <FieldError message={error} />
    </div>
  );
}
