<script setup lang='ts'>
import Home from './Home.vue'
import Post from './Post.vue'
import Archive from './Archive.vue'
import { h, ref } from 'vue'

const currentComponent = ref(Home);

function onClick(newCurrentComponent) {
    currentComponent.value = newCurrentComponent
}
</script>
<template>
    <div>
        <a @click="onClick(Home)">Home</a>
        <a @click="onClick(Post)">Post</a>
        <a @click="onClick(Archive)">Archive</a>
    </div>

    <div>
        <!-- 动态切换当时正展示的组件,为切换过程添加动画效果 -->
        <Transition appear name="slide-up">
            <component :is="currentComponent"></component>
        </Transition>
    </div>
</template>
<style scoped>
.btn-container {
    display: inline-block;
    position: relative;
    height: 1em;
}

button {
    position: absolute;
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.25s ease-out;
}

.slide-up-enter-from {
    opacity: 0;
    transform: translateY(30px);
}

.slide-up-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}
</style>