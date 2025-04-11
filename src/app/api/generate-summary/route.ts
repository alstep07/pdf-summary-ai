import { NextRequest, NextResponse } from "next/server";
// Using specific import path due to Next.js Edge Runtime compatibility issues
// See: https://gitlab.com/autokent/pdf-parse/-/issues/24
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    // Generate summary using OpenAI with improved prompt
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates concise summaries of PDF documents. Create a natural, narrative summary that captures the main ideas and key points. Avoid bullet points or structured formats. The summary should be easy to read and understand, written in clear paragraphs.",
        },
        {
          role: "user",
          content: `Please provide a concise, narrative summary of the following text in clear paragraphs:\n\n${data.text}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    console.log(JSON.stringify(completion, null, 2));

    const summary = completion.choices[0].message.content;

    return NextResponse.json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error("Error processing PDF:", error);
    return NextResponse.json(
      { error: "Failed to process PDF" },
      { status: 500 },
    );
  }
}
