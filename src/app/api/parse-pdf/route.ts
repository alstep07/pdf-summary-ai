import { NextRequest, NextResponse } from "next/server";
// Using specific import path due to Next.js Edge Runtime compatibility issues
// See: https://gitlab.com/autokent/pdf-parse/-/issues/24
import pdfParse from "pdf-parse/lib/pdf-parse.js";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "File must be a PDF" },
        { status: 400 },
      );
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

    return NextResponse.json({
      success: true,
      metadata: {
        numpages: data.numpages,
        numrender: data.numrender,
        info: data.info,
        metadata: data.metadata,
        version: data.version,
      },
      text: data.text,
    });
  } catch (error) {
    console.error("Error parsing PDF:", error);
    return NextResponse.json({ error: "Failed to parse PDF" }, { status: 500 });
  }
}
