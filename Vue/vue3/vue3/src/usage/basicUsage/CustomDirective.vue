<template>
    <div>
        <!-- 自定义指令 -->
        <!-- 使用vFocus自定义指令 -->
        <input type="text" v-focus>
    </div>
</template>
<script setup lang='ts'>
import { onMounted } from 'vue';
import CustomInput from '../components/CustomInput.vue';

// 创建一个vFocus自定义指令
const autoFocus = (el) => el.focus();
const vFocus = {
    // mounted: (el) => el.focus(),
    // 或者
    mounted: autoFocus,
    // 等价于
    // 使用指令钩子
    // mounted(el) {
    //     autoFocus(el);
    // }
}

</script>
<style scoped></style>