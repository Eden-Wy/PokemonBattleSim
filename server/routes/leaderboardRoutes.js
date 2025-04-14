import { Router } from "express";
import { getLeaderboard, createLeaderboard, updateLeaderboard } from "../controllers/leaderboardController.js";

const router = Router();

router.get("/", getLeaderboard);
router.post("/", createLeaderboard);
router.get("/:id", updateLeaderboard);

export default router;