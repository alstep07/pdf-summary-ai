import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateSummary = async (text: string) => {
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
        content: `Please provide a concise, narrative summary of the following text in clear paragraphs:\n\n${text}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 500,
  });

  return completion.choices[0].message.content;
};
