import express from 'express';
import controller from './controller'
const routes = express.Router();

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
routes.get("/round", controller.iniciarRodada);


export default routes;
