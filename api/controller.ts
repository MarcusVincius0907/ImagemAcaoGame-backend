
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

    players.push(new Player(4, 'Peter', 1))
    players.push(new Player(5, 'Juca', 1))
    players.push(new Player(6, 'Diego', 1))
    players.push(new Player(7, 'Gustavo', 1))
}

fillPlayers();

function fillTeams(){
    teams.push(new Team(0, 'Time A', players.slice(0, 4), 0))
    teams.push(new Team(1, 'Time B', players.slice(4, 7), 0))
}

fillTeams();

function getTeamTurn(){
    let current = teams.filter(t => t.isTurn)
    if(current.length == 0){
        teams[0].isTurn = true;
        teams[1].isTurn = false;
        //return teams[0];
    }else{
        teams.map(t => t.isTurn = !t.isTurn);
        //return teams.filter(t => t.isTurn);
    }

    console.log(teams);
    
    
}

function getPlayerTurn(){
    
    let currentTeam = teams.filter(t => t.isTurn)[0];
    
    if(currentTeam.players && currentTeam.players.length > 0){

        if(currentTeam.lastPlayer){

            let length = currentTeam.players.length;

            if((currentTeam.lastPlayer.id + 1) == length){
                currentTeam.currentPlayer = currentTeam.players[0];
            }else{
                currentTeam.currentPlayer = currentTeam.players[currentTeam.lastPlayer.id + 1];
            }

        }else{
            currentTeam.currentPlayer = currentTeam.players[0]
            currentTeam.lastPlayer = currentTeam.players[0]
        }

        teams[currentTeam.id] = currentTeam;
    }


}

export default class Controllers {

    /* words ---------------- */

    async getWords(req: any, res: any){
        try{
            const words = await getWords()
            return  res.json(words);
        }catch(err){
            res.json({status: 'Error', message: err} as ResponseMessage)
        }
    }

    /* players ---------------- */

    async getPlayers(req: any, res: any){
        return res.json({status: 'Ok', payload: players} as ResponseMessage);
    }

    async savePlayer(req: any, res: any){
        players.push(req.body.player);
        return res.json({status: 'Ok', message: 'Usuário salvo', payload: players} as ResponseMessage);
    }

    async deletePlayer(req: any, res: any){
        players = players.filter(p => p.id !== req.body.player.id )
        return res.json({status: 'Ok', message: 'Usuario deletado', payload: players} as ResponseMessage);
    }

    async updatePlayer(req: any, res: any){
        players = players.filter(p => p.id !== req.body.player.id )
        players.push(req.body.player);
        return res.json({status: 'Ok', message: 'Usuario atualizado', payload: players} as ResponseMessage);
    }


    /* Teams ---------------- */

    async getTeams(req: any, res: any){
        return res.json({status: 'Ok', payload: teams} as ResponseMessage);
    }

    async saveTeam(req: any, res: any){
        teams.push(req.body.team);
        return res.json({status: 'Ok', message: 'Time salvo', payload: teams} as ResponseMessage);
    }

    async deleteTeam(req: any, res: any){
        teams = teams.filter(p => p.id !== req.body.team.id )
        return res.json({status: 'Ok', message: 'Time deletado', payload: teams} as ResponseMessage);
    }

    async updateTeam(req: any, res: any){
        teams = teams.filter(p => p.id !== req.body.team.id )
        teams.push(req.body.team);
        return res.json({status: 'Ok', message: 'Time atualizado', payload: teams} as ResponseMessage);
    }

    /* Gerenciar rodadas */

    async startRound(req: any, res: any){
        getTeamTurn()
        getPlayerTurn()
        return res.json({status: 'Ok', message: 'Round iniciado', payload: {teams}} as ResponseMessage);
    } 

    async nextRound(req: any, res: any){
        const score = req.body.score;
        const idTeam = req.body.id;
        console.log(score);

        teams[idTeam].score = score;

        getTeamTurn()
        getPlayerTurn()

        return res.json({status: 'Ok', message: 'Próximo Round', payload: {teams}} as ResponseMessage);
    } 

    async RoundHistory(req: any, res: any){
        
    }

    

}
