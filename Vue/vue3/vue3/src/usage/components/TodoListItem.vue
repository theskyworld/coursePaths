<template>
    <div>
        <li>
            {{ title }}
            <button @click="$emit('remove')">remove</button>
        </li>
    </div>
</template>
<script setup lang='ts'>
defineProps(['title']);
defineEmits(['remove']);
</script>
<style scoped></style>