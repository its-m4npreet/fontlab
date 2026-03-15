"use client";

import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

type TypographySettings = {
  fontSize: number;
  fontWeight: number;
  letterSpacing: number;
  lineHeight: number;
  textColor: string;
  backgroundColor: string;
};

type TypographyControlsProps = {
  settings: TypographySettings;
  availableWeights: number[];
  onChange: (value: TypographySettings) => void;
};

const getFirstSliderValue = (value: number | readonly number[]) =>
  Array.isArray(value) ? value[0] : value;

function ControlRow({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      {children}
    </div>
  );
}

export function TypographyControls({ settings, availableWeights, onChange }: TypographyControlsProps) {
  return (
    <Card className="border">
      <CardHeader>
        <CardTitle className="text-sm">Typography Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <ControlRow label="Font Size" value={`${settings.fontSize}px`}>
          <Slider
            value={[settings.fontSize]}
            min={12}
            max={96}
            step={1}
            onValueChange={(value) =>
              onChange({ ...settings, fontSize: getFirstSliderValue(value) })
            }
          />
        </ControlRow>

        <ControlRow label="Font Weight" value={String(settings.fontWeight)}>
          <select
            value={settings.fontWeight}
            onChange={(event) =>
              onChange({ ...settings, fontWeight: Number(event.target.value) })
            }
            className="h-8 w-full rounded-lg border border-input bg-background px-2 text-sm"
          >
            {availableWeights.map((weight) => (
              <option key={weight} value={weight}>
                {weight}
              </option>
            ))}
          </select>
        </ControlRow>

        <ControlRow label="Letter Spacing" value={`${settings.letterSpacing}px`}>
          <Slider
            value={[settings.letterSpacing]}
            min={-2}
            max={10}
            step={0.1}
            onValueChange={(value) =>
              onChange({ ...settings, letterSpacing: getFirstSliderValue(value) })
            }
          />
        </ControlRow>

        <ControlRow label="Line Height" value={String(settings.lineHeight)}>
          <Slider
            value={[settings.lineHeight]}
            min={1}
            max={2.5}
            step={0.05}
            onValueChange={(value) =>
              onChange({ ...settings, lineHeight: getFirstSliderValue(value) })
            }
          />
        </ControlRow>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Text Color</label>
            <Input
              type="color"
              value={settings.textColor}
              onChange={(event) =>
                onChange({ ...settings, textColor: event.target.value })
              }
              className="h-10 p-1"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Background</label>
            <Input
              type="color"
              value={settings.backgroundColor}
              onChange={(event) =>
                onChange({ ...settings, backgroundColor: event.target.value })
              }
              className="h-10 p-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
