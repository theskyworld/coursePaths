<script setup lang='ts'>
import { ref } from "vue";
const message = ref("hello");

</script>
<template>
    <p>message : {{ message }}</p>
    <input type="text" v-model="message">
</template>
<style scoped></style>