export default function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-[13.5px] text-[#DC2626] mt-1.5">{message}</p>;
}
