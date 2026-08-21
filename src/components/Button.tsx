import Link from "next/link";
import { type ComponentProps } from "react";

const base =
  "inline-flex items-center gap-2 text-[15px] font-medium rounded-full border cursor-pointer transition-[background,border-color,transform] duration-150 focus-visible:outline-2 focus-visible:outline-[#2563EB] focus-visible:outline-offset-[3px] disabled:opacity-45 disabled:cursor-not-allowed";

const variants = {
  primary: "bg-[#2563EB] text-white border-transparent hover:bg-[#1D4ED8]",
  ghost: "bg-white text-[#101828] border-[#E7E5DF] hover:border-[#C9C6BE]",
  danger: "bg-[#DC2626] text-white border-transparent hover:bg-[#B91C1C]",
} as const;

const sizes = {
  sm: "py-2 px-4",
  default: "py-2 px-4",
  lg: "py-3 px-6",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

interface SharedProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
}

type ButtonProps = SharedProps &
  Omit<ComponentProps<"button">, keyof SharedProps>;

type LinkButtonProps = SharedProps & {
  href: string;
} & Omit<ComponentProps<typeof Link>, keyof SharedProps | "href">;

function classes(variant: Variant, size: Size, fullWidth: boolean, extra?: string) {
  return [base, variants[variant], sizes[size], fullWidth && "w-full justify-center", extra]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  variant = "primary",
  size = "default",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classes(variant, size, fullWidth, className)}
      {...props}
    />
  );
}

export function LinkButton({
  variant = "primary",
  size = "default",
  fullWidth = false,
  className,
  href,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={classes(variant, size, fullWidth, className)}
      {...props}
    />
  );
}
