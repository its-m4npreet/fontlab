"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton } from "@/components/CopyButton";

type CodeGeneratorProps = {
  htmlCode: string;
  cssCode: string;
  tailwindCode: string;
  importCode: string;
};

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="max-h-90 overflow-auto rounded-lg border bg-muted/40 p-4 text-xs leading-relaxed">
      <code>{code}</code>
    </pre>
  );
}

function CodePanel({ title, code }: { title: string; code: string }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium text-muted-foreground">{title}</p>
        <CopyButton content={code} />
      </div>
      <CodeBlock code={code} />
    </div>
  );
}

export function CodeGenerator({ htmlCode, cssCode, tailwindCode, importCode }: CodeGeneratorProps) {
  const [activeCodeTab, setActiveCodeTab] = useState("html");

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <Code2 className="size-4" />
          Code Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeCodeTab} onValueChange={setActiveCodeTab} className="flex flex-col">
          <TabsList className="grid h-auto w-full grid-cols-2 gap-1 p-1 md:grid-cols-4">
            <TabsTrigger value="html" className="w-full">HTML</TabsTrigger>
            <TabsTrigger value="css" className="w-full">CSS</TabsTrigger>
            <TabsTrigger value="tailwind" className="w-full">Tailwind</TabsTrigger>
            <TabsTrigger value="import" className="w-full">Google Font</TabsTrigger>
          </TabsList>

          <div className="relative mt-3 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeCodeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {activeCodeTab === "html" ? (
                  <CodePanel title="HTML Output" code={htmlCode} />
                ) : null}
                {activeCodeTab === "css" ? (
                  <CodePanel title="CSS Output" code={cssCode} />
                ) : null}
                {activeCodeTab === "tailwind" ? (
                  <CodePanel title="Tailwind Output" code={tailwindCode} />
                ) : null}
                {activeCodeTab === "import" ? (
                  <CodePanel title="Google Font Import" code={importCode} />
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
