"use client";

import { motion } from "framer-motion";
import { useStepActive } from "@/lib/step-context";

const spring = [0.34, 1.3, 0.64, 1] as const;
const springTight = [0.34, 1.2, 0.64, 1] as const;
const springBounce = [0.34, 1.56, 0.64, 1] as const;

export default function VigScan() {
  const active = useStepActive();
  const v = active ? "visible" : "hidden";

  return (
    <div
      className="relative h-[196px] overflow-hidden rounded-2xl border border-[#DCE5F5] mb-[22px]"
      style={{
        background:
          "linear-gradient(135deg, #EEF3FE 0%, #E0EAFF 50%, #D6E2FF 100%)",
      }}
      aria-hidden="true"
    >
      {/* Chip popup — "✓ Checked in · Maya R." */}
      <motion.span
        className="absolute top-3 left-0 right-0 mx-auto w-max inline-block rounded-full bg-[#EAF7EF] text-[#16A34A] px-2.5 py-1 text-[12.5px]"
        initial="hidden"
        animate={v}
        variants={{
          hidden: { opacity: 0, y: 10, scale: 0.5 },
          visible: { opacity: 1, y: 0, scale: 1 },
        }}
        transition={{
          duration: 0.5,
          delay: 2.2,
          ease: springBounce,
          opacity: { duration: 0.3, delay: 2.2, ease: "easeOut" },
        }}
      >
        ✓ Checked in · Maya R.
      </motion.span>

      {/* iPad frame */}
      <motion.div
        className="absolute left-1/2 -bottom-[44px] w-[168px] h-[190px] border-2 border-[#1D1D1F] border-b-0 rounded-t-2xl bg-[#1D1D1F]"
        style={{
          x: "-50%",
          boxShadow: "0 12px 28px -14px rgba(16,24,40,.32)",
        }}
        initial="hidden"
        animate={v}
        variants={{
          hidden: { y: 40, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        }}
        transition={{
          y: { duration: 0.7, delay: 0.1, ease: spring },
          opacity: { duration: 0.5, delay: 0.1, ease: "easeOut" },
        }}
      >
        {/* Camera dot */}
        <div
          className="absolute top-[7px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#3A3A3C] z-[1]"
          style={{ boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,.12)" }}
        />

        {/* Screen */}
        <div
          className="absolute top-[5px] left-[5px] right-[5px] bottom-0 rounded-t-[6px] flex flex-col items-center justify-center gap-1.5 overflow-hidden"
          style={{ background: "linear-gradient(#F5F5F5, #F0F1F3)" }}
        >
          <span className="text-[8.5px] tracking-[0.08em] uppercase text-[#5B6472]">
            Scan to check in
          </span>

          {/* Check mark */}
          <motion.span
            className="text-[18px] text-[#16A34A] font-bold"
            initial="hidden"
            animate={v}
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{
              scale: {
                duration: 0.4,
                delay: 2.0,
                ease: springBounce,
              },
              opacity: { duration: 0.3, delay: 2.0, ease: "easeOut" },
            }}
          >
            ✓
          </motion.span>

          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-0.5"
            style={{
              background:
                "linear-gradient(90deg, transparent, #2563EB, transparent)",
            }}
            initial="hidden"
            animate={v}
            variants={{
              hidden: { top: "-2px", opacity: 0 },
              visible: {
                top: ["-2px", "-2px", "100%", "100%"],
                opacity: [0, 1, 1, 0],
              },
            }}
            transition={{
              duration: 1.2,
              delay: 0.9,
              ease: [0.4, 0, 0.2, 1],
              times: [0, 0.1, 0.9, 1],
            }}
          />

          {/* Screen flash */}
          <motion.div
            className="absolute inset-0 rounded-[inherit] bg-[#EAF7EF] pointer-events-none"
            initial="hidden"
            animate={v}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: [0, 0.7, 0] },
            }}
            transition={{
              duration: 0.5,
              delay: 1.8,
              ease: "easeOut",
              times: [0, 0.3, 1],
            }}
          />
        </div>
      </motion.div>

      {/* QR code card */}
      <motion.div
        className="absolute left-[calc(50%+96px)] top-1/2 -mt-[22px] w-[44px] h-[44px] bg-white border border-[#E7E5DF] rounded-lg grid place-items-center"
        style={{ boxShadow: "0 10px 18px -8px rgba(16,24,40,.32)" }}
        initial="hidden"
        animate={v}
        variants={{
          hidden: { x: 40, rotate: 8, opacity: 0 },
          visible: {
            x: 0,
            rotate: [null, -2, 0],
            opacity: 1,
            scale: [null, 1, 0.95],
          },
        }}
        transition={{
          x: { duration: 0.65, delay: 0.5, ease: springTight },
          rotate: {
            duration: 1.0,
            delay: 0.5,
            times: [0, 0.65, 1],
            ease: "easeOut",
          },
          scale: {
            duration: 1.0,
            delay: 0.5,
            times: [0, 0.65, 1],
            ease: "easeOut",
          },
          opacity: { duration: 0.35, delay: 0.5, ease: "easeOut" },
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 21 21"
          fill="#101828"
          aria-hidden="true"
        >
          <rect x="0" y="0" width="7" height="7" rx="0.8" />
          <rect x="1" y="1" width="5" height="5" rx="0.4" fill="#fff" />
          <rect x="2" y="2" width="3" height="3" rx="0.3" />
          <rect x="14" y="0" width="7" height="7" rx="0.8" />
          <rect x="15" y="1" width="5" height="5" rx="0.4" fill="#fff" />
          <rect x="16" y="2" width="3" height="3" rx="0.3" />
          <rect x="0" y="14" width="7" height="7" rx="0.8" />
          <rect x="1" y="15" width="5" height="5" rx="0.4" fill="#fff" />
          <rect x="2" y="16" width="3" height="3" rx="0.3" />
          <rect x="8" y="0" width="1" height="1" />
          <rect x="10" y="0" width="1" height="1" />
          <rect x="12" y="0" width="1" height="1" />
          <rect x="8" y="2" width="1" height="1" />
          <rect x="10" y="2" width="1" height="1" />
          <rect x="8" y="4" width="1" height="1" />
          <rect x="11" y="4" width="1" height="1" />
          <rect x="12" y="5" width="1" height="1" />
          <rect x="8" y="6" width="1" height="1" />
          <rect x="10" y="6" width="1" height="1" />
          <rect x="0" y="8" width="1" height="1" />
          <rect x="2" y="8" width="1" height="1" />
          <rect x="4" y="8" width="1" height="1" />
          <rect x="6" y="8" width="1" height="1" />
          <rect x="8" y="8" width="1" height="1" />
          <rect x="10" y="8" width="1" height="1" />
          <rect x="14" y="8" width="1" height="1" />
          <rect x="16" y="8" width="1" height="1" />
          <rect x="18" y="8" width="1" height="1" />
          <rect x="20" y="8" width="1" height="1" />
          <rect x="1" y="10" width="1" height="1" />
          <rect x="3" y="10" width="1" height="1" />
          <rect x="5" y="10" width="1" height="1" />
          <rect x="9" y="10" width="1" height="1" />
          <rect x="11" y="10" width="1" height="1" />
          <rect x="15" y="10" width="1" height="1" />
          <rect x="17" y="10" width="1" height="1" />
          <rect x="19" y="10" width="1" height="1" />
          <rect x="0" y="12" width="1" height="1" />
          <rect x="2" y="12" width="1" height="1" />
          <rect x="6" y="12" width="1" height="1" />
          <rect x="8" y="12" width="1" height="1" />
          <rect x="10" y="12" width="1" height="1" />
          <rect x="12" y="12" width="1" height="1" />
          <rect x="14" y="12" width="1" height="1" />
          <rect x="18" y="12" width="1" height="1" />
          <rect x="20" y="12" width="1" height="1" />
          <rect x="8" y="14" width="1" height="1" />
          <rect x="10" y="14" width="1" height="1" />
          <rect x="12" y="14" width="1" height="1" />
          <rect x="14" y="14" width="1" height="1" />
          <rect x="16" y="14" width="1" height="1" />
          <rect x="20" y="14" width="1" height="1" />
          <rect x="9" y="16" width="1" height="1" />
          <rect x="11" y="16" width="1" height="1" />
          <rect x="15" y="16" width="1" height="1" />
          <rect x="17" y="16" width="1" height="1" />
          <rect x="19" y="16" width="1" height="1" />
          <rect x="8" y="18" width="1" height="1" />
          <rect x="10" y="18" width="1" height="1" />
          <rect x="14" y="18" width="1" height="1" />
          <rect x="18" y="18" width="1" height="1" />
          <rect x="20" y="18" width="1" height="1" />
          <rect x="9" y="20" width="1" height="1" />
          <rect x="11" y="20" width="1" height="1" />
          <rect x="15" y="20" width="1" height="1" />
          <rect x="17" y="20" width="1" height="1" />
          <rect x="19" y="20" width="1" height="1" />
        </svg>
      </motion.div>
    </div>
  );
}
