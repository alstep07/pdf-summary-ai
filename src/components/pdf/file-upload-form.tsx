"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { usePDFStore } from "@/store/pdf-store";
import { useHistoryStore } from "@/store/history-store";

export function FileUploadForm() {
  const { file, isLoading, setFile, setLoading, setPDFData } = usePDFStore();
  const { addToHistory } = useHistoryStore();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    },
    [setFile],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/generate-summary", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate summary");
      }

      const data = await response.json();
      setPDFData({
        summary: data.summary,
      });

      // Save to history
      addToHistory(file.name, data.summary);
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to generate summary",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full">
      <CardContent>
        <div
          {...getRootProps()}
          className={`w-full border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${
              isDragActive
                ? "border-primary bg-primary/10"
                : "border-gray-300 hover:border-primary"
            }`}
        >
          <input {...getInputProps()} />
          {file ? (
            <div>
              <p>Selected file: {file.name}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setFile(null)}
              >
                Upload Another File
              </Button>
            </div>
          ) : (
            <div>
              <p>Drag and drop a PDF file here, or click to select</p>
              <p className="text-sm text-gray-500 mt-2">
                Only PDF files are accepted
              </p>
            </div>
          )}
        </div>
        {file && (
          <div className="w-full flex justify-center">
            <Button
              className="mt-4"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Generate Summary"}
            </Button>
          </div>
        )}
        <p className="mt-6 text-xs mx-auto text-center text-muted-foreground max-w-sm">
          Upload your PDF documents for AI-powered summarization
        </p>
      </CardContent>
    </div>
  );
}
