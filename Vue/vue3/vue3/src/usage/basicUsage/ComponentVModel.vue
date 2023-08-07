<template>
    <div>
        <!-- <p>{{ searchText }}</p> -->
        <p>{{ lastName }}-{{ firstName }}</p>
        <!-- <CustomInput @update:modelValue="newValue => searchText = newValue" :model-value="searchText" type="text" 
            label="name"/>-->
        <!-- 或者 -->
        <!-- <CustomInput v-model="searchText" type="text" label="name"/> -->

        <!-- 自定义参数 -->
        <!-- <CustomInput v-model:title="searchText" type="text" label="title" /> -->

        <!-- 多个组件v-model -->
        <CustomInput v-model:firstName.capitalize="firstName" v-model:lastName="lastName" type="text" label1="firstName"
            label2="lastName" />
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
import CustomInput from '../components/CustomInput.vue';

const searchText = ref('');

const firstName = ref('');
const lastName = ref('');
</script>
<style scoped></style>