"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  Moon,
  RefreshCw,
  Shuffle,
  Sun,
  Type,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fonts } from "@/data/fonts";
import { useFontLoader } from "@/lib/useFontLoader";
import { useTheme } from "@/components/ThemeProvider";

type FontData = (typeof fonts)[0];

const SAMPLE_HEADINGS = [
  "Timeless Typography",
  "Build for the Web",
  "Stories Worth Reading",
  "Less is More",
  "Make an Impact",
  "Crafted With Care",
  "Design with Purpose",
  "Thoughtful Design",
  "Modern Classics",
  "Bold & Beautiful",
];

const SAMPLE_SUBTITLES = [
  "Where every character tells a story of precision and care.",
  "Designed for developers who refuse to compromise on quality.",
  "The art of balancing form and function in digital spaces.",
  "Minimalism meets personality in every carefully chosen glyph.",
  "Making bold statements with thoughtful typographic choices.",
  "Crafted details that elevate the ordinary to extraordinary.",
];

const SAMPLE_BUTTON_LABELS = ["Get Started", "Learn More", "Sign Up", "Explore"];

function pick<T extends { name: string }>(arr: T[], used: Set<string>): T {
  const available = arr.filter((item) => !used.has(item.name));
  if (available.length === 0) {
    const r = Math.floor(Math.random() * arr.length);
    return arr[r];
  }
  return available[Math.floor(Math.random() * available.length)];
}

