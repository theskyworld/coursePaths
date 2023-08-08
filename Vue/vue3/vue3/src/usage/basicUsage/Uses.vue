<template>
    <div>
        <!-- 使用组合式函数 -->
        <p>position : {{ x }}-{{ y }}</p>
    </div>
</template>
<script setup lang='ts'>
import useMouse from "../uses/useMouse";

const { x, y } = useMouse();
</script>
<style scoped></style>