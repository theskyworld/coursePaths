<template>
    <div>
        <!-- 透传属性 -->
        <!-- 根元素 -->
        <!-- 在父组件中添加的属性例如class style id会被自动添加到该根元素上 -->
        <!-- 最后的结果为该div元素添加了一个class='large' -->
        <div>
            <!-- 透传事件，该click事件及对应的事件监听器将透传至子组件CustomButton的根元素上 -->
            <CustomButton class="foo-bar" @click="logHello"></CustomButton>
        </div>
    </div>
</template>
<script setup lang='ts'>
import CustomButton from '../components/CustomButton.vue';

const logHello = () => console.log("hello")
</script>
<style scoped></style>