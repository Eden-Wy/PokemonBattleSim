// import { Leaderboard } from "../schemas/index.js";
import Leaderboard from "../schemas/leaderboardSchema.js";
import { CustomError } from "../utils/errorHandler.js";

export const getLeaderboard = async (req, res, next) => {
  try {
    const leaderboard = await Leaderboard.findAll();
    res.status(200).json(leaderboard);
  } catch (error) {
    next(new CustomError("Error fetching leaderboard", 500));
  }
};

export const createLeaderboard = async (req, res, next) => {
  try {
    const newLeaderboard = await Leaderboard.create(req.body);
    res.status(201).json(newLeaderboard);
  } catch (error) {
    next(new CustomError("Error creating Leaderboard", 500));
  }
};


//Don't I need the user's user ID to ensure the user gets the right leaderboard?

export const updateLeaderboard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_name, poke_name, score } = req.body;
    await Leaderboard.update(
      { user_name, poke_name, score },
      { where: { id } }
    );
    const updatedLeaderboard = await Leaderboard.findByPk(id);
    if (!updatedLeaderboard) {
      return next(new CustomError("Leaderboardt not found", 404));
    }
    res.status(200).json(updatedLeaderboard);
  } catch (error) {
    next(new CustomError("Error updating Leaderboard", 500));
  }
};
