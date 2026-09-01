"use client";

import { useState, useCallback } from "react";

export interface Slide {
  src?: string;
  alt: string;
  caption: string;
  placeholder?: string;
}

interface ScreenshotCarouselProps {
  slides: Slide[];
  label: string;
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  const d = direction === "left" ? "M10 4L6 8L10 12" : "M6 4L10 8L6 12";
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const arrowBase =
  "absolute top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm border border-[var(--line)] flex items-center justify-center text-[var(--ink)] disabled:opacity-0 disabled:pointer-events-none hover:bg-white transition-[background-color,opacity] duration-150 cursor-pointer";

export default function ScreenshotCarousel({
  slides,
  label,
}: ScreenshotCarouselProps) {
  const [active, setActive] = useState(0);

  const go = useCallback(
    (dir: -1 | 1) => {
      setActive((prev) =>
        Math.max(0, Math.min(slides.length - 1, prev + dir))
      );
    },
    [slides.length]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    },
    [go]
  );

  return (
    <div
      className="mt-10 outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-2 rounded-[var(--radius-lg)]"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      {/* Fixed-height slide frame */}
      <div className="relative w-full h-[480px] max-md:h-[320px] max-sm:h-[220px] rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--bg)] overflow-hidden">
        {/* Prev */}
        <button
          onClick={() => go(-1)}
          disabled={active === 0}
          className={`${arrowBase} left-3`}
          aria-label="Previous slide"
        >
          <Arrow direction="left" />
        </button>

        {/* Next */}
        <button
          onClick={() => go(1)}
          disabled={active === slides.length - 1}
          className={`${arrowBase} right-3`}
          aria-label="Next slide"
        >
          <Arrow direction="right" />
        </button>

        {/* Track */}
        <div
          className="flex h-full motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.src ?? `placeholder-${i}`}
              className="w-full h-full shrink-0 flex items-center justify-center p-6 max-sm:p-3"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${slides.length}: ${slide.caption}`}
              aria-hidden={active !== i}
            >
              {slide.src ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={slide.src}
                  alt={slide.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="max-w-full max-h-full object-contain rounded-[var(--radius-sm)] shadow-[var(--shadow-card)]"
                />
              ) : (
                <div className="w-full h-full rounded-[var(--radius-sm)] border border-dashed border-[var(--line)] flex items-center justify-center">
                  <span className="text-[var(--placeholder)] text-[15px] font-medium select-none text-center px-4">
                    {slide.placeholder ?? "Screenshot pending"}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Caption + dots */}
      <div className="mt-4 flex flex-col items-center gap-3">
        <p className="text-[var(--muted)] text-[14px]">
          {slides[active].caption}
        </p>
        <div className="flex gap-2" role="tablist" aria-label="Slide navigation">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-colors duration-150 cursor-pointer ${
                active === i
                  ? "bg-[var(--blue)]"
                  : "bg-[var(--line)] hover:bg-[var(--line-hover)]"
              }`}
              role="tab"
              aria-selected={active === i}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
