<template>
    <div>
        <!-- 依赖注入和提供 -->
        <!-- 父组件 -->
        <AnotherComponent></AnotherComponent>
    </div>
</template>
<script setup lang='ts'>
import { inject, provide, ref } from 'vue';
import { messageInjectionKey } from '../../symbols';
import AnotherComponent from "../components/AnotherComponent.vue"

const msg = ref("hello");
// 提供依赖
// 第一个参数为依赖注入名，第二个参数为依赖注入值
// provide("message", msg);
// 为避免命名冲突问题，建议使用symbol作为键名
provide(messageInjectionKey, msg);
</script>
<style scoped></style>