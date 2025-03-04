import express from "express";
import { suggestImprovements } from "../controllers/suggestionsController.js";

const router = express.Router();

router.post("/suggest", suggestImprovements);

export default router;
