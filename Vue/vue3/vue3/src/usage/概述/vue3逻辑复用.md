## vue3 逻辑复用

### 组合式函数

组合式函数是指使用 vue3 中的组合式 API 语法，来封装和复用组件中有状态(里面的数据会随着函数的使用而更改)逻辑的函数

例如，创建一个跟随鼠标坐标变化的组合式函数

```ts
// useMouse.ts
// 鼠标追踪器组合式函数
import { ref, onMounted, onUnmounted } from "vue";
import useEventListener from "./useEventListener";

function useMouse() {
  const x = ref(0);
  const y = ref(0);

  // 跟随鼠标的移动更新坐标
  function updatePosition(e: any) {
    x.value = e.pageX;
    y.value = e.pageY;
  }

  // 挂载和卸载mousemove事件
  //   onMounted(() => window.addEventListener("mousemove", updatePosition));
  //   onUnmounted(() => window.removeEventListener("mousemove", updatePosition));
  // 或者
  useEventListener(window, "mousemove", updatePosition);

  return { x, y };
}

export default useMouse;
```

在组件中使用

```vue
<template>
  <div>
    <!-- 使用组合式函数 -->
    <p>position : {{ x }}-{{ y }}</p>
  </div>
</template>
<script setup lang="ts">
import useMouse from "../uses/useMouse";

const { x, y } = useMouse();
</script>
<style scoped></style>
```

#### 相较于 Mixin

主要在于 Mixin 存在三个主要缺点:

- 不清晰的数据来源。当使用的 mixin 数量较多时，组件实例上的数据属性来源于那个 mixin 变得不清晰，难以追溯 mixin 的实现逻辑和理解组件的使用行为。在组合式函数中使用 ref + 对象解构的模式
- 命名空间冲突。多个 mixin 一起使用可能出现命名空间冲突的问题。使用组合式函数在解构对象时可以使用重命名避免该问题
- 隐式的跨 mixin 交流。多个 mixin 依赖于同一个或多个共享的属性名时，将导致 mixin 之间进行耦合

#### VueUse

一个 [Vue 组合式函数集合库](https://vueuse.org/)


