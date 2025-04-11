import pdfParse from "pdf-parse/lib/pdf-parse.js";
import { generateSummary } from "./openai";

export interface PDFMetadata {
  numpages: number;
  numrender: number;
  info: Record<string, unknown>;
  metadata: Record<string, unknown>;
  version: string;
  text: string;
}

export const processPDF = async (
  file: File,
): Promise<{ text: string; metadata: PDFMetadata }> => {
  if (file.type !== "application/pdf") {
    throw new Error("File must be a PDF");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const data = await pdfParse(buffer);

  console.log("PDF Metadata:", {
    numpages: data.numpages,
    numrender: data.numrender,
    info: data.info,
    metadata: data.metadata,
    version: data.version,
    text: data.text.substring(0, 200) + "...",
  });

  return {
    text: data.text,
    metadata: {
      numpages: data.numpages,
      numrender: data.numrender,
      info: data.info,
      metadata: data.metadata,
      version: data.version,
      text: data.text,
    },
  };
};

export const generatePDFSummary = async (file: File) => {
  const { text } = await processPDF(file);
  const summary = await generateSummary(text);

  return summary;
};
