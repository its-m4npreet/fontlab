"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type FontPreviewProps = {
  previewText: string;
  onTextChange: (value: string) => void;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  letterSpacing: number;
  lineHeight: number;
  textColor: string;
  backgroundColor: string;
};

export function FontPreview({
  previewText,
  onTextChange,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  textColor,
  backgroundColor,
}: FontPreviewProps) {
  return (
    <Card className="overflow-hidden border">
      <CardHeader>
        <CardTitle className="text-sm">Live Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={previewText}
          onChange={(event) => onTextChange(event.target.value)}
          className="min-h-20"
        />
        <motion.div
          key={`${fontFamily}-${fontSize}-${fontWeight}-${letterSpacing}-${lineHeight}-${textColor}-${backgroundColor}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl border p-6 md:p-10"
          style={{
            fontFamily,
            fontSize: `${fontSize}px`,
            fontWeight,
            letterSpacing: `${letterSpacing}px`,
            lineHeight,
            color: textColor,
            backgroundColor,
          }}
        >
          {previewText}
        </motion.div>
      </CardContent>
    </Card>
  );
}
