export enum Players {
  Player1 = 'Player1',
  Player2 = 'Player2',
}
export enum GameMode {
  Setup = 'Setup',
  InProgress = 'In Progress',
  Finished = 'Finished'
}

export interface Player {
  carambolesMade: number[];
  carambolesToMake: number;
  player: Players;
  name: string;
}

export interface Game {
  gameMode: GameMode;
  turn: number;
  currentPlayer: Players;
  player1: Player;
  player2: Player;
  lastTurn: boolean;
}

export interface DerivedPlayer extends Player {
    totalCaramboles: number,
    averageCaramboles: number,
    highestSerie: number,
    numberOfPoedels: number,
    carambolesLeft: number
}

export interface DerivedGame extends Game {
    player1: DerivedPlayer;
    player2: DerivedPlayer; 
    carambolesLeftCurrentPlayer: number;
}

