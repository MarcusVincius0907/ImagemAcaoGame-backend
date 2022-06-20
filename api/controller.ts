
import { Player, Team, Round, ResponseMessage, Scoreboard, RoundScoreInfo, Words, Turn, Configuration, GameConfig, Winner } from "./models"
import getWords from '../randomWordsManipulation'
import gameConfigFile from './gameConfig'


let teams: Team[] = []
let players: Player[] =  []
let rounds: Round[] = []
let turn: Turn | null = null;
let flagRoundStarted = false;
let scoreboard: Scoreboard | null = null
let configFile: GameConfig[] = JSON.parse(gameConfigFile)
let configuration: Configuration | null = null
let winner: Winner | null = null


function startUpConfig(config: Configuration){

    if(config){
        configuration = config
    }

}

function updateScoreboard(){
    let totalTimeA = 0;
    let totalTimeB = 0;
    let roundsTimeA: RoundScoreInfo[] = [] as  RoundScoreInfo[]
    let roundsTimeB: RoundScoreInfo[] = [] as  RoundScoreInfo[]

    rounds.forEach((v,i,arr) => {

        if(v.turnTeam.id === 0){
            totalTimeA += v.score ?? 0;
            roundsTimeA.push({roundNumber: i + 1, score: v.score ?? 0 })
        }else if(v.turnTeam.id === 1){
            totalTimeB += v.score ?? 0;
            roundsTimeB.push({roundNumber: i + 1, score: v.score ?? 0 })
        }


    })

    scoreboard = {
        scoreInfo: [
            { 
                idTeam:0, 
                total: totalTimeA,
                rounds: roundsTimeA
            },
            { 
                idTeam:1, 
                total: totalTimeB,
                rounds: roundsTimeB
            }
        ]
    }

    teams.map(v => {
        if(v.id === 0)
            return v.scoreInfo = scoreboard?.scoreInfo[0] ?? null

        if(v.id === 1)
            return v.scoreInfo = scoreboard?.scoreInfo[1] ?? null
    })
}

function updateTurn(){

    let currentTeam = teams.filter(t => t.isTurn)[0];

    turn = {
        player:currentTeam?.currentPlayer,
        team:{id:currentTeam?.id, name:currentTeam?.name},
        round: (rounds.length + 1)
    }
}

function fillPlayers(){
    /* players.push(new Player(0, 'Denis', 0))
    players.push(new Player(1, 'Joao', 0))
    players.push(new Player(2, 'Marcus', 0))
    players.push(new Player(3, 'Luiz', 0))

    players.push(new Player(0, 'Peter', 1))
    players.push(new Player(1, 'Juca', 1))
    players.push(new Player(2, 'Diego', 1))
    players.push(new Player(3, 'Gustavo', 1)) */

    players.push(new Player(0, 'Jogador 1', 0))
    players.push(new Player(1, 'Jogador 2', 0))

    players.push(new Player(0, 'Jogador 1', 1))
    players.push(new Player(1, 'Jogador 2', 1))
}

function fillTeams(){
    teams.push(new Team(0, 'Time A', players.slice(0, 2), 0))
    teams.push(new Team(1, 'Time B', players.slice(2, 4), 0))
}

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

function resetVariables(){

    if(teams.length === 0){
        
        teams = [];
        players =  [];
        fillPlayers();
        fillTeams();

    }

    
    rounds = [];
    turn = null;
    flagRoundStarted = false;
    scoreboard = null;
    //configuration = null;
    winner = null
   
    resetTeam();
    getTeamTurn()
    getPlayerTurn()
}

function resetTeam(){
    teams.forEach((team, i, arr) =>{
        arr[i].score = 0;
        arr[i].scoreInfo = null;
    } );
}



function setWinner() {
    let team1 = teams[0];
    let team2 = teams[1];
    if((team1.scoreInfo?.total && team2.scoreInfo?.total)){

        if(team1.scoreInfo?.total - team2.scoreInfo?.total === 0){
            let w = {
                teamName: '',
                score: 0,
                tie: true
            }
            winner = w
            return
        }

        if(team1.scoreInfo?.total > team2.scoreInfo?.total){
            let w = {
                teamName: team1.name,
                score: team1.scoreInfo?.total,
                tie: false
            }
            winner = w
        }else{
            let w = {
                teamName: team2.name,
                score: team2.scoreInfo?.total,
                tie: false
            }
            winner = w
        }
    }
}

function formatNewTeams(nt: Team[]){

    
    nt.forEach((team,i,arr) => {

        arr[i].players?.forEach((player, indexPlayer, arrPlayer) => {
            arrPlayer[indexPlayer].id = indexPlayer;
            arrPlayer[indexPlayer].teamId = i;
        })

        //arr[i].currentPlayer = team?.players? team?.players[0] : undefined
        //arr[i].lastPlayer = team?.players? team?.players[0] : undefined

    })
    teams = nt
}



export default class Controllers {

    //#region home

    //#region /* words ---------------- */

    async getWords(req: any, res: any){
        try{
            const words = await getWords(configuration?.wordsQtd)
            let resp: Words[] = [];
            words.forEach((v,i)=> {
                if(i > 0){
                    resp.push({word: v, value: i * 10})
                }else{
                    resp.push({word: v, value: 5})
                }
            })
            return  res.json({status: 'Ok', payload: resp} as ResponseMessage);
        }catch(err){
            res.json({status: 'Error', message: err} as ResponseMessage)
        }
    }

    //#endregion

    //#region  /* players ---------------- */

