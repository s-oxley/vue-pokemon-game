<template>
  <section
    v-if="isLoading || randomPokemon.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando Pokémons</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5 text-3xl">¿Quién es este Pokémon?</h1>

    <div class="h-20">
      <button
        v-if="gameStatus !== GameStatus.Playing"
        @click="getNextRound(5)"
        class="bg-blue-500 text-white text-lg font-bold m-8 p-4 rounded-md hover:bg-blue-700 transition-all"
      >
        ¿Jugar de nuevo?
      </button>
    </div>

    <!-- Pokemon Picture -->
    <PokemonPicture
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />

    <!-- Pokemon Options -->
    <PokemonOptions
      :options="options"
      :block-selection="gameStatus !== GameStatus.Playing"
      :correct-answer="randomPokemon.id"
      @selected-option="checkAnswer"
    />

    <!-- Pokemon Scores -->
    <PokemonScore :won="wonGames" :lost="lostGames" @reset-game="resetTheGame" />
  </section>
</template>

<script setup lang="ts">
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import PokemonScore from '../components/PokemonScore.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const {
  randomPokemon,
  isLoading,
  gameStatus,
  pokemonOptions: options,
  wonGames,
  lostGames,
  checkAnswer,
  getNextRound,
  resetTheGame,
} = usePokemonGame();
</script>
