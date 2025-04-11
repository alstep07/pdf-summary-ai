export function validatePDFFile(file: File | null): void {
  if (!file) {
    throw new Error("No file provided");
  }

  if (file.type !== "application/pdf") {
    throw new Error("File must be a PDF");
  }
}
