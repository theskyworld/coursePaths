<template>
    <div>
        <!-- 表单输入绑定 -->
        <!-- msg变量的值将跟随输入框中的文本值进行变化 -->
        <!-- 输入框中文本值也将随着msg变量值的变化而变化 -->
        <p>{{ msg }}</p>
        <input type="text" v-model="msg">
        <!-- 等价于 -->
        <input type="text" :value="msg" @input="e => msg = (e.target as any)?.value">
        <button @click="msg = 'newMsg'">changeMsg</button>

        <!-- 多行文本 -->
        <p style="white-space: pre-line;">{{ multiline }}</p>
        <textarea v-model="multiline"></textarea>

        <!-- 单一复选框 -->
        <input type="checkbox" id="checkbox" v-model="checked" />
        <label for="checkbox">{{ checked }}</label>

        <!-- 多个复选框 -->
        <div>checkedNames : {{ checkedNames }}</div>
        <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
        <label for="jack">Jack</label>
        <input type="checkbox" id="john" value="John" v-model="checkedNames">
        <label for="john">John</label>
        <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
        <label for="mike">Mike</label>


        <!-- 单选按钮 -->
        <div>picked:{{ picked }}</div>
        <input type="radio" id="one" value="One" v-model="picked">
        <label for="one">One</label>
        <input type="radio" id="two" value="Two" v-model="picked">
        <label for="two">Two</label>

        <!-- 单值选择器 -->
        <div>selected : {{ selected }}</div>
        <select v-model="selected">
            <option value="" disabled>select one</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
        </select>
        <!-- 多值选择器 -->
        <div>selected : {{ selecteds }}</div>
        <select v-model="selecteds" multiple>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
        </select>

        <!-- 动态渲染选择器的选项 -->
        <div>selectedName : {{ selectedName }}</div>
        <select v-model="selectedName">
            <option value="" disabled>select one</option>
            <option v-for="(option, index) in options" :key="option" :value="option">{{ option }}</option>
        </select>

        <!-- 动态值绑定 -->
        <div>toggle : {{ toggle }}</div>
        <!-- 默认情况下,toggle展示的值为true/false,现在通过true-valu和false-value的指定,toggle展示的值为yes/no -->
        <input type="checkbox" v-model="toggle" true-value="yes" false-value="no">
        <!-- 动态绑定 -->
        <div>dynamicToggle : {{ dynamicToggle }}</div>
        <input type="checkbox" v-model="dynamicToggle" :true-value="dynamicTrueValue" :false-value="dynamicFalseValue">
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
const msg = ref('');

const multiline = ref('');
const checked = ref(false);

const checkedNames = ref([]);
const picked = ref('');

const selected = ref('');
const selecteds = ref([]);

const selectedName = ref('');
const options = ref(["Alice1", "Alice2", "Alice3"]);

const toggle = ref("");
const dynamicToggle = ref("");
const dynamicTrueValue = 'right';
const dynamicFalseValue = 'wrong';

</script>
<style scoped></style>