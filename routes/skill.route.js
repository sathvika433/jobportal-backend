import express from "express";
import { skillGapAnalysis } from "../controllers/skill.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.get("/gap", isAuthenticated, skillGapAnalysis);

export default router;