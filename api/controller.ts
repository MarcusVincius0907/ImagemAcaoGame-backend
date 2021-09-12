
import { Player, Team, Round, ResponseMessage } from "./models"
import getWords from '../randomWordsManipulation'

let teams: Team[] = []
let players: Player[] =  []
let rounds: Round[] = []

function fillPlayers(){
    players.push(new Player(0, 'Denis', 0))
    players.push(new Player(1, 'Joao', 0))
    players.push(new Player(2, 'Marcus', 0))
    players.push(new Player(3, 'Luiz', 0))

    players.push(new Player(4, 'Luiz', 1))
    players.push(new Player(5, 'Juca', 1))
    players.push(new Player(6, 'Diego', 1))
    players.push(new Player(7, 'Gustavo', 1))
}

fillPlayers();

function fillTeams(){
    teams.push(new Team(0, 'Time A', players.slice(0, 3), 0))
    teams.push(new Team(0, 'Time A', players.slice(3, 7), 0))
}

fillTeams();

function getTeamTurn(){
    let current = teams.filter(t => t.isTurn)
    if(!current){
        teams[0].isTurn = true;
        return teams[0];
    }else{
        teams.map(t => t.isTurn = !t.isTurn);
        return teams.filter(t => t.isTurn);
    }
}

export = {

    /* words ---------------- */

    async getWords(req: any, res: any){
        try{
            const words = await getWords()
            return  res.json(words);
        }catch(err){
            res.json({status: 'Error', message: err} as ResponseMessage)
        }
    },

    /* players ---------------- */

    async getPlayers(req: any, res: any){
        return res.json({status: 'Ok', payload: players} as ResponseMessage);
    },

    async savePlayer(req: any, res: any){
        players.push(req.player);
        return res.json({status: 'Ok', message: 'Usuário salvo', payload: players} as ResponseMessage);
    },

    async deletePlayer(req: any, res: any){
        players = players.filter(p => p.id !== req.player.id )
        return res.json({status: 'Ok', message: 'Usuario deletado', payload: players} as ResponseMessage);
    },

    async updatePlayer(req: any, res: any){
        players = players.filter(p => p.id !== req.player.id )
        players.push(req.player);
        return res.json({status: 'Ok', message: 'Usuario atualizado', payload: players} as ResponseMessage);
    },


    /* Teams ---------------- */

    async getTeams(req: any, res: any){
        return res.json({status: 'Ok', payload: teams} as ResponseMessage);
    },

    async saveTeam(req: any, res: any){
        teams.push(req.team);
        return res.json({status: 'Ok', message: 'Time salvo', payload: teams} as ResponseMessage);
    },

    async deleteTeam(req: any, res: any){
        teams = teams.filter(p => p.id !== req.Team.id )
        return res.json({status: 'Ok', message: 'Time deletado', payload: teams} as ResponseMessage);
    },

    async updateTeam(req: any, res: any){
        teams = teams.filter(p => p.id !== req.Team.id )
        teams.push(req.Team);
        return res.json({status: 'Ok', message: 'Time atualizado', payload: teams} as ResponseMessage);
    },

    /* Gerenciar rodadas */

    async iniciarRodada(req: any, res: any){
        return res.json({status: 'Ok', message: 'Round iniciado', payload: {players,teams}} as ResponseMessage);
    } ,

    

}
