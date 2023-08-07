<template>
    <div>
        <!-- 插槽的子组件 -->
        <h4>Slot-ChildComponent</h4>
        <div>
            <!-- 插槽出口，插槽内容将在这里被渲染 -->
            <!-- <slot></slot> -->
            <!-- <slot> -->
            <!-- 插槽默认值 -->
            <!-- <p>default content of slot</p> -->
            <!-- </slot> -->


            <!-- 具名插槽 -->
            <!-- <slot name="header"></slot> -->
            <!-- <slot name="main"></slot> -->
            <!-- <slot name="footer"></slot> -->
            <!-- 动态插槽名 -->
            <!-- <slot :name="dynamicSlotName"></slot> -->


            <!-- 作用域插槽 -->
            <!-- 结合具名插槽使用 -->
            <slot name="header" msg="header-hello"></slot>
            <slot name="main" :unames="unames"></slot>
            <slot name="footer" msg="footer-hello"></slot>
            <!-- 动态插槽名 -->
            <slot :name="dynamicSlotName" msg="sideBar-hello"></slot>

        </div>


    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';

const dynamicSlotName = ref("sideBar");

const unames = ['Alice1', 'Alice2', 'Alice3']
</script>
<style scoped></style>