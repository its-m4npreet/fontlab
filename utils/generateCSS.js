export function generateCSS(settings) {
  return `.heading {\n  font-family: ${settings.fontFamily};\n  font-size: ${settings.fontSize}px;\n  font-weight: ${settings.fontWeight};\n  letter-spacing: ${settings.letterSpacing}px;\n  line-height: ${settings.lineHeight};\n  color: ${settings.textColor};\n  background-color: ${settings.backgroundColor};\n}`;
}
