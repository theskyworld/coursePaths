<template>
    <!-- 组件类名的透传，透传到该根元素上 -->
    <div>
        <!-- 类和样式绑定 -->
        <!-- 绑定class -->

        <!-- 点击按钮，通过添加或移除active类名实现button元素样式的动态切换 -->
        <div><button @click="change">change</button></div>
        <!-- 通过isActive的真假值来决定是否为以下DOM元素添加active类名 -->
        <div><button @click="isActive = !isActive" :class="{ active: isActive }">click</button></div>
        <div :class="{ active: isActive, 'text-danger': hasError }">some text</div>
        <div :class="dynamicClassObj">some text</div>

        <!-- 通过数组添加active和text-danger类 -->
        <div :class="[activeClass, errClass]">someText</div>
        <!-- 使用三元表达式控制类名的是否添加 -->
        <div :class="[isActive ? activeClass : '', errClass]">someText</div>
        <!-- 或者结合对象使用 -->
        <div :class="[{ active: isActive }, errClass]">someText</div>

        <!-- 绑定style -->
        <div :style="{ color: activeColor, 'font-size': fontSize + 'px' }">someText</div>
        <div :style="dynamicStyleObj">someText</div>

        <!-- 值为数组 -->
        <div :style="[baseStyle, colorfulStyle]">someText</div>

    </div>
    <!-- 将透传的类名添加到该根元素上 -->
    <p :class="$attrs.class">another root element</p>
</template>
<script setup lang='ts'>
import { ref, reactive } from 'vue';
// 绑定class
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


// 添加active类
const activeClass = ref("active");
// 添加text-danger类
const errClass = ref("text-danger");



// 绑定style
// 通过变量的值确定具体样式
const activeColor = ref('pink');
const fontSize = ref(30);

// 使用对象名
// 更贴近于CSS的写法
const dynamicStyleObj = reactive({
    color: 'red',
    fontSize: '25px',
})


// 值为数组
const baseStyle = reactive({
    fontSize: '30px',
});
const colorfulStyle = reactive({
    border : "solid 3px pink",
})
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

