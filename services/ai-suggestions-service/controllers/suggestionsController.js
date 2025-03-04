import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro", apiVersion: "v1" });


export const suggestImprovements = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text input is required" });
    }

    console.log(`➡️ Sending request to Gemini API: ${text}`);

    const response = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `Suggest improvements for this text: "${text}"` }] }]
    });

    console.log(`✅ Full Gemini API Response:`, JSON.stringify(response, null, 2));

    const suggestions = response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!suggestions) {
      throw new Error("No valid response from Gemini API");
    }

    res.json({ suggestions });
  } catch (error) {
    console.error(`❌ Gemini API Error:`, error);
    res.status(500).json({ error: "Gemini API failed to process request", details: error.message || error });
  }
};
