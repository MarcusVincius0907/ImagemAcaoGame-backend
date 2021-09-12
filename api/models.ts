export class Player{
  constructor(id:number = 0, name:string = 'Joao', teamId:number = 0){
    this.name = name
    this.id = id
    this.isTurn = false
    this.teamId = teamId;
  }
  id: number;
  name: string;
  teamId: number;
  isTurn: boolean;
}

export class Team {
  constructor(id:number = 0, name: string = 'Time A', players:Player[] = [], score: number = 0){
    this.id = id;
    this.name = name;
    this.players = players;
    this.score = score;
    this.isTurn = false;
  }
  id: number;
  name: string;
  isTurn: boolean;
  players?: Player[];
  score?: number;
}

export interface ResponseMessage {
  status: string;
  message?: string;
  payload?: any;
}

export class Round{
  constructor(
    id: number,
    turnTeam: Team,
    turnPlayer: Player,
    score?: number,
  ){
    this.id = id;
    this.turnTeam = turnTeam;
    this.turnPlayer = turnPlayer;
    this.score = score;
  }

  id: number;
  turnTeam: Team;
  turnPlayer: Player;
  score?: number;
}
