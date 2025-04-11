import pdfParse from "pdf-parse/lib/pdf-parse.js";

export interface PDFData {
  numpages: number;
  numrender: number;
  info: Record<string, unknown>;
  metadata: Record<string, unknown>;
  version: string;
  text: string;
}

export async function parsePDF(buffer: Buffer): Promise<PDFData> {
  const data = await pdfParse(buffer);

  console.log("PDF Metadata:", {
    numpages: data.numpages,
    numrender: data.numrender,
    info: data.info,
    metadata: data.metadata,
    version: data.version,
    text: data.text.substring(0, 200) + "...",
  });

  return data;
}
