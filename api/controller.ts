
import { Player, Team, Round, ResponseMessage } from "./models"
import getWords from '../randomWordsManipulation'

let teams: Team[] = []
let players: Player[] =  []
let rounds: Round[] = []
let flagRoundStarted = false;

function fillPlayers(){
    players.push(new Player(0, 'Denis', 0))
    players.push(new Player(1, 'Joao', 0))
    players.push(new Player(2, 'Marcus', 0))
    players.push(new Player(3, 'Luiz', 0))

    players.push(new Player(0, 'Peter', 1))
    players.push(new Player(1, 'Juca', 1))
    players.push(new Player(2, 'Diego', 1))
    players.push(new Player(3, 'Gustavo', 1))
}

fillPlayers();

function fillTeams(){
    teams.push(new Team(0, 'Time A', players.slice(0, 4), 0))
    teams.push(new Team(1, 'Time B', players.slice(4, 8), 0))
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

}

function getPlayerTurn(){
    
    let currentTeam = teams.filter(t => t.isTurn)[0];
    
    if(currentTeam.players && currentTeam.players.length > 0){

        if(currentTeam.lastPlayer && currentTeam.currentPlayer){

            let length = currentTeam.players.length;

            if((currentTeam.currentPlayer.id + 1) == length){
                currentTeam.lastPlayer = currentTeam.currentPlayer;
                currentTeam.currentPlayer = currentTeam.players[0];
            }else{
                let nextId = currentTeam.currentPlayer.id + 1;
                currentTeam.lastPlayer = currentTeam.currentPlayer;
                currentTeam.currentPlayer = currentTeam.players[nextId];
            }

        }else{
            currentTeam.currentPlayer = currentTeam.players[0]
            currentTeam.lastPlayer = currentTeam.players[0]
        }

        teams[currentTeam.id] = currentTeam;
    }


}

function saveHistory(round: Round){
    rounds.push(round);
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
        try{ 
            return res.json({status: 'Ok', payload: players} as ResponseMessage);
        }
        catch(e){
            console.log(e);
            return res.json({status: 'Error', message: JSON.stringify(e)} as ResponseMessage);
        }
    }

    async savePlayer(req: any, res: any){
        try{
            players.push(req.body.player);
            return res.json({status: 'Ok', message: 'Usuário salvo', payload: players} as ResponseMessage);
        }
        catch(e){
            console.log(e);
            return res.json({status: 'Error', message: JSON.stringify(e)} as ResponseMessage);
        }
    }

    async deletePlayer(req: any, res: any){
        try{
            players = players.filter(p => p.id !== req.body.player.id )
            return res.json({status: 'Ok', message: 'Usuario deletado', payload: players} as ResponseMessage);
        }
        catch(e){
            console.log(e);
            return res.json({status: 'Error', message: JSON.stringify(e)} as ResponseMessage);
        }
    }

    async updatePlayer(req: any, res: any){
        try{
            players = players.filter(p => p.id !== req.body.player.id )
            players.push(req.body.player);
            return res.json({status: 'Ok', message: 'Usuario atualizado', payload: players} as ResponseMessage);
        }
        catch(e){
            console.log(e);
            return res.json({status: 'Error', message: JSON.stringify(e)} as ResponseMessage);
        }
    }


    /* Teams ---------------- */

    async getTeams(req: any, res: any){
        try{
            return res.json({status: 'Ok', payload: teams} as ResponseMessage);
        }
        catch(e){
            console.log(e);
            return res.json({status: 'Error', message: JSON.stringify(e)} as ResponseMessage);
        }
    }

    async saveTeam(req: any, res: any){
        try{
            teams.push(req.body.team);
            return res.json({status: 'Ok', message: 'Time salvo', payload: teams} as ResponseMessage);
        }
        catch(e){
            console.log(e);
            return res.json({status: 'Error', message: JSON.stringify(e)} as ResponseMessage);
        }
    }

    async deleteTeam(req: any, res: any){
        try{
            teams = teams.filter(p => p.id !== req.body.team.id )
            return res.json({status: 'Ok', message: 'Time deletado', payload: teams} as ResponseMessage);
        }
        catch(e){
            console.log(e);
            return res.json({status: 'Error', message: JSON.stringify(e)} as ResponseMessage);
        }
    }

    async updateTeam(req: any, res: any){
        try{    
            teams = teams.filter(p => p.id !== req.body.team.id )
            teams.push(req.body.team);
            return res.json({status: 'Ok', message: 'Time atualizado', payload: teams} as ResponseMessage);
        }
        catch(e){
            console.log(e);
            return res.json({status: 'Error', message: JSON.stringify(e)} as ResponseMessage);
        }
    }

    /* Gerenciar rodadas */

    async startRound(req: any, res: any){
        try{
            if(!flagRoundStarted){
                getTeamTurn()
                getPlayerTurn()
                flagRoundStarted = true;
                return res.json({status: 'Ok', message: 'Rodada iniciado', payload: {teams}} as ResponseMessage);
            }
            else
                throw  'a Rodada já foi iniciado, você não pode iniciar outra'

        }
        catch(e){
            console.log(e);
            return res.json({status: 'Error', message: JSON.stringify(e)} as ResponseMessage);
        }    

    } 

    async nextRound(req: any, res: any){
        try{
            const score = req.body.score;

            let current = teams.filter(t => t.isTurn)[0]
            teams[current.id].score += score;

            if(current.currentPlayer){
                let round = new Round(current, current.currentPlayer,  score)
                saveHistory(round)
            }

            getTeamTurn()
            getPlayerTurn()

            
            return res.json({status: 'Ok', message: 'Próximo Round', payload: {teams}} as ResponseMessage);

        }
        catch(e){
            console.log(e);
            return res.json({status: 'Error', message: JSON.stringify(e)} as ResponseMessage);
        }

        
    } 

    async roundHistory(req: any, res: any){
        try{    
            if(rounds.length > 0)
                return res.json({status: 'Ok', message: 'Rounds', payload: {rounds}} as ResponseMessage);
            else    
                return res.json({status: 'Error', message: 'Não há nenhum round ainda'} as ResponseMessage);
        }
        catch(e){
            console.log(e);
            return res.json({status: 'Error', message: JSON.stringify(e)} as ResponseMessage);
        }
    }

    

}
