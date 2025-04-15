// import express from 'express';
// import Battle from '../models/Battle.js';
// import User from '../models/User.js';
// import Joi from 'joi';
// import { battleValidation } from '../utils/validation.js';

// const router = express.Router();

// router.post('/battle-result', async (req, res) => {
//   try {
//     const { error } = battleValidation.validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const { username } = req.body;
//     if (username) {
//       const existingUser = await User.findOne({ username });
//       if (!existingUser) {
//         await new User({ username }).save();
//       }
//     }

//     const battle = new Battle(req.body);
//     await battle.save();
//     res.status(200).send({ success: true });
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

// router.get('/battle-history', async (req, res) => {
//   const history = await Battle.find().sort({ timestamp: -1 });
//   res.send(history);
// });

// router.get('/leaderboard', async (req, res) => {
//   const battles = await Battle.find();
//   const stats = {};

//   battles.forEach(({ username, result }) => {
//     if (!username) return;
//     if (!stats[username]) stats[username] = { wins: 0, draws: 0, losses: 0 };
//     if (result === 'Victory') stats[username].wins++;
//     else if (result === 'Draw') stats[username].draws++;
//     else stats[username].losses++;
//   });

//   const leaderboard = Object.entries(stats).map(([name, stats]) => ({
//     name,
//     ...stats
//   })).sort((a, b) => b.wins - a.wins);

//   res.send(leaderboard);
// });

// export default router;

// backend/routes/battleRoutes.js
import express from 'express';
import Battle from '../models/Battle.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/battle-result', async (req, res) => {
  const { username, userPokemon, enemyPokemon, result } = req.body;
  try {
    // Create a new battle result
    const battle = new Battle({
      username,
      userPokemon,
      enemyPokemon,
      result,
      timestamp: new Date(),
    });

    await battle.save();

    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

export default router;