    async getPlayers(req: any, res: any){
        try{ 
            return res.json({status: 'Ok', payload: players} as ResponseMessage);
        }
        catch(e){
            //console.log(e);
            return res.json({status: 'Error', message: JSON.stringify(e)} as ResponseMessage);
        }
    }

    async savePlayer(req: any, res: any){
        try{
            players.push(req.body.player);
            return res.json({status: 'Ok', message: 'Usuário salvo', payload: players} as ResponseMessage);
        }
        catch(e){
            //console.log(e);
            return res.json({status: 'Error', message: JSON.stringify(e)} as ResponseMessage);
        }
    }

    async deletePlayer(req: any, res: any){
        try{
            players = players.filter(p => p.id !== req.body.player.id )
            return res.json({status: 'Ok', message: 'Usuario deletado', payload: players} as ResponseMessage);
        }
        catch(e){
            //console.log(e);
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
            //console.log(e);
            return res.json({status: 'Error', message: JSON.stringify(e)} as ResponseMessage);
        }
    }

    //#endregion

    //#region  /* Teams ---------------- */

    async getTeams(req: any, res: any){
        try{
            return res.json({status: 'Ok', payload: teams} as ResponseMessage);
        }
        catch(e){
            //console.log(e);
            return res.json({status: 'Error', message: JSON.stringify(e)} as ResponseMessage);
        }
    }

    async saveTeam(req: any, res: any){
        try{
            let newTeam = new Team(teams.length + 1, req.body.team.name, req.body.team.players )
            teams.push(newTeam);
            return res.json({status: 'Ok', message: 'Time salvo', payload: teams} as ResponseMessage);
        }
        catch(e){
            //console.log(e);
            return res.json({status: 'Error', message: JSON.stringify(e)} as ResponseMessage);
        }
    }

    async deleteTeam(req: any, res: any){
        try{
            teams = teams.filter(p => p.id !== req.body.team.id )
            return res.json({status: 'Ok', message: 'Time deletado', payload: teams} as ResponseMessage);
        }
        catch(e){
            //console.log(e);
            return res.json({status: 'Error', message: JSON.stringify(e)} as ResponseMessage);
        }
    }

    //not in use
    async updateTeam(req: any, res: any){
        try{    
            teams = teams.filter(p => p.id !== req.body.team.id )
            teams.push(req.body.team);
            return res.json({status: 'Ok', message: 'Time atualizado', payload: teams} as ResponseMessage);
        }
        catch(e){
            //console.log(e);
            return res.json({status: 'Error', message: JSON.stringify(e)} as ResponseMessage);
        }
    }

    async updateTeams(req: any, res: any){
        try{    
            formatNewTeams(req.body.teams)
            return res.json({status: 'Ok', message: 'Time atualizado', payload: teams} as ResponseMessage);
        }
        catch(e){
            console.log(e);
            return res.json({status: 'Error', message: JSON.stringify(e)} as ResponseMessage);
        }
    }

    //#endregion

    //#region /* Gerenciar rodadas */

    

    async startRound(req: any, res: any){
        try{
            if(!flagRoundStarted){
                resetVariables()
                startUpConfig(req.body?.config)
                flagRoundStarted = true;
                return res.json({status: 'Ok', message: 'Rodada iniciado'} as ResponseMessage);
            }
            else{
                /* getTeamTurn()
                getPlayerTurn() */
                return res.json({status: 'Error', message: JSON.stringify('a Rodada já foi iniciado, você não pode iniciar outra')} as ResponseMessage);
            }

        }
        catch(e){
            //console.log(e);
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

            updateScoreboard()

            if((configuration?.roundQtd ?? 0) <= rounds.length){
                setWinner();
                return res.json({status: 'Ok', message: 'Partida Finalizada', payload: winner} as ResponseMessage);
            }

            if(teams.length > 0){
                getTeamTurn()
                getPlayerTurn()
            }

            
            return res.json({status: 'Ok', message: 'Próximo Round', payload: false} as ResponseMessage);

        }
        catch(e){
            //console.log(e);
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
            //console.log(e);
            return res.json({status: 'Error', message: JSON.stringify(e)} as ResponseMessage);
        }
    }

    //#endregion

    async scoreboard(req: any, res: any){
        try{    
            return res.json({status: 'Ok', message: 'Scoreboard', payload: {scoreboard}} as ResponseMessage);
        }
        catch(e){
            //console.log(e);
            return res.json({status: 'Error', message: JSON.stringify(e)} as ResponseMessage);
        }
    }

    async getTurn(req: any, res: any){
        try{    
            updateTurn();
            return res.json({status: 'Ok', message: 'Turn', payload: turn} as ResponseMessage);
        }
        catch(e){
            //console.log(e);
            return res.json({status: 'Error', message: JSON.stringify(e)} as ResponseMessage);
        }
    }


    //#endregion

    //#region config
    async getGeneralConfig(req: any, res: any){
        try{    
            return res.json({status: 'Ok', message: 'Turn', payload: configFile} as ResponseMessage);
        }
        catch(e){
            //console.log(e);
            return res.json({status: 'Error', message: JSON.stringify(e)} as ResponseMessage);
        }
    }
    //#endregion

    async reset(req: any, res: any){
        try{    
            resetVariables()
            return res.json({status: 'Ok', message: 'Reset'} as ResponseMessage);
        }
        catch(e){
            //console.log(e);
            return res.json({status: 'Error', message: JSON.stringify(e)} as ResponseMessage);
        }
    }

    

}
