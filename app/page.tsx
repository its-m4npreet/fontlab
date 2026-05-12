"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Github,
  Moon,
  Search,
  Sparkles,
  Star,
  Sun,
  Type,
  Workflow,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { FontCard } from "@/components/FontCard";
import { FontPairingSection } from "@/components/FontPairingSection";
import { FontPlaygroundModal } from "@/components/FontPlaygroundModal";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fonts } from "@/data/fonts";
import { useFontLoader } from "@/lib/useFontLoader";
import { useTheme } from "@/components/ThemeProvider";

const DEFAULT_TEXT = "The quick brown fox jumps over the lazy dog";
const CARDS_PER_PAGE = 20;

const MARQUEE_FONTS = fonts.slice(0, 20);

export default function Home() {
  const { selectedFont, appliedFont, fontFading, loadAndApplyFont, loadAndApplyFontByName } = useFontLoader();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [modalFont, setModalFont] = useState<(typeof fonts)[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { toggleTheme } = useTheme();

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timeout);
  }, []);

  const filteredFonts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return fonts;
    }

    return fonts.filter((font) => {
      return (
        font.name.toLowerCase().includes(query) ||
        font.family.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredFonts.length / CARDS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedFonts = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * CARDS_PER_PAGE;
    return filteredFonts.slice(startIndex, startIndex + CARDS_PER_PAGE);
  }, [filteredFonts, safeCurrentPage]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.08),transparent_38%),linear-gradient(to_bottom,transparent,rgba(15,23,42,0.04))]">
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mx-auto w-full max-w-7xl space-y-6 px-4 pb-6 md:px-8 md:pb-8"
      >
      <section className="relative left-1/2 w-dvw -translate-x-1/2 overflow-hidden bg-card/80 shadow-sm">
        <header className="absolute top-0 z-40 w-full border-b bg-background/70 backdrop-blur-xl">
          <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
            <div className="flex items-center gap-4">
              <a href="#" className="flex items-center gap-2 text-sm font-semibold">
                <div className="rounded-md bg-primary/10 p-1.5 text-primary">
                  <Type className="size-4" />
                </div>
                FontLab
              </a>
              <nav className="hidden items-center gap-4 text-sm text-muted-foreground md:flex">
                <button onClick={() => document.getElementById("library")?.scrollIntoView({ behavior: "smooth" })} className="cursor-pointer transition-colors hover:text-foreground">Fonts</button>
                <Link href="/pairings" className="transition-colors hover:text-foreground">Pairings</Link>
              </nav>
            </div>

            <div className="hidden max-w-sm flex-1 items-center md:flex">
              <div className="relative w-full">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  placeholder="Search fonts..."
                  className="h-9 rounded-full border-zinc-300 bg-muted/70 pl-9 dark:border-input"
                />
              </div>
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
                <span className="hidden sm:inline dark:hidden">Dark</span>
                <span className="hidden sm:dark:inline">Light</span>
              </Button>
              <span className="hidden h-9 items-center rounded-lg border bg-muted/50 px-3 text-xs text-muted-foreground md:inline-flex">
                Open Source
              </span>
              <a
                href="https://github.com/its-m4npreet/fontlab"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition hover:bg-muted"
              >
                <Github className="size-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </div>
          </div>
        </header>

        {/* soft vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,transparent_0%,transparent_45%,rgba(0,0,0,0.12)_100%)]"
        />

        {/* subtle grid background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.5)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.5)_1px,transparent_1px)] bg-size-[32px_32px] opacity-40"
        />

        {/* noise texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E\")",
          }}
        />

        {/* blue glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 left-1/2 h-72 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
        />

        {/* side ambient glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/3 -left-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/4 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        />

        <div
          className="relative px-4 pb-12 pt-20 text-center sm:px-6 sm:pb-14 sm:pt-24 md:px-16 md:pb-20 md:pt-28"
          style={{ opacity: fontFading ? 0.4 : 1, transition: "opacity 0.25s ease" }}
        >
          {/* badge */}
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-5 inline-flex items-center gap-1.5 rounded-full border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground"
            style={{ fontFamily: appliedFont.family }}
          >
            <Zap className="size-3 text-primary" />
            Open Source · Free Forever · MIT License
          </motion.span>

          {/* headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mx-auto max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-6xl"
            style={{ fontFamily: appliedFont.family }}
          >
            The{" "}
            <span className="bg-linear-to-r from-foreground via-zinc-500 to-muted-foreground bg-clip-text text-transparent">
              Typography
            </span>
            {" "}Playground
            <br className="hidden md:block" />
            {" "}for Developers
          </motion.h1>

          {/* sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mx-auto mt-5 max-w-xl text-base text-muted-foreground md:text-lg"
            style={{ fontFamily: appliedFont.family }}
          >
            Browse Google Fonts, tweak size, weight, spacing and colour live,
            then copy production-ready&nbsp;
            <span className="font-medium text-foreground">HTML</span>,&nbsp;
            <span className="font-medium text-foreground">CSS</span>&nbsp;and&nbsp;
            <span className="font-medium text-foreground">Tailwind</span>&nbsp;code instantly.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            style={{ fontFamily: appliedFont.family }}
          >
            <a
              href="#library"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow transition hover:opacity-90"
            >
              Start Exploring <ArrowRight className="size-4" />
            </a>
            <a
              href="https://github.com/its-m4npreet/fontlab"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
            >
              <Github className="size-4" /> View on GitHub
            </a>
          </motion.div>

          {/* feature pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.38 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground"
            style={{ fontFamily: appliedFont.family }}
          >
            {[
              { icon: <Star className="size-3.5" />, label: "150+ Fonts" },
              { icon: <Zap className="size-3.5" />, label: "Real-time Preview" },
              { icon: <BookOpen className="size-3.5" />, label: "HTML · CSS · Tailwind" },
              { icon: <Workflow className="size-3.5" />, label: "Font Pairing Tool" },
              { icon: <Sparkles className="size-3.5" />, label: "Code Generator" },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border bg-background/80 px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-sm"
              >
                {icon} {label}
              </span>
            ))}
          </motion.div>

          {/* auto-scrolling font strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.45 }}
            className="mt-12"
          >
            <div className="hero-font-marquee">
              <div className="hero-font-marquee-track">
                {[...MARQUEE_FONTS, ...MARQUEE_FONTS].map((font, index) => (
                  <button
                    key={`${font.name}-${index}`}
                    onClick={() => loadAndApplyFont(font)}
                    className="cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold text-muted-foreground/80 transition-colors hover:text-foreground"
                    style={{
                      fontFamily: font.family,
                      fontSize: `${1 + (index % 4) * 0.12}rem`,
                    }}
                  >
                    {font.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Font Library – pick a font first ── */}
      <section id="library" className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Font Library</h2>
              <span className="inline-flex items-center gap-1 rounded-full border bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                <Star className="size-3" /> 150+ Fonts
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Select a font to preview and customise it below</p>
          </div>
          <div className="relative w-full sm:w-72 md:hidden">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Search fonts..."
              className="h-9 rounded-full border-zinc-300 bg-muted/70 pl-9 dark:border-input"
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: CARDS_PER_PAGE }, (_, index) => (
                <SkeletonLoader key={index} className="h-44 w-full" />
              ))
            : paginatedFonts.map((font) => (
                <FontCard
                  key={font.name}
                  font={font}
                  previewText={DEFAULT_TEXT}
                  selected={selectedFont.name === font.name}
                  onPreview={() => {
                    setModalFont(font);
                    setModalOpen(true);
                  }}
                  onApply={() => {
                    loadAndApplyFont(font);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              ))}
        </div>
        {!isLoading && filteredFonts.length > 0 ? (
          <div className="flex items-center justify-center gap-3 py-3">
            <Button
              variant="outline"
              size="sm"
              className="px-4"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={safeCurrentPage === 1}
            >
              <ArrowLeft className="size-3.5" /> Previous
            </Button>
            <span className="min-w-20 text-center text-xs text-muted-foreground">
              {safeCurrentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="px-4"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={safeCurrentPage === totalPages}
            >
              Next <ArrowRight className="size-3.5" />
            </Button>
          </div>
        ) : null}
        {!isLoading && filteredFonts.length === 0 ? (
          <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
            No fonts matched your search. Try another keyword.
          </div>
        ) : null}
      </section>

      <FontPairingSection
        onApplyFont={(name) => {
          loadAndApplyFontByName(name);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
      </motion.main>

      <footer className="border-t bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:gap-3 md:px-8">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-primary/10 p-1 text-primary">
              <Type className="size-3.5" />
            </div>
            <span className="font-medium text-foreground">FontLab</span>
            <span>· Open Source · MIT License</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/pairings" className="transition-colors hover:text-foreground">Pairings</Link>
            <a href="https://github.com/its-m4npreet/fontlab" target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">GitHub</a>
          </div>
          <span>© {new Date().getFullYear()} FontLab. All rights reserved.</span>
        </div>
      </footer>

      <FontPlaygroundModal
        open={modalOpen}
        font={modalFont}
        isSelected={modalFont?.name === selectedFont.name}
        onClose={() => setModalOpen(false)}
        onApply={() => {
          if (modalFont) loadAndApplyFont(modalFont);
        }}
      />
    </div>
  );
}
