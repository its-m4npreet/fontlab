"use client";

import { useEffect, useRef, useState } from "react";
import { fonts } from "@/data/fonts";

export type FontData = (typeof fonts)[0];

const STORAGE_KEY = "fontlab-applied-font";
const FONT_LOAD_TIMEOUT = 3000;

export function useFontLoader() {
  const [selectedFontName, setSelectedFontName] = useState<string>(() => {
    if (typeof window === "undefined") return "Poppins";
    return localStorage.getItem(STORAGE_KEY) || "Poppins";
  });

  const [appliedFont, setAppliedFont] = useState<FontData>(() => {
    if (typeof window === "undefined") return fonts[1];
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const match = fonts.find((f) => f.name === saved);
      if (match) return match;
    }
    return fonts[1];
  });

  const [fontFading, setFontFading] = useState(false);
  const pendingFontRef = useRef<string | null>(null);

  const selectedFont =
    fonts.find((f) => f.name === selectedFontName) || fonts[1];

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, selectedFontName);
  }, [selectedFontName]);

  // Load initial font stylesheet on mount
  useEffect(() => {
    loadFontStylesheet(selectedFont);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadFontStylesheet(font: FontData) {
    const existing = document.getElementById("fontlab-dynamic-font");
    if (existing) existing.remove();

    const link = document.createElement("link");
    link.id = "fontlab-dynamic-font";
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${font.googleFamily}:wght@${font.weights.join(";")}&display=swap`;
    document.head.appendChild(link);
  }

  function loadAndApplyFont(font: FontData) {
    if (font.name === selectedFontName) return;

    pendingFontRef.current = font.name;
    setSelectedFontName(font.name);

    const existing = document.getElementById("fontlab-dynamic-font");
    if (existing) existing.remove();

    const link = document.createElement("link");
    link.id = "fontlab-dynamic-font";
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${font.googleFamily}:wght@${font.weights.join(";")}&display=swap`;

    const apply = () => {
      if (pendingFontRef.current !== font.name) return;
      setAppliedFont(font);
      setFontFading(false);
    };

    link.onload = () => {
      if (pendingFontRef.current !== font.name) return;
      const fontName = font.family.replace(/['"]/g, "").split(",")[0].trim();
      document.fonts.load(`1em ${fontName}`).then(apply).catch(apply);
    };

    document.head.appendChild(link);
    setFontFading(true);

    const fallbackTimer = setTimeout(apply, FONT_LOAD_TIMEOUT);

    link.addEventListener("error", () => {
      clearTimeout(fallbackTimer);
      apply();
    });
  }

  function loadAndApplyFontByName(name: string) {
    const match = fonts.find((f) => f.name === name);
    if (match) loadAndApplyFont(match);
  }

  return {
    selectedFont,
    selectedFontName,
    appliedFont,
    fontFading,
    loadAndApplyFont,
    loadAndApplyFontByName,
  };
}
