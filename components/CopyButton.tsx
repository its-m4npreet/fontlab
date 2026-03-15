"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

type CopyButtonProps = {
  content: string;
};

export function CopyButton({ content }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="gap-2"
      aria-label="Copy code"
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}
