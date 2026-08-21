import FieldError from "./FieldError";
import { inputClass } from "./TextField";

interface Props {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  rows?: number;
  className?: string;
}

export default function TextArea({
  label,
  placeholder,
  value,
  onChange,
  required,
  error,
  rows,
  className,
}: Props) {
  return (
    <div className={`mb-4 ${className ?? ""}`}>
      <label className="block text-[13.5px] font-medium text-[#101828] mb-1.5">
        {label}
        {required && <span className="text-[#DC2626]"> *</span>}
      </label>
      <textarea
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={`${inputClass} resize-y min-h-[80px]`}
      />
      <FieldError message={error} />
    </div>
  );
}
