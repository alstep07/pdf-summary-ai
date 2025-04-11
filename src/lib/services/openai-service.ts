import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSummary(text: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that generates concise summaries of PDF documents. Focus on the main points and key takeaways.",
      },
      {
        role: "user",
        content: `Please provide a concise summary of the following text:\n\n${text}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 500,
  });

  console.log("Completion:", JSON.stringify(completion, null, 2));

  if (!completion.choices[0].message.content) {
    throw new Error("No content returned from OpenAI");
  }

  return completion.choices[0].message.content;
}
