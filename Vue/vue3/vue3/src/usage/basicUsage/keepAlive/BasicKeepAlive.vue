<script setup lang='ts'>
import { ref } from 'vue';
import ComponentA from './ComponentA.vue';
import ComponentB from './ComponentB.vue';

const currentComponent = ref(ComponentA);

function switchComponent(newComponent) {
    currentComponent.value = newComponent;
}
</script>
<template>
    <a @click="switchComponent(ComponentA)">ComponentA</a>
    <a @click="switchComponent(ComponentB)">ComponentB</a>

    <KeepAlive>
        <component :is="currentComponent"></component>
    </KeepAlive>
</template>
<style scoped></style>