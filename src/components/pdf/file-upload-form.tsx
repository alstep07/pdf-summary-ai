"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";

export function FileUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  });

  const handleSubmit = async () => {
    if (!file) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/parse-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to parse PDF");
      }

      const data = await response.json();
      toast.success("PDF parsed successfully!");
      console.log("PDF Data:", data);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to parse PDF");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardContent>
      <div
        {...getRootProps()}
        className={`w-full border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'}`}
      >
        <input {...getInputProps()} />
        {file ? (
          <div>
            <p>Selected file: {file.name}</p>
            <Button variant="outline" className="mt-4" onClick={() => setFile(null)}>
              Remove
            </Button>
          </div>
        ) : (
          <div>
            <p>Drag and drop a PDF file here, or click to select</p>
            <p className="text-sm text-gray-500 mt-2">Only PDF files are accepted</p>
          </div>
        )}
      </div>
      {file && (
        <Button
          className="w-full mt-4"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Parse PDF"}
        </Button>
      )}
    </CardContent>
  );
} 