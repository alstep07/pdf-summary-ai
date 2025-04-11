"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePDFStore } from "@/store/pdf-store";

export function PdfSummary() {
  const { summary } = usePDFStore();

  if (!summary) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm dark:prose-invert">
          {summary.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 