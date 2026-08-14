"use client";

interface ScrollButtonProps {
  targetId: string;
  className?: string;
  children: React.ReactNode;
}

export default function ScrollButton({
  targetId,
  className,
  children,
}: ScrollButtonProps) {
  return (
    <button
      className={className}
      onClick={() =>
        document
          .getElementById(targetId)
          ?.scrollIntoView({ behavior: "smooth" })
      }
    >
      {children}
    </button>
  );
}
