import dotenv from "dotenv";
dotenv.config();

import { summarize } from "./gemini.js";

async function runTest() {
  const content = `
    Artificial Intelligence (AI) refers to the simulation of human intelligence
    in machines that are programmed to think like humans and mimic their actions.
    The term may also be applied to any machine that exhibits traits associated
    with a human mind such as learning and problem-solving.
  `;

  const summary = await summarize(content);
  console.log("\n🧠 Gemini Summary:\n", summary);
}

runTest();
