<script lang="typescript">
  import { createEventDispatcher } from 'svelte';
  import { isEmpty, isPositiveNumber } from '../helpers/validation';
  import Modal from "../UI/Modal.svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import { gameStore} from './game.store';
  import type { Player } from './game';

  let player1Name: string = '';
  let player1Caramboles: number = 0;
  let player2Name: string = '';
  let player2Caramboles: number = 0;

  const dispatch = createEventDispatcher();

  $: player1NameValid = !isEmpty(player1Name);
  $: player1CarambolesValid = isPositiveNumber(player1Caramboles);
  $: player2NameValid = !isEmpty(player2Name);
  $: player2CarambolesValid = isPositiveNumber(player2Caramboles);

  $: formIsValid = player1NameValid && player1CarambolesValid && player2NameValid && player2CarambolesValid;

  function submitForm() {
     const player1: Partial<Player> = { name: player1Name, carambolesToMake: player1Caramboles };
     const player2: Partial<Player> = { name: player2Name, carambolesToMake: player2Caramboles };
     gameStore.initializeGame(player1, player2);
  }

  function cancel() {
    dispatch("cancel");
  }
</script>

<Modal title="Stel spelers in" on:cancel>
  <form on:submit={submitForm}>
    <TextInput
      id="player1Name"
      label="Naam Speler 1"
      valid={player1NameValid}
      validityMessage="Naam van speler 1 mag niet leeg zijn "
      value={player1Name}
      on:input={event => (player1Name = event.target.value)} />
    <TextInput
      id="player1Caramboles"
      label="Te maken Caramboles Speler 1"
      type="number"
      valid={player1CarambolesValid}
      validityMessage="Het aantal te maken caramboles moet een positief getal zijn "
      value={player1Caramboles}
      on:input={event => (player1Caramboles = parseInt(event.target.value, 10))} />  
      <TextInput
      id="player2Name"
      label="Naam Speler 2"
      valid={player2NameValid}
      validityMessage="Naam van speler 2 mag niet leeg zijn "
      value={player2Name}
      on:input={event => (player2Name = event.target.value)} />
    <TextInput
      id="player2Caramboles"
      label="Te maken Caramboles Speler 2"
      type="number"
      valid={player2CarambolesValid}
      validityMessage="Het aantal te maken caramboles moet een positief getal zijn "
      value={player2Caramboles}
      on:input={event => (player2Caramboles = parseInt(event.target.value, 10))} />
  </form>
  <div slot="footer">
    <Button type="button" on:click={submitForm} disabled={!formIsValid}>
      Start Spel
    </Button>
  </div>
</Modal>