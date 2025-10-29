
//const openaiImpl = require("./openai");
const geminiImpl = require("./gemini");

const providers = {
  //openai: openaiImpl,
  gemini: geminiImpl,
  mock: {
    summarize: async (content) => {
      // very naive mock summary (you should replace with real provider)
      const sentences = content.split(".").map(s => s.trim()).filter(Boolean);
      return sentences.slice(0, Math.min(3, sentences.length)).join(". ") + (sentences.length>3 ? "..." : "");
    }
  }
};

async function summarizeWithLLM(content, provider = "mock") {
  const impl = providers[provider];
  if (!impl) throw new Error("Unknown LLM provider");
  return impl.summarize(content);
}

module.exports = { summarizeWithLLM };
