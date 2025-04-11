export function FileUploadHeader() {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold tracking-tight">PDF Summary Generator</h1>
      <p className="text-muted-foreground">
        Upload a PDF file to generate a summary
        <span className="block text-sm text-muted-foreground mt-1">
          Accepted file types: PDF (.pdf)
        </span>
      </p>
    </div>
  );
} 