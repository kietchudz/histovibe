import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY || "AIzaSyB-Ze1LuRGlkkP0pAGbo2I_8oQ-s_c0s2w";

async function testModel(modelName) {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello!");
        console.log(`Success with ${modelName}:`, result.response.text());
        return true;
    } catch (err) {
        console.error(`Failed with ${modelName}:`, err?.message || err);
        return false;
    }
}

async function run() {
    await testModel("gemini-1.5-flash-latest");
    await testModel("gemini-1.5-pro");
    await testModel("gemini-pro");
    await testModel("gemini-1.0-pro");
}
run();
