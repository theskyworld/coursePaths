<template>
  <div class="container">
    <!-- <TemplateSyntax></TemplateSyntax> -->
    <!-- <ReactivityBasic></ReactivityBasic> -->
    <!-- <Computed></Computed> -->
    <!-- 类名的透传 -->
    <!-- <ClassAndStyleBound class="active text-danger"></ClassAndStyleBound> -->
    <!-- <ConditionalRendering></ConditionalRendering> -->
    <!-- <ListRendering></ListRendering> -->
    <!-- 组件的列表渲染 -->
    <!-- 将以下组件渲染三遍 -->
    <!-- <ListRendering v-for="n in 3" :key="n"></ListRendering> -->
    <!-- 还可以通过列表渲染来进行属性的传值 -->
    <!-- <form @submit.prevent="addNewTodo">
      <label for="new-todo">Add a todo</label>
      <input type="text" id="new-todo" v-model="newTodoTitle" placeholder="E.g. Feed the cat">
      <button>Add</button>
    </form>
    <ul>
      <TodoListItem v-for="({ id, title }, index) in todos" :key="id" :title="title" @remove="todos.splice(index, 1)">
      </TodoListItem>
    </ul> -->

    <!-- <EventHandle></EventHandle> -->
    <!-- <FormInputBinding></FormInputBinding> -->
    <Watch></Watch>
  </div>
</template>
<script setup lang="ts">
import TemplateSyntax from "./usage/basicUsage/TemplateSyntax.vue";
import ReactivityBasic from "./usage/basicUsage/ReactivityBasic.vue";
import Computed from "./usage/basicUsage/Computed.vue";
import ClassAndStyleBound from "./usage/basicUsage/ClassAndStyleBound.vue";
import ConditionalRendering from "./usage/basicUsage/ConditionalRendering.vue";
import ListRendering from "./usage/basicUsage/ListRendering.vue";
import TodoListItem from "./usage/components/TodoListItem.vue";
import EventHandle from "./usage/basicUsage/EventHandle.vue";

import FormInputBinding from "./usage/basicUsage/FormInputBinding.vue";
import Watch from "./usage/basicUsage/Watch.vue";
import { reactive, ref } from "vue";
// 初始渲染的todos
const todos = ref([
  {
    id: 1,
    title: 'Do the dishes'
  },
  {
    id: 2,
    title: 'Take out the trash'
  },
  {
    id: 3,
    title: 'Mow the lawn'
  }
]);
// 要添加的todo
const newTodoTitle = ref('');
let newTodoId = 4;
const addNewTodo = () => {
  todos.value.push({
    id: newTodoId++,
    title: newTodoTitle.value,
  });
  newTodoTitle.value = '';
}

const user = reactive({
  uname: 'Alice',
  uage: 12,
  ugender: 'female',
})
</script>
<style scoped></style>
