<template>
    <div>
        <!-- 事件处理 -->
        <!-- 内联事件处理器 -->
        <p>{{ msg }}</p>
        <button @click="count++">{{ count }}</button>
        <button @click="increaseCount()">{{ count }}</button>
        <!-- 传递参数 -->
        <button @click="changeMsg('hi')">changeMsg</button>
        <!-- 访问事件对象event -->
        <button @click="warn('Form cannot be submitted yet', $event)"> submit</button>
        <!-- 或者 -->
        <button @click="(event) => warn('Form cannot be submitted yet', event)"> submit</button>

        <!-- 方法事件处理器 -->
        <button @click="greet">greet</button>

        <!-- 按键修饰符 -->
        <!-- 当enter按键抬起时触发logContent事件回调函数 -->
        <input @keyup.enter="logContent" v-model="content">
        <!-- 当enter按键按下时触发logContent事件回调函数,一直按下一直触发 -->
        <input @keydown.enter="logContent" v-model="content">


        <!-- 按下alt键时触发logContent事件回调函数 -->
        <input @keydown.alt='logContent' v-model="content">
        <!-- 绑定多个按键 -->
        <!-- 当alt键被按下,同时抬起enter键时触发logContent事件回调函数 -->
        <input @keyup.alt.enter='logContent' v-model="content">
        <!-- 只有按下alt的同时点击按钮时才会触发logContent事件回调函数 -->
        <button @click.alt="logContent">alt+click</button>

        <!-- 按下alt的同时点击按钮时触发,如果同时也按下了shift或者ctrl不会触发 -->
        <button @click.alt.exact="logContent">alt+click</button>
        <!-- 只有点击按钮时才触发,同时按下其它键例如alt,ctrl,shift不会触发 -->
        <button @click.exact="logContent">alt+click</button>

    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
const count = ref(0);
const msg = ref('hello');
const increaseCount = () => count.value++;
const changeMsg = (newVal: string) => msg.value = newVal;
const warn = (message: string, e: Event) => {
    if (e) {
        e.preventDefault();
    }
    alert(message);
}

const greet = (e: Event) => {
    if (e) {
        console.log((e.target as any)?.tagName); // "BUTTON"
    }
}

const content = ref('text');
const logContent = () => console.log(content.value);

</script>
<style scoped></style>

