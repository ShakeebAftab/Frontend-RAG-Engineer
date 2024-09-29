import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import data from "./doc.json";
import { EnvKeys, getEnvValue } from "./envHandler.js";

// const generateRandomNumber = (min: number, max: number) => {
//   return Math.floor(Math.random() * (max - min) + min);
// };

let count = 0;

// const prompt = `
//   You are a react landing page creator. The user will give you a description of what they want you to build.
//   You're given a list of components. Only use that specific components ${JSON.stringify(count % 2 ? data.components.filter((c) => c.name != "MediaHero" && c.name != "GradientHero") : data.components.filter((c) => c.name != "HeroOne" && c.name != "HeroTwo" && c.name != "Nav"), null, 2)} You must response with a json array of object.
//   where each object must have the following fields name, props, priority. name must match exactly as provided in the document
//   Choose a range of components not just the first component that you see. Consider all the components and then choose focus on the desc to choose the components
//   There are multiple hero components some of them numbered some of them not. You can choose any of them.
//   ALWAYS REPLY WITH ONLY THE JSON STRUCTURE REQUESTED
//   `;

const genAI = new GoogleGenerativeAI("AIzaSyBX0Xvbgpf_pBK1t6GXJ13Y2yz_PujUr5w");
export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
  You are a react landing page creator. The user will give you a description of what they want you to build. 
  You're given a list of components. Only use that specific components ${JSON.stringify(data, null, 2)} You must response with a json array of object. 
  where each object must have the following fields name, props, priority. name must match exactly as provided in the document
  Choose a range of components not just the first component that you see. Consider all the components and then choose focus on the desc to choose the components
  There are multiple hero components some of them numbered some of them not. You can choose any of them. Try not to use numbered hero components but do use them sometimes
  The preference section indicates the likes of the user
  `,
});

export const getMessage = async (msg: string) => {
  try {
    console.log({ count });
    count++;
    const client = new OpenAI({
      apiKey: getEnvValue(EnvKeys.open_ai),
    });

    const completion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: ` You are a react landing page creator. The user will give you a description of what they want you to build. 
            You're given a list of components. Only use that specific components ${JSON.stringify(count % 2 ? data.components.filter((c) => c.name != "MediaHero" && c.name != "GradientHero") : data.components.filter((c) => c.name != "HeroOne" && c.name != "HeroTwo" && c.name != "Nav"), null, 2)} You must response with a json array of object. 
            where each object must have the following fields name, props, priority. name must match exactly as provided in the document
            Choose a range of components not just the first component that you see. Consider all the components and then choose focus on the desc to choose the components
            There are multiple hero components some of them numbered some of them not. You can choose any of them.
            ALWAYS REPLY WITH ONLY THE JSON STRUCTURE REQUESTED`,
        },
        {
          role: "user",
          content: msg,
        },
      ],

      model: "gpt-4o",
    });

    console.log(completion.choices[0].message.content);

    return completion?.choices[0]?.message?.content;
  } catch (error) {
    console.error(error);
    return null;
  }
};
