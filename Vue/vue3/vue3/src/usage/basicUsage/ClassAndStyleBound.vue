<template>
    <div class='container'>
        <!-- 类和样式绑定 -->
        <!-- 绑定class -->

        <!-- 点击按钮，通过添加或移除active类名实现button元素样式的动态切换 -->
        <div><button @click="change">change</button></div>
        <!-- 通过isActive的真假值来决定是否为以下DOM元素添加active类名 -->
        <div><button @click="isActive = !isActive" :class="{ active: isActive }">click</button></div>
        <div :class="{ active: isActive, 'text-danger': hasError }">some text</div>
        <div :class="dynamicClassObj">some text</div>
    </div>
</template>
<script setup lang='ts'>
import { ref, reactive } from 'vue';
// 添加active类名
const isActive = ref(true);
// const isActive = ref("someWhateverContent");
// const isActive = ref(Symbol(''));

// 不添加active类名
// const isActive = ref('');
// const isActive = ref(null);
// const isActive = ref(undefined);

const hasError = ref(false);


// 切换样式
const change = () => {
    isActive.value = !isActive.value;
    hasError.value = !hasError.value;
}

const dynamicClassObj = reactive({ active: isActive, "text-danger": hasError });
</script>
<style scoped>
div {
    margin: 10px 0;
}

.active {
    border: solid 1px red;
}

.text-danger {
    color: green;
}
</style>

