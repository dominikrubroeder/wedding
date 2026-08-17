"use client";

import type { ReactNode } from "react";

import { motion, MotionConfig } from "motion/react";

import { cn } from "@/lib/utils";

import type { AnimationGeneratorType, ViewportOptions } from "motion";
import { useAnimate } from "@/components/ui/animate";

export function Animate({
  direction = "up",
  delay = 0.32,
  duration = 1.4,
  type,
  viewport = { once: false, margin: "-100px" },
  className,
  children,
  ref,
}: {
  direction?: "up" | "left" | "right" | "down" | "scaleUp";
  delay?: number;
  duration?: number;
  type?: AnimationGeneratorType;
  viewport?: ViewportOptions;
  className?: string;
  children: ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}) {
  const { variants } = useAnimate({ delay, duration, type });

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        ref={ref}
        variants={variants[direction]}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className={cn(className)}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
