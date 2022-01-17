export class Player{
  constructor(id:number = 0, name:string = 'Joao', teamId:number = 0){
    this.name = name
    this.id = id
    this.teamId = teamId;
  }
  id: number;
  name: string;
  teamId: number;
}

export class Team {
  constructor(id:number = 0, name: string = 'Time A', players:Player[] = [], score: number = 0){
    this.id = id;
    this.name = name;
    this.players = players;
    this.score = score;
    this.isTurn = false;
    this.scoreInfo = null;
  }
  id: number;
  name: string;
  isTurn: boolean;
  players?: Player[];
  currentPlayer?: Player;
  lastPlayer?: Player;
  score?: number;
  scoreInfo: ScoreInfo | null
}

export interface ResponseMessage {
  status: string;
  message?: string;
  payload?: any;
}

export class Round{
  constructor(
    turnTeam: Team,
    turnPlayer: Player,
    score?: number,
  ){
    this.turnTeam = turnTeam;
    this.turnPlayer = turnPlayer;
    this.score = score;
  }

  turnTeam: Team;
  turnPlayer: Player;
  score?: number;
}


export interface Scoreboard{
  scoreInfo: ScoreInfo[]
}

interface ScoreInfo{
  idTeam: number, 
  total: number,
  rounds: Array<RoundScoreInfo>
}

export interface RoundScoreInfo{
  roundNumber: number,
  score: number
}

export interface Words{
  word: string,
  value: number,
}