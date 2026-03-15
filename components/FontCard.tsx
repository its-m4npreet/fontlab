"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type FontData = {
  name: string;
  family: string;
};

type FontCardProps = {
  font: FontData;
  previewText: string;
  selected: boolean;
  onPreview: () => void;
  onApply: () => void;
};

export function FontCard({ font, previewText, selected, onPreview, onApply }: FontCardProps) {
  return (
    <Card className={cn("h-full border bg-card transition-shadow hover:shadow-md", selected && "border-primary")}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{font.name}</CardTitle>
        <p className="text-xs text-muted-foreground">{font.family.replaceAll("'", "")}</p>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <p
          className="line-clamp-2 text-sm text-muted-foreground"
          style={{ fontFamily: font.family }}
        >
          {previewText}
        </p>
        <div className="flex gap-2">
          <Button
            onClick={(e) => { e.stopPropagation(); onPreview(); }}
            className="flex-1"
            variant="outline"
            size="sm"
          >
            Preview
          </Button>
          <Button
            onClick={(e) => { e.stopPropagation(); onApply(); }}
            className="flex-1"
            variant={selected ? "secondary" : "default"}
            size="sm"
          >
            {selected ? "Applied" : "Apply"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
