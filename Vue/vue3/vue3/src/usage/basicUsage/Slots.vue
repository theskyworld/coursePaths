<template>
    <div>
        <!-- 插槽 -->
        <h3>Slot</h3>
        <!-- <ChildComponent> -->
        <!-- 插槽内容 -->
        <!-- <span>slot content</span>
            <p>hello</p> -->

        <!-- 具名插槽的插槽内容 -->
        <!-- <template v-slot="header">
                <p>header hello</p>
            </template> -->
        <!-- <template #header>
                <p>header hello</p>
            </template>
            <template #main>
                <p>main hello</p>
            </template>
            <template #footer>
                <p>footer hello</p>
            </template>
            <template #sideBar>
                <p>sideBar hello</p>
            </template> -->

        <!-- 作用域插槽 -->
        <!-- <template #header="{msg}">
                <p>header hello</p>
                <p>{{ msg }}</p>
            </template>
            <template #main="{unames}">
                <p>main hello</p>
                <p>{{ unames }}</p>
            </template>
            <template #footer="{msg}">
                <p>footer hello</p>
                <p>{{ msg }}</p>
            </template>
            <template #sideBar="{msg}">
                <p>sideBar hello</p>
                <p>sideBar hello</p>
            </template> -->
        <!-- </ChildComponent> -->

        <!-- 案例 -->
        <FancyList api-url="" :per-page="10" #item="{ body, username, likes }">
            <!-- 指定子组件中与item一起进行列表渲染的内容 -->
            <div class="item">
                <p>{{ body }}</p>
                <p class="meta"> by {{ username }} | {{ likes }} likes</p>
            </div>
        </FancyList>
    </div>
</template>
<script setup lang='ts'>
import ChildComponent from '../components/ChildComponent.vue';
import FancyList from '../components/FancyList.vue';
</script>
<style scoped>
.item p {
    color: black;
}

.item .meta {
    font-size: 0.8em;
    color: #42b883;
}
</style>