<script setup lang='ts'>
import { ref } from "vue";
import MyModal from './MyModal.vue';
const showModal = ref(false)

</script>
<template>
    <div class='container'>
        <!-- 开启模态-->
        <button id="show-modal" @click="showModal = true">Show Modal</button>

        <!-- 模态的展示 -->
        <!-- 通过Teleport的to属性将其传送到body元素下进行展示,以便相对于整个窗口进行固定定位 -->
        <Teleport to="body">
            <MyModal :show="showModal" @close="showModal = false">
                <template #header>
                    <h3>custom header</h3>
                </template>
            </MyModal>
        </Teleport>
    </div>
</template>
<style scoped>
.container {
    height: 1000px;
}

body {
    overflow: scroll;
}
</style>