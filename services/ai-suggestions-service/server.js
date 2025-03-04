import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import suggestionRoutes from "./routes/suggestionsRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Use AI Suggestion Service Routes
app.use("/api/suggestions", suggestionRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`🚀 AI Suggestion Service running on port ${PORT}`));
