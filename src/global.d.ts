// Type declarations for pdf-parse module
// Using specific import path due to Next.js Edge Runtime compatibility issues
// See: https://gitlab.com/autokent/pdf-parse/-/issues/24
declare module "pdf-parse/lib/pdf-parse.js" {
  interface PDFParseResult {
    numpages: number;
    numrender: number;
    info: Record<string, unknown>;
    metadata: Record<string, unknown>;
    text: string;
    version: string;
  }

  function pdfParse(dataBuffer: Buffer): Promise<PDFParseResult>;
  export default pdfParse;
}
