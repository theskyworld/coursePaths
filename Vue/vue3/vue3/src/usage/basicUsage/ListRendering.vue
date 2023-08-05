<template>
    <div>
        <!-- 列表渲染 -->
        <!-- 基于数组 -->
        <div>
            <ul>
                <li v-for="name in names" :key="name">{{ name }}</li>
                <!-- 也可以使用...of... -->
                <li v-for="name of names" :key="name">{{ name }}</li>
            </ul>
        </div>
        <div>
            <p v-for="(user, index) in users" :key="user.id">
                <span>{{ index }}-</span>
                <span>userName : {{ user.name }}-</span>
                <span>userAge : {{ user.age }}</span>
            </p>
            <!-- 使用对象的解构语法 -->
            <p v-for="({ id, name, age }, index) in users" :key="id">
                <span>{{ index }}-</span>
                <span>userName : {{ name }}-</span>
                <span>userAge : {{ age }}</span>
            </p>
        </div>

        <!-- 基于对象 -->
        <div>
            <!-- 第一个为值,第二个为键,第三个为索引 -->
            <p v-for="(value, key, index) in obj" :key="index">
                <span>{{ index }}-{{ key }}:{{ value }}</span>
            </p>
        </div>

        <!-- 基于范围数值 -->
        <div>
            <!-- 将以下内容渲染五遍 -->
            <!-- n从1开始 -->
            <p v-for="n in 5" :key="n"> wonderful!</p>
        </div>

        <!-- 在template上使用 -->
        <div>
            <template v-for="{ id, name, age } in users" :key="id">
                <ul>
                    <li>{{ name }}</li>
                    <li>{{ age }}</li>
                </ul>
                <p>{{ name }}-{{ age }}</p>
            </template>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { reactive, ref } from 'vue';
const names = ref(["Alice1", 'Alice2', 'Alice3']);

const users = ref([{
    id: 1,
    name: 'Alice1',
    age: 12
}, {
    id: 2,
    name: 'Alice2',
    age: 13
}, {
    id: 3,
    name: 'Alice3',
    age: 14
}])

const obj = reactive({
    title: 'How to do lists in Vue',
    author: 'Jane Doe',
    publishedAt: '2016-04-10'
})
</script>
<style scoped></style>