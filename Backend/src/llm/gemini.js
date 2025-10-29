

// llm/gemini.js
require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

// ✅ Define model type as a constant
const GEMINI_MODEL = "gemini-2.0-flash"; 

// ✅ Initialize the Gemini AI clien
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ✅ Summarization function
async function summarize(content) {
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: `Summarize this article briefly in 3–5 sentences:\n\n${content}`,
    });

    // ✅ Extract summary text safely
    const text =
      response.output_text ||
      response.text ||
      response.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No summary generated.";

    return text;
  } catch (err) {
    console.error("❌ Gemini summarization failed:", err.message);
    return "Error while generating summary using Gemini.";
  }
}

// ✅ Export for use in other files
module.exports = { summarize };
