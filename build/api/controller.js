"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const randomWordsManipulation_1 = __importDefault(require("../randomWordsManipulation"));
const gameConfig_1 = __importDefault(require("./gameConfig"));
let teams = [];
let players = [];
let rounds = [];
let turn = null;
let flagRoundStarted = false;
let scoreboard = null;
let configFile = JSON.parse(gameConfig_1.default);
let configuration = null;
let winner = null;
function startUpConfig(config) {
    if (config) {
        configuration = config;
    }
}
function updateScoreboard() {
    let totalTimeA = 0;
    let totalTimeB = 0;
    let roundsTimeA = [];
    let roundsTimeB = [];
    rounds.forEach((v, i, arr) => {
        var _a, _b, _c, _d;
        if (v.turnTeam.id === 0) {
            totalTimeA += (_a = v.score) !== null && _a !== void 0 ? _a : 0;
            roundsTimeA.push({ roundNumber: i + 1, score: (_b = v.score) !== null && _b !== void 0 ? _b : 0 });
        }
        else if (v.turnTeam.id === 1) {
            totalTimeB += (_c = v.score) !== null && _c !== void 0 ? _c : 0;
            roundsTimeB.push({ roundNumber: i + 1, score: (_d = v.score) !== null && _d !== void 0 ? _d : 0 });
        }
    });
    scoreboard = {
        scoreInfo: [
            {
                idTeam: 0,
                total: totalTimeA,
                rounds: roundsTimeA
            },
            {
                idTeam: 1,
                total: totalTimeB,
                rounds: roundsTimeB
            }
        ]
    };
    teams.map(v => {
        var _a, _b;
        if (v.id === 0)
            return v.scoreInfo = (_a = scoreboard === null || scoreboard === void 0 ? void 0 : scoreboard.scoreInfo[0]) !== null && _a !== void 0 ? _a : null;
        if (v.id === 1)
            return v.scoreInfo = (_b = scoreboard === null || scoreboard === void 0 ? void 0 : scoreboard.scoreInfo[1]) !== null && _b !== void 0 ? _b : null;
    });
}
function updateTurn() {
    let currentTeam = teams.filter(t => t.isTurn)[0];
    turn = {
        player: currentTeam === null || currentTeam === void 0 ? void 0 : currentTeam.currentPlayer,
        team: { id: currentTeam === null || currentTeam === void 0 ? void 0 : currentTeam.id, name: currentTeam === null || currentTeam === void 0 ? void 0 : currentTeam.name },
        round: (rounds.length + 1)
    };
}
function fillPlayers() {
    /* players.push(new Player(0, 'Denis', 0))
    players.push(new Player(1, 'Joao', 0))
    players.push(new Player(2, 'Marcus', 0))
    players.push(new Player(3, 'Luiz', 0))

    players.push(new Player(0, 'Peter', 1))
    players.push(new Player(1, 'Juca', 1))
    players.push(new Player(2, 'Diego', 1))
    players.push(new Player(3, 'Gustavo', 1)) */
    players.push(new models_1.Player(0, 'Jogador 1', 0));
    players.push(new models_1.Player(1, 'Jogador 2', 0));
    players.push(new models_1.Player(0, 'Jogador 1', 1));
    players.push(new models_1.Player(1, 'Jogador 2', 1));
}
function fillTeams() {
    teams.push(new models_1.Team(0, 'Time A', players.slice(0, 2), 0));
    teams.push(new models_1.Team(1, 'Time B', players.slice(2, 4), 0));
}
function getTeamTurn() {
    let current = teams.filter(t => t.isTurn);
    if (current.length == 0) {
        teams[0].isTurn = true;
        teams[1].isTurn = false;
        //return teams[0];
    }
    else {
        teams.map(t => t.isTurn = !t.isTurn);
        //return teams.filter(t => t.isTurn);
    }
}
function getPlayerTurn() {
    let currentTeam = teams.filter(t => t.isTurn)[0];
    if (currentTeam.players && currentTeam.players.length > 0) {
        if (currentTeam.lastPlayer && currentTeam.currentPlayer) {
            let length = currentTeam.players.length;
            if ((currentTeam.currentPlayer.id + 1) == length) {
                currentTeam.lastPlayer = currentTeam.currentPlayer;
                currentTeam.currentPlayer = currentTeam.players[0];
            }
            else {
                let nextId = currentTeam.currentPlayer.id + 1;
                currentTeam.lastPlayer = currentTeam.currentPlayer;
                currentTeam.currentPlayer = currentTeam.players[nextId];
            }
        }
        else {
            currentTeam.currentPlayer = currentTeam.players[0];
            currentTeam.lastPlayer = currentTeam.players[0];
        }
        teams[currentTeam.id] = currentTeam;
    }
}
function saveHistory(round) {
    rounds.push(round);
}
function resetVariables() {
    teams = [];
    players = [];
    rounds = [];
    turn = null;
    flagRoundStarted = false;
    scoreboard = null;
    configuration = null;
    winner = null;
    fillPlayers();
    fillTeams();
    getTeamTurn();
    getPlayerTurn();
}
function setWinner() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    let team1 = teams[0];
    let team2 = teams[1];
    if ((((_a = team1.scoreInfo) === null || _a === void 0 ? void 0 : _a.total) && ((_b = team2.scoreInfo) === null || _b === void 0 ? void 0 : _b.total))) {
        if (((_c = team1.scoreInfo) === null || _c === void 0 ? void 0 : _c.total) - ((_d = team2.scoreInfo) === null || _d === void 0 ? void 0 : _d.total) === 0) {
            let w = {
                teamName: '',
                score: 0,
                tie: true
            };
            winner = w;
            return;
        }
        if (((_e = team1.scoreInfo) === null || _e === void 0 ? void 0 : _e.total) > ((_f = team2.scoreInfo) === null || _f === void 0 ? void 0 : _f.total)) {
            let w = {
                teamName: team1.name,
                score: ((_g = team1.scoreInfo) === null || _g === void 0 ? void 0 : _g.total) - ((_h = team2.scoreInfo) === null || _h === void 0 ? void 0 : _h.total),
                tie: false
            };
            winner = w;
        }
        else {
            let w = {
                teamName: team1.name,
                score: ((_j = team2.scoreInfo) === null || _j === void 0 ? void 0 : _j.total) - ((_k = team1.scoreInfo) === null || _k === void 0 ? void 0 : _k.total),
                tie: false
            };
            winner = w;
        }
    }
}
function formatNewTeams(nt) {
    nt.forEach((v, i, arr) => {
        arr[i].currentPlayer = (v === null || v === void 0 ? void 0 : v.players) ? v === null || v === void 0 ? void 0 : v.players[0] : undefined;
        arr[i].lastPlayer = (v === null || v === void 0 ? void 0 : v.players) ? v === null || v === void 0 ? void 0 : v.players[0] : undefined;
    });
    teams = nt;
}
class Controllers {
    //#region home
    //#region /* words ---------------- */
    getWords(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const words = yield (0, randomWordsManipulation_1.default)(configuration === null || configuration === void 0 ? void 0 : configuration.wordsQtd);
                let resp = [];
                words.forEach((v, i) => {
                    if (i > 0) {
                        resp.push({ word: v, value: i * 10 });
                    }
                    else {
                        resp.push({ word: v, value: 5 });
                    }
                });
                return res.json({ status: 'Ok', payload: resp });
            }
            catch (err) {
                res.json({ status: 'Error', message: err });
            }
        });
    }
    //#endregion
    //#region  /* players ---------------- */
    getPlayers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.json({ status: 'Ok', payload: players });
            }
            catch (e) {
                //console.log(e);
                return res.json({ status: 'Error', message: JSON.stringify(e) });
            }
        });
    }
    savePlayer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                players.push(req.body.player);
                return res.json({ status: 'Ok', message: 'Usuário salvo', payload: players });
            }
            catch (e) {
                //console.log(e);
                return res.json({ status: 'Error', message: JSON.stringify(e) });
            }
        });
    }
    deletePlayer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                players = players.filter(p => p.id !== req.body.player.id);
                return res.json({ status: 'Ok', message: 'Usuario deletado', payload: players });
            }
            catch (e) {
                //console.log(e);
                return res.json({ status: 'Error', message: JSON.stringify(e) });
            }
        });
    }
    updatePlayer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                players = players.filter(p => p.id !== req.body.player.id);
                players.push(req.body.player);
                return res.json({ status: 'Ok', message: 'Usuario atualizado', payload: players });
            }
            catch (e) {
                //console.log(e);
                return res.json({ status: 'Error', message: JSON.stringify(e) });
            }
        });
    }
    //#endregion
    //#region  /* Teams ---------------- */
    getTeams(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.json({ status: 'Ok', payload: teams });
            }
            catch (e) {
                //console.log(e);
                return res.json({ status: 'Error', message: JSON.stringify(e) });
            }
        });
    }
    saveTeam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newTeam = new models_1.Team(teams.length + 1, req.body.team.name, req.body.team.players);
                teams.push(newTeam);
                return res.json({ status: 'Ok', message: 'Time salvo', payload: teams });
            }
            catch (e) {
                //console.log(e);
                return res.json({ status: 'Error', message: JSON.stringify(e) });
            }
        });
    }
    deleteTeam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                teams = teams.filter(p => p.id !== req.body.team.id);
                return res.json({ status: 'Ok', message: 'Time deletado', payload: teams });
            }
            catch (e) {
                //console.log(e);
                return res.json({ status: 'Error', message: JSON.stringify(e) });
            }
        });
    }
    updateTeam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                teams = teams.filter(p => p.id !== req.body.team.id);
                teams.push(req.body.team);
                return res.json({ status: 'Ok', message: 'Time atualizado', payload: teams });
            }
            catch (e) {
                //console.log(e);
                return res.json({ status: 'Error', message: JSON.stringify(e) });
            }
        });
    }
    updateTeams(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                formatNewTeams(req.body.teams);
                return res.json({ status: 'Ok', message: 'Time atualizado', payload: teams });
            }
            catch (e) {
                console.log(e);
                return res.json({ status: 'Error', message: JSON.stringify(e) });
            }
        });
    }
    //#endregion
    //#region /* Gerenciar rodadas */
    startRound(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!flagRoundStarted) {
                    resetVariables();
                    startUpConfig((_a = req.body) === null || _a === void 0 ? void 0 : _a.config);
                    flagRoundStarted = true;
                    return res.json({ status: 'Ok', message: 'Rodada iniciado' });
                }
                else {
                    /* getTeamTurn()
                    getPlayerTurn() */
                    return res.json({ status: 'Error', message: JSON.stringify('a Rodada já foi iniciado, você não pode iniciar outra') });
                }
            }
            catch (e) {
                //console.log(e);
                return res.json({ status: 'Error', message: JSON.stringify(e) });
            }
        });
    }
    nextRound(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const score = req.body.score;
                let current = teams.filter(t => t.isTurn)[0];
                teams[current.id].score += score;
                if (current.currentPlayer) {
                    let round = new models_1.Round(current, current.currentPlayer, score);
                    saveHistory(round);
                }
                updateScoreboard();
                if (((_a = configuration === null || configuration === void 0 ? void 0 : configuration.roundQtd) !== null && _a !== void 0 ? _a : 0) <= rounds.length) {
                    setWinner();
                    return res.json({ status: 'Ok', message: 'Partida Finalizada', payload: winner });
                }
                if (teams.length > 0) {
                    getTeamTurn();
                    getPlayerTurn();
                }
                return res.json({ status: 'Ok', message: 'Próximo Round', payload: false });
            }
            catch (e) {
                //console.log(e);
                return res.json({ status: 'Error', message: JSON.stringify(e) });
            }
        });
    }
    roundHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (rounds.length > 0)
                    return res.json({ status: 'Ok', message: 'Rounds', payload: { rounds } });
                else
                    return res.json({ status: 'Error', message: 'Não há nenhum round ainda' });
            }
            catch (e) {
                //console.log(e);
                return res.json({ status: 'Error', message: JSON.stringify(e) });
            }
        });
    }
    //#endregion
    scoreboard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.json({ status: 'Ok', message: 'Scoreboard', payload: { scoreboard } });
            }
            catch (e) {
                //console.log(e);
                return res.json({ status: 'Error', message: JSON.stringify(e) });
            }
        });
    }
    getTurn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                updateTurn();
                return res.json({ status: 'Ok', message: 'Turn', payload: turn });
            }
            catch (e) {
                //console.log(e);
                return res.json({ status: 'Error', message: JSON.stringify(e) });
            }
        });
    }
    //#endregion
    //#region config
    getGeneralConfig(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.json({ status: 'Ok', message: 'Turn', payload: configFile });
            }
            catch (e) {
                //console.log(e);
                return res.json({ status: 'Error', message: JSON.stringify(e) });
            }
        });
    }
    //#endregion
    reset(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                resetVariables();
                return res.json({ status: 'Ok', message: 'Reset' });
            }
            catch (e) {
                //console.log(e);
                return res.json({ status: 'Error', message: JSON.stringify(e) });
            }
        });
    }
}
exports.default = Controllers;
