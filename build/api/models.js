"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Round = exports.Team = exports.Player = void 0;
class Player {
    constructor(id = 0, name = 'Joao', teamId = 0) {
        this.name = name;
        this.id = id;
        this.teamId = teamId;
    }
}
exports.Player = Player;
class Team {
    constructor(id = 0, name = 'Time A', players = [], score = 0) {
        this.id = id;
        this.name = name;
        this.players = players;
        this.score = score;
        this.isTurn = false;
        this.scoreInfo = null;
    }
}
exports.Team = Team;
class Round {
    constructor(turnTeam, turnPlayer, score) {
        this.turnTeam = turnTeam;
        this.turnPlayer = turnPlayer;
        this.score = score;
    }
}
exports.Round = Round;
