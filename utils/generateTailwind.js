const nearestTextClass = (fontSize) => {
  if (fontSize <= 12) return "text-xs";
  if (fontSize <= 14) return "text-sm";
  if (fontSize <= 16) return "text-base";
  if (fontSize <= 18) return "text-lg";
  if (fontSize <= 20) return "text-xl";
  if (fontSize <= 24) return "text-2xl";
  if (fontSize <= 30) return "text-3xl";
  if (fontSize <= 36) return "text-4xl";
  if (fontSize <= 48) return "text-5xl";
  return "text-6xl";
};

const weightClass = (fontWeight) => {
  if (fontWeight <= 300) return "font-light";
  if (fontWeight <= 400) return "font-normal";
  if (fontWeight <= 500) return "font-medium";
  if (fontWeight <= 600) return "font-semibold";
  if (fontWeight <= 700) return "font-bold";
  if (fontWeight <= 800) return "font-extrabold";
  return "font-black";
};

const letterSpacingClass = (letterSpacing) => {
  if (letterSpacing <= -1) return "tracking-tighter";
  if (letterSpacing < 0) return "tracking-tight";
  if (letterSpacing === 0) return "tracking-normal";
  if (letterSpacing <= 0.5) return "tracking-wide";
  if (letterSpacing <= 1.5) return "tracking-wider";
  return "tracking-widest";
};

export function generateTailwind(settings) {
  const classes = [
    settings.tailwindFontClass,
    nearestTextClass(settings.fontSize),
    weightClass(settings.fontWeight),
    letterSpacingClass(settings.letterSpacing),
    `leading-[${settings.lineHeight}]`,
    `text-[${settings.textColor}]`,
    `bg-[${settings.backgroundColor}]`,
  ];

  return `class="${classes.filter(Boolean).join(" ")}"`;
}
