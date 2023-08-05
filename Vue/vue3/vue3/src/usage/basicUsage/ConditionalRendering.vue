<template>
    <div>
        <!-- 条件渲染 -->
        <!-- v-if -->
        <!-- 控制元素的是否渲染 -->
        <p v-if="isRender">someText</p>
        <button @click="isRender = !isRender">toggleIsRender</button>

        <!-- v-else -->
        <!-- 控制渲染元素的替代品 -->
        <p v-if="isWonderful">wonderful!</p>
        <p v-else>Opps!</p>
        <button @click="isWonderful = !isWonderful">toogleIsWonderful</button>

        <!-- v-else-if -->
        <!-- 控制渲染哪个元素 -->
        <p v-if="name === 'Alice1'">Alice1</p>
        <p v-else-if="name === 'Alice2'">Alice2</p>
        <p v-else-if="name === 'Alice3'">Alice3</p>
        <button @click="switchName">switchName</button>

        <!-- 通过添加在template元素上来控制多个元素的条件渲染 -->
        <template v-if="isWonderful">
            <p>wonderful!1</p>
            <p>wonderful!2</p>
            <p>hello</p>
            <button disabled>button</button>
        </template>
        <p v-else>Opps!</p>


        <!-- v-show -->
        <p v-show="isShow">vShow</p>
        <button @click="isShow = !isShow">toogleIsShow</button>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
// v-if惰性渲染，初始条件为false,则不做任何事情
const isRender = ref(false);
const isWonderful = ref(true);

const names = ['Alice1', 'Alice2', 'Alice3'];
let name = ref('Alice1');
const switchName = () => {
    name.value = names[Math.floor(Math.random() * 3)];
}


// v-show
const isShow = ref(false);

</script>
<style scoped></style>