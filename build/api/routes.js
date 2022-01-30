"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const routes = express_1.default.Router();
const controller = new controller_1.default();
//words
routes.get("/words", controller.getWords);
//players
routes.get("/players", controller.getPlayers);
routes.post("/players", controller.savePlayer);
routes.put("/players", controller.updatePlayer);
routes.delete("/players", controller.deletePlayer);
//team
routes.get("/team", controller.getTeams);
routes.post("/team", controller.saveTeam);
//routes.put("/team", controller.updateTeam);
routes.put("/team", controller.updateTeams);
routes.delete("/team", controller.deleteTeam);
//round
routes.post("/round-start", controller.startRound);
routes.post("/round-next", controller.nextRound);
routes.get("/round-history", controller.roundHistory);
//scoreboard
routes.get("/scoreboard", controller.scoreboard);
//turn
routes.get("/turn", controller.getTurn);
//config
routes.get("/config", controller.getGeneralConfig);
//reset
routes.get("/reset", controller.reset);
exports.default = routes;
