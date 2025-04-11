"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export function FileUploadForm() {
  const [file, setFile] = useState<File | null>(null);

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

  return (
    <CardContent>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
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
        <Button className="w-full mt-4">
          Generate Summary
        </Button>
      )}
    </CardContent>
  );
} 