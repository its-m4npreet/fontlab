"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SkeletonLoaderProps = {
  className?: string;
};

export function SkeletonLoader({ className }: SkeletonLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.45, 0.8, 0.45] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      className={cn(
        "rounded-lg border border-border/80 bg-linear-to-r from-muted via-zinc-300/80 to-muted shadow-sm dark:via-zinc-700/70",
        className,
      )}
    />
  );
}
