<script setup lang='ts'>

defineProps(['appear'])


function onEnter(el) {
    el.style.animation = 't-in 0.5s';
}

function onLeave(el) {
    el.style.animation = 't-in 0.5s';
}

</script>
<template>
    <Transition name="t" @enter="onEnter" @leave="onLeave" :appear="appear">
        <slot></slot>
    </Transition>
</template>
<style>
/* 因为动画的样式不是作用域当前组件内的元素,所以不用添加scoped */
@keyframes t-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.25);
    }

    100% {
        transform: scale(1);
    }
}
</style>