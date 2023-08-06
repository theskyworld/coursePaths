<template>
    <div>
        <!-- 组件事件回调函数传递 -->
        <button @click="clickFn">click</button>
        <!-- 或者 -->
        <button @click="$emit('sayHello')">click</button>
    </div>
</template>
<script setup lang='ts'>
// 声明要接收的事件回调函数
// const emit = defineEmits(["sayHello"]);
const emit = defineEmits(['increaseBy'])
// // 或者
// interface Emit {
//     (e: 'sayHello'): void;
// }
// const emit = defineEmits<Emit>();
const clickFn = () => {
    // 对接收到的事件回调函数进行触发
    // emit("sayHello");
    emit('increaseBy', 1);
}
</script>
<style scoped></style>