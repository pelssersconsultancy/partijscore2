<script lang="ts">
  import type { DerivedGame } from './game';
  import {Players, GameMode } from './game';
  import { gameStore} from './game.store';
  import PlayerScore from './PlayerScore.svelte';
  import ScoreKeyboard from './ScoreKeyboard.svelte';
  import Button from '../UI/Button.svelte';

  export let game: DerivedGame;

  function newGame() {
     gameStore.newGame();
  }
</script>

<section id="player-scores" class="w-screen grid grid-cols-12">
    <div class="col-start-2 col-span-3">
        <PlayerScore
        currentPlayer={game.currentPlayer}
        player={game.player1}/>
    </div>

    {#if Players.Player1 === game.currentPlayer && GameMode.InProgress === game.gameMode}
      <div class="col-start-5 p-4">
         <img src="images/left-arrow.svg" alt="arrow left"/>
      </div>
    {/if}

    <div class="col-start-6  grid grid-rows-2 grid-cols-1 p-4">
        <div class="w-28 h-28 flex flex-col items-center justify-center bg-blue-100 rounded-full">
            <span>Ronde</span>
            <span>{game.turn}</span>
        </div>
        <div class="flex items-center justify-center">
            {#if GameMode.Finished === game.gameMode}
              <Button type="button" on:click={newGame}>Nieuw spel</Button>  
            {/if}
        </div>
    </div>  

    {#if Players.Player2 === game.currentPlayer && GameMode.InProgress === game.gameMode}
      <div class="col-start-7 p-4">
         <img src="images/right-arrow.svg" alt="arrow right"/>
      </div>
    {/if}

    <div class="col-start-8 col-span-3">
        <PlayerScore
        currentPlayer={game.currentPlayer}
        player={game.player2}/>
    </div>
</section>

<section id="score" class="w-screen grid grid-cols-12 mt-4">
  <div class="col-start-2 col-span-9">
    {#if GameMode.InProgress === game.gameMode}
    <ScoreKeyboard carambolesLeft={game.carambolesLeftCurrentPlayer}/>
    {:else}
      <div class="text-center text-5xl text-red-500">Game finished</div>
    {/if}
  </div>
</section>

<!-- 
<section id="debug"><pre> {JSON.stringify(game, undefined, 4) }</pre></section>
-->