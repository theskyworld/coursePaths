<template>
  <div class="container">
    <!-- 模板语法 -->
    <div>{{ name.toUpperCase() }}</div>
    <div>{{ num + 1 }}</div>
    <div>{{ ok ? "YES" : "NO" }}</div>
    <div>{{ message.split("").reverse().join("") }}</div>
    <div :id="`list-${id}`"></div>
    <p v-html="rawHtml"></p>
    <p v-bind:class="className">{{ name }}</p>
    <p v-bind:class="null">{{ name }}</p>
    <p v-bind="objectOfAttrs">objectOfAttrs</p>
    <!-- 解析后为<p id="container" class="wrapper">objectOfAttrs</p> -->

    <button v-on:click="sayHello()">click</button>
    <!-- 简写 -->
    <button @click="sayHello()">click</button>

    <p v-bind:[attributeName]="attributeValue">dynamic argument</p>
    <!-- 简写 -->
    <p :[attributeName]="attributeValue">dynamic argument</p>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const name = ref("hello");
const className = "noraml";
const rawHtml = '<span style="color: red">This should be red.</span>';
const objectOfAttrs = {
  id: "container",
  class: "wrapper",
};
const num = ref(1);
const ok = ref(true);
const message = ref("text");
const id = ref(2);
const sayHello = () => console.log("hello");

const attributeName = "class";
const attributeValue = "danger";
</script>
<style scoped></style>
