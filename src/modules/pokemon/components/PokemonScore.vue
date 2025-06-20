<template>
    <section class="flex justify-center items-center">
        <div>Aciertos: {{ props.won }}</div>
        <div class="divFail">Fallos: {{ props.lost }}</div>
        <button @click="$emit('resetGame')">Reiniciar juego</button>
    </section>
</template>

<script setup lang="ts">
const props = defineProps<{
    won: number;
    lost: number;
}>();
defineEmits<{
  resetGame: [];
}>();

</script>

<style scoped>
div {
    @apply text-lg font-bold m-8 bg-green-300 p-4 rounded-lg shadow-lg;
    width: 220px;
    text-align: center;
}
.divFail {
    @apply bg-red-300;
}
button {
  @apply bg-green-500 shadow-lg rounded-lg p-4 m-8 cursor-pointer w-40 text-center text-lg font-bold transition-all hover:bg-green-400;
  width: 220px;;
}
</style>