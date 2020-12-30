<script lang="typescript">
  import Header from "./UI/Header.svelte";
  import GameGrid from "./game/GameGrid.svelte";
  import SetupGame from './game/SetupGame.svelte';
  import { GameMode } from './game/game';
  import { gameStore} from './game/game.store';
</script>

<Header />

<main class="mt-20">
  {#if GameMode.InProgress === $gameStore.gameMode || GameMode.Finished === $gameStore.gameMode}
    <GameGrid game={$gameStore}/>
  {:else}
    <SetupGame></SetupGame>
  {/if}  
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>