function getCategory(font: FontData): string {
  const cat = font.family.split(",").pop()?.trim().replace(/'/g, "") || "sans-serif";
  return cat;
}

function generateBestPairing() {
  const sansSerif = fonts.filter((f) => getCategory(f) === "sans-serif");
  const serif = fonts.filter((f) => getCategory(f) === "serif");
  const mono = fonts.filter((f) => getCategory(f) === "monospace");
  const display = fonts.filter((f) => getCategory(f) === "cursive");

  const used = new Set<string>();

  const headingPool = [...serif, ...display, ...sansSerif];
  const heading = pick(headingPool, used);
  used.add(heading.name);

  const subtitlePool = [...sansSerif, ...serif].filter((f) => f.name !== heading.name);
  const subtitle = pick(subtitlePool, used);
  used.add(subtitle.name);

  const buttonPool = [...sansSerif, ...mono].filter((f) => !used.has(f.name));
  const buttons = pick(buttonPool, used);

  return { heading, subtitle, buttons };
}

function generateAlternativePairs(
  count: number,
  exclude: Set<string>
) {
  const pairs: Array<{
    id: string;
    heading: FontData;
    body: FontData;
    sampleHeading: string;
    sampleBody: string;
  }> = [];

  const sansSerif = fonts.filter((f) => getCategory(f) === "sans-serif");
  const serif = fonts.filter((f) => getCategory(f) === "serif");
  const mono = fonts.filter((f) => getCategory(f) === "monospace");
  const display = fonts.filter((f) => getCategory(f) === "cursive");

  for (let i = 0; i < count; i++) {
    const used = new Set<string>(exclude);

    const headingPool = [...serif, ...display, ...sansSerif];
    const heading = pick(headingPool, used);
    used.add(heading.name);

    const bodyPool = [...sansSerif, ...mono];
    let body = pick(bodyPool, used);
    if (body.name === heading.name) {
      const altPool = bodyPool.filter((f) => f.name !== heading.name);
      body = altPool.length > 0
        ? altPool[Math.floor(Math.random() * altPool.length)]
        : body;
    }
    used.add(body.name);

    pairs.push({
      id: `alt-${i}-${heading.name}-${body.name}`,
      heading,
      body,
      sampleHeading: SAMPLE_HEADINGS[i % SAMPLE_HEADINGS.length],
      sampleBody: SAMPLE_SUBTITLES[i % SAMPLE_SUBTITLES.length],
    });
  }

  return pairs;
}

function getRandomDiceIndex() {
  return Math.floor(Math.random() * 6);
}

export default function PairingsPage() {
  const { appliedFont, loadAndApplyFont } = useFontLoader();
  const { toggleTheme } = useTheme();
  const [seed, setSeed] = useState(0);
  const [headingFont, setHeadingFont] = useState<FontData | null>(null);
  const [subtitleFont, setSubtitleFont] = useState<FontData | null>(null);
  const [buttonsFont, setButtonsFont] = useState<FontData | null>(null);
  const [sampleHeading] = useState(
    () => SAMPLE_HEADINGS[Math.floor(Math.random() * SAMPLE_HEADINGS.length)]
  );
  const [sampleSubtitle] = useState(
    () => SAMPLE_SUBTITLES[Math.floor(Math.random() * SAMPLE_SUBTITLES.length)]
  );
  const [diceIndices, setDiceIndices] = useState({ heading: 0, subtitle: 0, buttons: 0 });
  const [altSeed, setAltSeed] = useState(0);

  const bestPairing = useMemo(() => {
    const p = generateBestPairing();
    return p;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed]);

  useEffect(() => {
    setHeadingFont(bestPairing.heading);
    setSubtitleFont(bestPairing.subtitle);
    setButtonsFont(bestPairing.buttons);
    setDiceIndices({
      heading: getRandomDiceIndex(),
      subtitle: getRandomDiceIndex(),
      buttons: getRandomDiceIndex(),
    });
  }, [bestPairing]);

  const excludedFonts = useMemo(() => {
    if (!headingFont || !subtitleFont || !buttonsFont) return new Set<string>();
    return new Set([headingFont.name, subtitleFont.name, buttonsFont.name]);
  }, [headingFont, subtitleFont, buttonsFont]);

  const alternativePairs = useMemo(
    () => generateAlternativePairs(6, excludedFonts),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [seed, altSeed]
  );

  const shuffleHeading = useCallback(() => {
    const sansSerif = fonts.filter((f) => getCategory(f) === "sans-serif");
    const serif = fonts.filter((f) => getCategory(f) === "serif");
    const display = fonts.filter((f) => getCategory(f) === "cursive");
    const pool = [...serif, ...display, ...sansSerif].filter(
      (f) => f.name !== subtitleFont?.name && f.name !== buttonsFont?.name
    );
    const picked = pool[Math.floor(Math.random() * pool.length)];
    setHeadingFont(picked);
    setDiceIndices((prev) => ({ ...prev, heading: getRandomDiceIndex() }));
  }, [subtitleFont, buttonsFont]);

  const shuffleSubtitle = useCallback(() => {
    const sansSerif = fonts.filter((f) => getCategory(f) === "sans-serif");
    const serif = fonts.filter((f) => getCategory(f) === "serif");
    const pool = [...sansSerif, ...serif].filter(
      (f) => f.name !== headingFont?.name && f.name !== buttonsFont?.name
    );
    const picked = pool[Math.floor(Math.random() * pool.length)];
    setSubtitleFont(picked);
    setDiceIndices((prev) => ({ ...prev, subtitle: getRandomDiceIndex() }));
  }, [headingFont, buttonsFont]);

  const shuffleButtons = useCallback(() => {
    const sansSerif = fonts.filter((f) => getCategory(f) === "sans-serif");
    const mono = fonts.filter((f) => getCategory(f) === "monospace");
    const pool = [...sansSerif, ...mono].filter(
      (f) => f.name !== headingFont?.name && f.name !== subtitleFont?.name
    );
    const picked = pool[Math.floor(Math.random() * pool.length)];
    setButtonsFont(picked);
    setDiceIndices((prev) => ({ ...prev, buttons: getRandomDiceIndex() }));
  }, [headingFont, subtitleFont]);

  const refreshAll = useCallback(() => {
    setSeed((s) => s + 1);
    setAltSeed((s) => s + 1);
  }, []);


  if (!headingFont || !subtitleFont || !buttonsFont) return null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.08),transparent_38%),linear-gradient(to_bottom,transparent,rgba(15,23,42,0.04))]">
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mx-auto w-full max-w-7xl space-y-6 px-4 pb-6 md:px-8 md:pb-8"
      >
        {/* Header */}
        <header className="sticky top-0 z-40 -mx-4 -mt-6 border-b bg-background/70 px-4 pt-6 backdrop-blur-xl md:-mx-8 md:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-sm font-semibold"
              >
                <div className="rounded-md bg-primary/10 p-1.5 text-primary">
                  <ArrowLeft className="size-4" />
                </div>
                Back
              </Link>
              <nav className="hidden items-center gap-4 text-sm text-muted-foreground md:flex">
                <Link
                  href="/"
                  className="transition-colors hover:text-foreground"
                >
                  Home
                </Link>
                <span className="text-muted-foreground/40">/</span>
                <span className="text-foreground">Pairings</span>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={toggleTheme}
                variant="outline"
                size="sm"
                className="h-9 gap-1.5 px-3"
                aria-label="Toggle theme"
              >
                <Sun className="hidden size-4 dark:block" />
                <Moon className="size-4 dark:hidden" />
              </Button>
              <Button
                onClick={refreshAll}
                variant="outline"
                size="sm"
                className="gap-1.5"
              >
                <RefreshCw className="size-3.5" />
                Refresh All
              </Button>
            </div>
          </div>
        </header>

        {/* Hero */}
        {/* <section className="pt-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="text-center"
          >
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border bg-muted/60 px-3 py-1 text-xs font-medium">
              <Shuffle className="size-3 text-primary" />
              Best Pairing
            </span>
            <h1 className="mx-auto max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Font{" "}
              <span className="bg-linear-to-r from-foreground via-zinc-500 to-muted-foreground bg-clip-text text-transparent">
                Pairings
              </span>
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              Curated font trios for headings, subtitles, and buttons. Shuffle
              individual slots or refresh everything.
            </p>
          </motion.div>
        </section> */}

        {/* Main pairing display */}
        <section className="grid gap-6 lg:grid-cols-5 pt-8 ">
          {/* Left: Font controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="space-y-4 lg:col-span-2"
          >
            <div className="rounded-xl border bg-card p-5">
              <h2 className="mb-4 text-sm font-semibold text-muted-foreground">
                Font Slots
              </h2>
              <div className="space-y-3">
                {/* Heading Slot */}
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      Heading
                    </span>
                    <button
                      onClick={shuffleHeading}
                      className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      aria-label="Shuffle heading font"
                    >
                      <RefreshCw className="size-3.5" />
                    </button>
                  </div>
                  <p
                    className="truncate text-sm font-semibold"
                    style={{ fontFamily: headingFont.family }}
                  >
                    {headingFont.name}
                  </p>
                </div>

                {/* Subtitle Slot */}
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      Subtitle
                    </span>
                    <button
                      onClick={shuffleSubtitle}
                      className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      aria-label="Shuffle subtitle font"
                    >
                      <RefreshCw className="size-3.5" />
                    </button>
                  </div>
                  <p
                    className="truncate text-sm font-semibold"
                    style={{ fontFamily: subtitleFont.family }}
                  >
                    {subtitleFont.name}
                  </p>
                </div>

                {/* Buttons Slot */}
                <div className="rounded-lg bg-muted/50 p-3">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      Buttons
                    </span>
                    <button
                      onClick={shuffleButtons}
                      className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      aria-label="Shuffle button font"
                    >
                      <RefreshCw className="size-3.5" />
                    </button>
                  </div>
                  <p
                    className="truncate text-sm font-semibold"
                    style={{ fontFamily: buttonsFont.family }}
                  >
                    {buttonsFont.name}
                  </p>
                </div>
              </div>

              <Button
                onClick={refreshAll}
                className="mt-4 w-full gap-2"
                size="sm"
              >
                <RefreshCw className="size-3.5" />
                Generate New Best Pairing
              </Button>
            </div>
          </motion.div>

          {/* Right: Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="flex h-full flex-col rounded-xl border bg-card p-8 md:p-10">
              <span className="mb-6 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                Preview
              </span>

              <div className="flex flex-1 flex-col justify-center">
                {/* Heading */}
                <h2
                  className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
                  style={{ fontFamily: headingFont.family }}
                >
                  {sampleHeading}
                </h2>

                {/* Subtitle */}
                <p
                  className="mt-4 max-w-lg text-base leading-relaxed sm:text-lg"
                  style={{ fontFamily: subtitleFont.family }}
                >
                  {sampleSubtitle}
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    className="rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                    style={{ fontFamily: buttonsFont.family }}
                  >
                    {SAMPLE_BUTTON_LABELS[0]}
                  </button>
                  <button
                    className="rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                    style={{ fontFamily: buttonsFont.family }}
                  >
                    {SAMPLE_BUTTON_LABELS[1]}
                  </button>
                  <button
                    className="rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                    style={{ fontFamily: buttonsFont.family }}
                  >
                    {SAMPLE_BUTTON_LABELS[2]}
                  </button>
                </div>
              </div>

              {/* Applied font indicator */}
              <div className="mt-8 flex items-center gap-2 border-t pt-4 text-xs text-muted-foreground">
                <Type className="size-3" />
                Applied:{" "}
                <span
                  style={{ fontFamily: appliedFont.family }}
                  className="font-semibold text-foreground"
                >
                  {appliedFont.name}
                </span>
                <span className="text-muted-foreground/50">·</span>
                <button
                  onClick={() => loadAndApplyFont(headingFont)}
                  className="text-xs underline-offset-2 hover:underline"
                >
                  Apply heading
                </button>
                <span className="text-muted-foreground/30">|</span>
                <button
                  onClick={() => loadAndApplyFont(subtitleFont)}
                  className="text-xs underline-offset-2 hover:underline"
                >
                  Apply subtitle
                </button>
                <span className="text-muted-foreground/30">|</span>
                <button
                  onClick={() => loadAndApplyFont(buttonsFont)}
                  className="text-xs underline-offset-2 hover:underline"
                >
                  Apply buttons
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Alternative pairings */}
        <section className="space-y-4 pb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold">More Pairings</h2>
              <p className="text-xs text-muted-foreground">
                Other font combinations you might like
              </p>
            </div>
            <Button
              onClick={() => setAltSeed((s) => s + 1)}
              variant="ghost"
              size="sm"
              className="gap-1.5 text-xs"
            >
              <RefreshCw className="size-3" />
              Refresh
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {alternativePairs.map((pair) => (
              <div
                key={pair.id}
                className="flex flex-col gap-3 rounded-xl bg-zinc-100 p-4 dark:bg-muted/30"
              >
                <div className="rounded-lg bg-white px-4 py-5 dark:bg-background/70">
                  <p
                    className="text-xl font-bold leading-tight sm:text-2xl"
                    style={{ fontFamily: pair.heading.family }}
                  >
                    {pair.sampleHeading}
                  </p>
                  <p
                    className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-muted-foreground"
                    style={{ fontFamily: pair.body.family }}
                  >
                    {pair.sampleBody}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-md bg-zinc-200/80 px-2.5 py-1.5 dark:bg-muted/50">
                    <p className="text-[10px] uppercase tracking-wide text-zinc-500 dark:text-muted-foreground">
                      Heading
                    </p>
                    <p
                      className="truncate text-xs font-semibold"
                      style={{ fontFamily: pair.heading.family }}
                    >
                      {pair.heading.name}
                    </p>
                  </div>
                  <div className="flex-1 rounded-md bg-zinc-200/80 px-2.5 py-1.5 dark:bg-muted/50">
                    <p className="text-[10px] uppercase tracking-wide text-zinc-500 dark:text-muted-foreground">
                      Body
                    </p>
                    <p
                      className="truncate text-xs font-medium"
                      style={{ fontFamily: pair.body.family }}
                    >
                      {pair.body.name}
                    </p>
                  </div>
                  <button
                    onClick={() => loadAndApplyFont(pair.heading)}
                    className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="Apply heading font"
                  >
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </motion.main>
    </div>
  );
}
