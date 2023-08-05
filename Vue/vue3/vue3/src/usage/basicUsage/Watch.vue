<template>
    <div>
        <!-- 侦听器 -->
        <!-- 点击按钮,获取github上user的随机图片 -->
        <button @click="uid = getRandomId()">change</button>
        <!-- <img :src="targetAvatar" alt=""> -->
        <p>{{ data1 }}</p>
        <p>{{ data2 }}</p>
    </div>
</template>
<script setup lang='ts'>
import { ref, useAttrs, watch, computed, watchEffect } from 'vue';
import axios from 'axios';

interface Data {
    id: number;
    avatar_url: string;
    [key: string]: any;
};
// 用户id,点击change按钮后随机切换
const uid = ref(1);
// 根据uid获取的对应user
let targetUser = ref<Data>();
// user的图像链接
const targetAvatar = computed(() => targetUser.value?.avatar_url);

const getRandomId = () => Math.floor(Math.random() * 30 + 1);
// 侦听uid属性,每次变化时执行对应的回调函数
watch(uid, async () => {
    await axios.get('https://api.github.com/users').then(value => {
        const datas = value.data.splice(0, 30);
        targetUser.value = datas.find((data: Data) => data.id === uid.value)
    });
});

// watchEffect
const todoId = ref(1);
const data1 = ref(null);
const data2 = ref(null);
watch(todoId, async () => {
    await axios.get(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`).then(value => {
        data1.value = value.data;
    })
}, { immediate: true })
// 使用`watchEffect`对以上情况进行简化
watchEffect(async () => {
    await axios.get(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`).then(value => {
        data2.value = value.data;
    })
})
</script>
<style scoped></style>