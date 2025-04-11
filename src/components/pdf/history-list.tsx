"use client";

import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHistoryStore } from "@/store/history-store";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function HistoryList() {
  const { history, clearHistory } = useHistoryStore();

  if (history.length === 0) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Summaries</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={clearHistory}
          className="h-8 w-8"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {history.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 space-y-2"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium">{item.fileName}</h3>
              <span className="text-sm text-muted-foreground">
                {format(new Date(item.timestamp), "MMM d, yyyy HH:mm")}
              </span>
            </div>
            <div className="prose prose-sm dark:prose-invert">
              {item.summary.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-2 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
} 