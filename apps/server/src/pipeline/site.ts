// import { prompt } from "@google-labs/template-kit";

// const createSitePrompt = prompt`

// `;

import { board, input, output } from "@breadboard-ai/build";
import { prompt } from "@google-labs/template-kit";
import { geminiText } from "@google-labs/gemini-kit";

const topic = input({
  description: "What should the poem be about?",
  examples: ["Coffee in the morning", "The mind of a cat"],
});

const stanzas = input({
  type: "number",
  description: "How many stanzas should the poem have?",
  default: 4,
});

const poemPrompt = prompt`
  Write a poem about ${topic} with ${stanzas} stanzas.`;

const poemWriter = geminiText({
  text: poemPrompt,
  model: "gemini-1.5-flash-latest",
});

const poem = output(poemWriter.outputs.text, {
  title: "Poem",
  description: "The poem that Gemini generated.",
});

export const poemBoard = board({
  id: "poem-writer",
  title: "Poem Writer",
  description: "Write a poem with Gemini.",
  inputs: { topic, stanzas },
  outputs: { poem },
});
