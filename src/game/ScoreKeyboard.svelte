<script lang="ts">
    import Button from "../UI/Button.svelte";
    import { gameStore} from './game.store';

    export let carambolesLeft: number;

    function submitScore(score:number) {
       gameStore.enterScore(score);
    }
  </script>

<div class="grid grid-cols-20 gap-2 text-xs">
    {#each Array.from(Array(carambolesLeft + 1).keys()) as score} 
    <Button type="button" on:click={() => submitScore(score)}>{score}</Button>  
 {/each}  
</div>