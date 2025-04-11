import { NextRequest, NextResponse } from "next/server";
import { generatePDFSummary } from "@/lib/pdf-service";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const summary = await generatePDFSummary(file);

    return NextResponse.json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error("Error processing PDF:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to process PDF",
      },
      { status: 500 },
    );
  }
}
