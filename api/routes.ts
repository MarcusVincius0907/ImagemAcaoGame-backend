import express from 'express';
import Controllers from './controller'
const routes = express.Router();

const controller = new Controllers()

//words
routes.get("/words", controller.getWords);

//players
routes.get("/players", controller.getPlayers);
routes.post("/players", controller.savePlayer)
routes.put("/players", controller.updatePlayer);
routes.delete("/players", controller.deletePlayer);

//team
routes.get("/team", controller.getTeams);
routes.post("/team", controller.saveTeam)
routes.put("/team", controller.updateTeam);
routes.delete("/team", controller.deleteTeam);

//round
routes.get("/round", controller.startRound);
routes.post("/round", controller.nextRound);
routes.get("/round-history", controller.roundHistory);

//scoreboard
routes.get("/scoreboard", controller.scoreboard);

//turn
routes.get("/turn", controller.getTurn);

export default routes;
