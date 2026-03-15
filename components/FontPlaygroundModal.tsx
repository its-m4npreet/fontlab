"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Code2, Eye, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TypographyControls } from "@/components/TypographyControls";
import { FontPreview } from "@/components/FontPreview";
import { CodeGenerator } from "@/components/CodeGenerator";
import { generateCSS } from "@/utils/generateCSS";
import { generateHTML } from "@/utils/generateHTML";
import { generateTailwind } from "@/utils/generateTailwind";

type FontData = {
  name: string;
  family: string;
  googleFamily: string;
  weights: number[];
  tailwindClass: string;
};

type Props = {
  open: boolean;
  font: FontData | null;
  isSelected: boolean;
  onClose: () => void;
  onApply: () => void;
};

const DEFAULT_SETTINGS = {
  fontSize: 32,
  fontWeight: 700,
  letterSpacing: 0.5,
  lineHeight: 1.5,
  textColor: "#111111",
  backgroundColor: "#ffffff",
};

const DEFAULT_TEXT = "The quick brown fox jumps over the lazy dog";

export function FontPlaygroundModal({ open, font, isSelected, onClose, onApply }: Props) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [previewText, setPreviewText] = useState(DEFAULT_TEXT);
  const [activeTab, setActiveTab] = useState("preview");

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!font) return null;

  const htmlCode = generateHTML({ previewText });
  const cssCode = generateCSS({ ...settings, fontFamily: font.family });
  const tailwindCode = generateTailwind({ ...settings, tailwindFontClass: font.tailwindClass });
  const importCode = `<link href="https://fonts.googleapis.com/css2?family=${font.googleFamily}:wght@${font.weights.join(";")}&display=swap" rel="stylesheet">`;

  const modal = (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-3 z-50 mx-auto flex max-w-6xl flex-col overflow-hidden rounded-3xl border border-border/90 bg-zinc-100/95 text-zinc-900 shadow-2xl ring-1 ring-black/10 supports-backdrop-filter:backdrop-blur dark:border-border/70 dark:bg-background/95 dark:text-foreground dark:ring-black/5 md:inset-6"
          >
            {/* ── Header ── */}
            <div className="sticky top-0 z-20 flex shrink-0 items-center justify-between border-b border-border/90 bg-zinc-200/90 px-4 py-3 backdrop-blur dark:border-border dark:bg-card/95 md:px-5 md:py-3.5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-muted/70 text-lg font-bold shadow-sm" style={{ fontFamily: font.family }}>
                  Aa
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold leading-none md:text-base">{font.name}</p>
                  <p className="mt-0.5 truncate text-xs text-zinc-600 dark:text-muted-foreground">{font.family}</p>
                </div>
                <span className="hidden rounded-full border border-zinc-300 bg-zinc-50 px-2.5 py-1 text-[10px] font-medium tracking-wide text-zinc-700 uppercase dark:border-border dark:bg-muted/60 dark:text-muted-foreground sm:inline-flex">
                  Playground
                </span>
              </div>

              <div className="flex items-center gap-1.5 md:gap-2">
                <Button
                  onClick={() => { onApply(); onClose(); }}
                  className="gap-1.5 md:gap-2"
                  variant={isSelected ? "secondary" : "default"}
                  size="sm"
                >
                  <CheckCircle2 className="size-3.5" />
                  <span className="hidden sm:inline">{isSelected ? "Already Applied" : "Apply Font"}</span>
                  <span className="sm:hidden">Apply</span>
                </Button>
                <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close">
                  <X className="size-4" />
                </Button>
              </div>
            </div>

            {/* ── Body ── */}
            <div className="flex min-h-0 flex-1 overflow-hidden">
              {/* Left – controls (fixed width, scrollable) */}
              <div className="hidden w-80 shrink-0 overflow-y-auto border-r border-border/90 bg-zinc-200/45 p-4 dark:border-border dark:bg-muted/30 md:block lg:w-84">
                <TypographyControls
                  settings={settings}
                  availableWeights={font.weights}
                  onChange={setSettings}
                />
              </div>

              {/* Right – preview / code (scrollable) */}
              <div className="flex min-w-0 flex-1 flex-col overflow-y-auto p-4 md:p-5">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col">
                  <TabsList className="mb-4 self-start rounded-xl border border-zinc-300 bg-zinc-200/70 p-1 dark:border-border dark:bg-muted/50">
                    <TabsTrigger value="preview" className="gap-1.5 text-zinc-700 hover:text-zinc-900 data-active:border-zinc-300 data-active:bg-white data-active:text-zinc-950 dark:text-muted-foreground dark:hover:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground">
                      <Eye className="size-3.5" /> Preview
                    </TabsTrigger>
                    <TabsTrigger value="code" className="gap-1.5 text-zinc-700 hover:text-zinc-900 data-active:border-zinc-300 data-active:bg-white data-active:text-zinc-950 dark:text-muted-foreground dark:hover:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground">
                      <Code2 className="size-3.5" /> Code
                    </TabsTrigger>
                    <TabsTrigger value="controls" className="gap-1.5 text-zinc-700 hover:text-zinc-900 data-active:border-zinc-300 data-active:bg-white data-active:text-zinc-950 dark:text-muted-foreground dark:hover:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground md:hidden">
                      Controls
                    </TabsTrigger>
                  </TabsList>

                  <div className="relative flex-1 overflow-hidden">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="h-full"
                      >
                        {activeTab === "preview" ? (
                          <FontPreview
                            previewText={previewText}
                            onTextChange={setPreviewText}
                            fontFamily={font.family}
                            fontSize={settings.fontSize}
                            fontWeight={settings.fontWeight}
                            letterSpacing={settings.letterSpacing}
                            lineHeight={settings.lineHeight}
                            textColor={settings.textColor}
                            backgroundColor={settings.backgroundColor}
                          />
                        ) : null}

                        {activeTab === "code" ? (
                          <CodeGenerator
                            htmlCode={htmlCode}
                            cssCode={cssCode}
                            tailwindCode={tailwindCode}
                            importCode={importCode}
                          />
                        ) : null}

                        {activeTab === "controls" ? (
                          <div className="md:hidden">
                            <TypographyControls
                              settings={settings}
                              availableWeights={font.weights}
                              onChange={setSettings}
                            />
                          </div>
                        ) : null}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </Tabs>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  if (typeof document === "undefined") return null;
  return createPortal(modal, document.body);
}
