"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStepActive } from "@/lib/step-context";

const spring = [0.34, 1.3, 0.64, 1] as const;
const springBounce = [0.34, 1.56, 0.64, 1] as const;

function TypingDot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="w-1 h-1 rounded-full bg-[#9CA3AF]"
      animate={{ y: [0, -3, 0] }}
      transition={{
        duration: 0.9,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
    />
  );
}

export default function VigPhone() {
  const active = useStepActive();
  const v = active ? "visible" : "hidden";
  const [showTyping, setShowTyping] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    if (!active) {
      setShowTyping(false);
      setShowBubble(false);
      return;
    }

    const t1 = setTimeout(() => setShowTyping(true), 850);
    const t2 = setTimeout(() => {
      setShowTyping(false);
      setShowBubble(true);
    }, 1700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [active]);

  return (
    <div
      className="relative h-[196px] overflow-hidden rounded-2xl border border-[#DCE5F5] mb-[22px]"
      style={{
        background:
          "linear-gradient(135deg, #EEF3FE 0%, #E0EAFF 50%, #D6E2FF 100%)",
      }}
      aria-hidden="true"
    >
      {/* iPhone frame */}
      <motion.div
        className="absolute left-1/2 -bottom-[60px] w-[138px] h-[200px] border-[5px] border-[#1D1D1F] border-b-0 rounded-t-3xl bg-white"
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
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-9 h-2.5 rounded-full bg-[#1D1D1F]" />

        {/* Screen */}
        <div
          className="absolute top-[26px] left-2 right-2 bottom-0 rounded-t flex flex-col items-stretch justify-start px-1.5 pt-1.5 overflow-hidden"
          style={{ background: "linear-gradient(#F5F5F5, #F0F1F3)" }}
        >
          <span className="text-[8px] font-semibold text-center text-[#101828] mb-1.5">
            Messages
          </span>

          <div className="flex flex-col gap-[5px] items-start">
            {/* Timestamp */}
            <motion.span
              className="self-center text-[7.5px] tracking-[0.06em] text-[#5B6472]"
              initial="hidden"
              animate={v}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
            >
              TODAY · 3:41 PM
            </motion.span>

            {/* Typing indicator */}
            <AnimatePresence>
              {showTyping && (
                <motion.div
                  className="flex gap-[3px] items-center justify-center bg-[#E8EBF0] px-2.5 py-1.5 rounded-[10px_10px_10px_3px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0, padding: 0, margin: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <TypingDot delay={0} />
                  <TypingDot delay={0.15} />
                  <TypingDot delay={0.3} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* SMS bubble */}
            <AnimatePresence>
              {showBubble && (
                <motion.span
                  className="inline-block bg-[#2563EB] text-white px-2 py-1.5 rounded-[10px_10px_10px_3px] text-[9.5px] leading-[1.35] max-w-[108px]"
                  style={{ transformOrigin: "bottom left" }}
                  initial={{ opacity: 0, y: 8, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.55,
                    ease: springBounce,
                    opacity: { duration: 0.25, ease: "easeOut" },
                  }}
                >
                  Maya checked in to Kumon Carmel Center at 3:41 PM.
                </motion.span>
              )}
            </AnimatePresence>

            {/* Delivered */}
            <motion.span
              className="self-end text-[7.5px] text-[#5B6472]"
              initial="hidden"
              animate={v}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              transition={{ duration: 0.4, delay: 2.5, ease: "easeOut" }}
            >
              Delivered
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
