<script setup lang='ts'>
import { ref } from "vue";
const count = ref(0);

function addCount() {
    count.value++;
}

</script>
<template>
    <p>{{ count }}</p>
    <button @click="addCount">+</button>
</template>
<style scoped></style>