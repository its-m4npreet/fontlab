"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type PairFont = {
  name: string;
  family: string;
  googleFamily: string;
  role: "heading" | "body";
};

type Pair = {
  id: string;
  label: string;
  description: string;
  heading: PairFont;
  body: PairFont;
  sampleHeading: string;
  sampleBody: string;
};

const PAIRS: Pair[] = [
  {
    id: "editorial",
    label: "Editorial",
    description: "Classic editorial combo — elegant serif headline with clean sans-serif body.",
    sampleHeading: "Timeless Typography",
    sampleBody:
      "Great typography creates hierarchy, rhythm, and mood. This pairing balances a refined serif headline with a legible, modern body typeface.",
    heading: {
      name: "Playfair Display",
      family: "'Playfair Display', serif",
      googleFamily: "Playfair+Display",
      role: "heading",
    },
    body: {
      name: "Source Sans 3",
      family: "'Source Sans 3', sans-serif",
      googleFamily: "Source+Sans+3",
      role: "body",
    },
  },
  {
    id: "modern-tech",
    label: "Modern Tech",
    description: "Sharp geometric sans-serif for headings, mono for code-heavy body content.",
    sampleHeading: "Build for the Web",
    sampleBody:
      "Ship faster with a type system designed for developers. Clear hierarchy. Zero ambiguity. Every character counts.",
    heading: {
      name: "Space Grotesk",
      family: "'Space Grotesk', sans-serif",
      googleFamily: "Space+Grotesk",
      role: "heading",
    },
    body: {
      name: "JetBrains Mono",
      family: "'JetBrains Mono', monospace",
      googleFamily: "JetBrains+Mono",
      role: "body",
    },
  },
  {
    id: "humanist",
    label: "Humanist",
    description: "Warm and approachable — great for editorial, blogs, and marketing.",
    sampleHeading: "Stories Worth Reading",
    sampleBody:
      "Typography is the voice of written content. Choose typefaces that feel like the brand personality you want readers to experience.",
    heading: {
      name: "Lora",
      family: "'Lora', serif",
      googleFamily: "Lora",
      role: "heading",
    },
    body: {
      name: "Nunito",
      family: "'Nunito', sans-serif",
      googleFamily: "Nunito",
      role: "body",
    },
  },
  {
    id: "minimal",
    label: "Minimal",
    description: "Ultra-clean Swiss-inspired duo. Ideal for dashboards and SaaS products.",
    sampleHeading: "Less is More",
    sampleBody:
      "Minimalist design relies on restraint. Let whitespace breathe. Use type weight to create contrast instead of decorative elements.",
    heading: {
      name: "Inter",
      family: "'Inter', sans-serif",
      googleFamily: "Inter",
      role: "heading",
    },
    body: {
      name: "Manrope",
      family: "'Manrope', sans-serif",
      googleFamily: "Manrope",
      role: "body",
    },
  },
  {
    id: "bold-expressive",
    label: "Bold & Expressive",
    description: "High-contrast pair for landing pages that demand attention.",
    sampleHeading: "Make an Impact",
    sampleBody:
      "Bold typography commands attention. Use a display heading to anchor the page, then let a readable body font guide the reader forward.",
    heading: {
      name: "Bebas Neue",
      family: "'Bebas Neue', sans-serif",
      googleFamily: "Bebas+Neue",
      role: "heading",
    },
    body: {
      name: "Open Sans",
      family: "'Open Sans', sans-serif",
      googleFamily: "Open+Sans",
      role: "body",
    },
  },
  {
    id: "elegant-luxury",
    label: "Elegant Luxury",
    description: "Sophisticated pairing perfect for fashion, beauty, and premium brands.",
    sampleHeading: "Crafted With Care",
    sampleBody:
      "Luxury brands understand that every detail matters. A refined serif paired with a clean sans-serif signals quality without effort.",
    heading: {
      name: "Cormorant Garamond",
      family: "'Cormorant Garamond', serif",
      googleFamily: "Cormorant+Garamond",
      role: "heading",
    },
    body: {
      name: "Raleway",
      family: "'Raleway', sans-serif",
      googleFamily: "Raleway",
      role: "body",
    },
  },
];

function useFontLoader(googleFamily1: string, googleFamily2: string) {
  useEffect(() => {
    const id = `pair-font-${googleFamily1}-${googleFamily2}`;
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${googleFamily1}:wght@400;700&family=${googleFamily2}:wght@400;500&display=swap`;
    document.head.appendChild(link);
  }, [googleFamily1, googleFamily2]);
}

function PairingCard({
  pair,
  onApplyHeading,
  onApplyBody,
}: {
  pair: Pair;
  onApplyHeading: () => void;
  onApplyBody: () => void;
}) {
  useFontLoader(pair.heading.googleFamily, pair.body.googleFamily);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-4 rounded-xl bg-zinc-100 p-5 dark:bg-muted/30"
    >
      {/* Label */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-muted-foreground">
          {pair.label}
        </p>
        <p className="mt-0.5 text-[11px] text-zinc-500 dark:text-muted-foreground">{pair.description}</p>
      </div>

      {/* Preview */}
      <div className="rounded-lg bg-white px-5 py-6 dark:bg-background/70">
        <p
          className="text-2xl font-bold leading-tight text-zinc-900 sm:text-3xl dark:text-foreground"
          style={{ fontFamily: pair.heading.family }}
        >
          {pair.sampleHeading}
        </p>
        <p
          className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-muted-foreground"
          style={{ fontFamily: pair.body.family }}
        >
          {pair.sampleBody}
        </p>
      </div>

      {/* Font tags */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-1 items-center justify-between gap-2 rounded-md bg-zinc-200/80 px-3 py-2 dark:bg-muted/50">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wide text-zinc-500 dark:text-muted-foreground">Heading</p>
            <p className="truncate text-sm font-semibold text-zinc-800 dark:text-foreground" style={{ fontFamily: pair.heading.family }}>
              {pair.heading.name}
            </p>
          </div>
          <Button variant="ghost" size="sm" className="shrink-0 gap-1 text-xs" onClick={onApplyHeading}>
            Use <ArrowRight className="size-3" />
          </Button>
        </div>

        <div className="flex flex-1 items-center justify-between gap-2 rounded-md bg-zinc-200/80 px-3 py-2 dark:bg-muted/50">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wide text-zinc-500 dark:text-muted-foreground">Body</p>
            <p className="truncate text-sm font-medium text-zinc-800 dark:text-foreground" style={{ fontFamily: pair.body.family }}>
              {pair.body.name}
            </p>
          </div>
          <Button variant="ghost" size="sm" className="shrink-0 gap-1 text-xs" onClick={onApplyBody}>
            Use <ArrowRight className="size-3" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

type Props = {
  onApplyFont: (name: string) => void;
};

export function FontPairingSection({ onApplyFont }: Props) {
  return (
    <section id="pairings" className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Font Pairings</h2>
        <p className="text-xs text-muted-foreground">
          Handpicked heading + body combos. Click &ldquo;Use&rdquo; to apply a font to the playground.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {PAIRS.map((pair) => (
          <PairingCard
            key={pair.id}
            pair={pair}
            onApplyHeading={() => onApplyFont(pair.heading.name)}
            onApplyBody={() => onApplyFont(pair.body.name)}
          />
        ))}
      </div>
    </section>
  );
}
