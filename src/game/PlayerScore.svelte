<script lang="typescript">
    import type { DerivedPlayer, Players } from './game';

    export let currentPlayer: Players;
    export let player: DerivedPlayer;
</script>

<style lang="scss">
    .score-cell {
        @apply bg-yellow-200 flex rounded-full flex-col items-center justify-center;
    }
</style>

<article 
  class:bg-opacity-50="{currentPlayer !== player.player}"
  class="shadow-2xl overflow-hidden bg-green-500 rounded-3xl grid grid-rows-4 grid-cols-4 overflow-hidden relative">

  <div class="score-cell h-56 w-56 row-start-2 col-start-2 col-span-2 row-span-2">
    <span>{player.name}</span>
    <span class="font-extrabold text-xl">{player.totalCaramboles} / {player.carambolesToMake}</span>
  </div>

  {#if player.carambolesLeft === 0}
    <div class="row-start-1 col-start-2 col-span-2 p-4 flex justify-center">
      <img src="images/finish-line-flag.svg" class="w-14 h-14" />
    </div>
  {/if}
  
  <div class="score-cell h-28 w-28 row-start-1 col-start-1 absolute top-8 left-20">
      <span>Resterend</span>
      <span class="font-extrabold text-xl">{player.carambolesLeft}</span>
  </div>
  <div class="score-cell h-28 w-28 row-start-1 col-start-4 absolute top-8 md:right-16 3xl:right-24">
      <span>Gemiddeld</span>
      <span class="font-extrabold text-xl">{player.averageCaramboles.toFixed(2)}</span>
  </div>
  <div class="score-cell h-28 w-28 row-start-4 col-start-1 absolute bottom-8 left-20">
      <span>Max</span>
      <span class="font-extrabold text-xl">{player.highestSerie}</span>
  </div>
  <div class="score-cell h-28 w-28 row-start-4 col-start-4 absolute bottom-8 md:right-16 3xl:right-24">
    <span>Poedels</span>
    <span class="font-extrabold text-xl">{player.numberOfPoedels}</span>
  </div>
</article>    