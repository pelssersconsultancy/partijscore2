import { derived, Readable, writable } from 'svelte/store';
import {
  averageScore,
  maxScore,
  numberOfZeroScores,
  sumOfScores,
} from '../helpers/scores';

import { Players, DerivedGame, Game, GameMode, Player } from './game';

const initialGameState: Game = {
  gameMode: GameMode.Setup,
  turn: 0,
  lastTurn: false,
  currentPlayer: Players.Player1,
  player1: {
    carambolesMade: [],
    carambolesToMake: 0,
    name: '',
    player: Players.Player1,
  },
  player2: {
    carambolesMade: [],
    carambolesToMake: 0,
    name: '',
    player: Players.Player2,
  },
};

const reduceInitializeGame = (
  player1: Partial<Player>,
  player2: Partial<Player>
) => (state: Game): Game => ({
  ...state,
  gameMode: GameMode.InProgress,
  player1: { ...state.player1, ...player1 },
  player2: { ...state.player2, ...player2 },
  turn: 1,
});

const reduceNewGame = () => (state: Game): Game => ({
  ...initialGameState,
  player1: {
    ...initialGameState.player1,
    name: state.player1.name,
    carambolesToMake: state.player1.carambolesToMake
  },
  player2: {
    ...initialGameState.player2,
    name: state.player2.name,
    carambolesToMake: state.player2.carambolesToMake
  }
});


const reduceScorePlayer1 = (score: number) => (state: Game): Game => {
  const player: Player = { ...state.player1 };
  player.carambolesMade = [...player.carambolesMade, score];
  const gameMode = state.lastTurn ? GameMode.Finished : GameMode.InProgress;
  const lastTurn = player.carambolesToMake === sumOfScores(player.carambolesMade);

  return {
    ...state,
    gameMode,
    lastTurn,
    player1: player,
    turn: state.turn + 1,
    currentPlayer: Players.Player2,
  };
};

const reduceScorePlayer2 = (score: number) => (state: Game): Game => {
  const player: Player = { ...state.player2 };
  player.carambolesMade = [...player.carambolesMade, score];
  const gameMode = state.lastTurn ? GameMode.Finished : GameMode.InProgress;
  const lastTurn = player.carambolesToMake === sumOfScores(player.carambolesMade);

  return {
    ...state,
    gameMode,
    lastTurn,
    player2: player,
    turn: state.turn + 1,
    currentPlayer: Players.Player1,
  };
};

const reduceScore = (score: number) => (state: Game): Game => {
  const currentPlayer = state.currentPlayer;
  const reducer =
    currentPlayer === Players.Player1
      ? reduceScorePlayer1(score)
      : reduceScorePlayer2(score);
  return reducer(state);
};

function createGameStore() {
  const gameStore = writable(initialGameState);

  const derivedStore: Readable<DerivedGame> = derived(
    gameStore,
    ($gameStore) => {
      const totalCarambolesPlayer1 = sumOfScores(
        $gameStore.player1.carambolesMade
      );
      const carambolesLeftPlayer1 =  $gameStore.player1.carambolesToMake - totalCarambolesPlayer1;
      const totalCarambolesPlayer2 = sumOfScores(
        $gameStore.player2.carambolesMade
      );
      const carambolesLeftPlayer2 =  $gameStore.player2.carambolesToMake - totalCarambolesPlayer2;
      const carambolesLeftCurrentPlayer = $gameStore.currentPlayer === Players.Player1 ? carambolesLeftPlayer1 : carambolesLeftPlayer2;

      return {
        ...$gameStore,
        carambolesLeftCurrentPlayer,
        player1: {
          ...$gameStore.player1,
          averageCaramboles: averageScore($gameStore.player1.carambolesMade),
          carambolesLeft: carambolesLeftPlayer1,
          highestSerie: maxScore($gameStore.player1.carambolesMade),
          numberOfPoedels: numberOfZeroScores($gameStore.player1.carambolesMade ),
          totalCaramboles: totalCarambolesPlayer1,
        },
        player2: {
          ...$gameStore.player2,
          averageCaramboles: averageScore($gameStore.player2.carambolesMade),
          carambolesLeft: carambolesLeftPlayer2,
          highestSerie: maxScore($gameStore.player2.carambolesMade),
          numberOfPoedels: numberOfZeroScores($gameStore.player2.carambolesMade),
          totalCaramboles: totalCarambolesPlayer2,
        },
      };
    }
  );

  const { update } = gameStore;
  const { subscribe } = derivedStore;

  return {
    subscribe,
    initializeGame: (player1: Partial<Player>, player2: Partial<Player>) => update(reduceInitializeGame(player1, player2)),
    newGame: () => update(reduceNewGame()),
    enterScore: (score: number) => update(reduceScore(score)),
  };
}

export const gameStore = createGameStore();
