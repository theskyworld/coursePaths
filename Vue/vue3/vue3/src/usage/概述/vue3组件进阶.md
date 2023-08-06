## vue3 组件进阶

### 定义一个组件

vue 中的组件通常是指一个脚本和模板的集合，有时包含样式，这些内容统一都放到一个.vue 文件中，这被叫做单文件组件(SFC)

```vue
<!-- 单文件组件 -->
<script setup>
import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```

以上在.vue 文件中定义的一个组件，将默认以文件名作为组件名来进行默认导出，供外部使用

如果不使用构建的方式，通过一个 JS 对象也可以定义一个 vue 组件:

```js
// 一个组件
// 默认导出以下组件
// 也可以定义多个组件之后，使用具名导出进行导出
import {ref} from 'vue';

export default {
    // 脚本
    setup() {
        const count = ref(0);
        return {
            count;
        }
    },

    // 模板
    template : `
        <button @click='count++'>
            You clicked me {{ count }} times.
        </button>
    `
    // 或者使用ID选择器获取一个template元素
    // template : '#my-template-element'
}
```

### 注册一个组件

#### 全局注册

将一个组件进行全局注册之后，将可以在任意组件中直接进行使用，无需进行本地导入

在`main.ts`文件中通过`app.component`对组件进行全局注册

该方法返回注册之后的对应组件

```ts
import { createApp } from "vue";
import App from "./App.vue";
import MyComponent from "./MyComponent.vue";

const app = createApp(App);
// 注册一个全局组件
app.component("MyComponent", MyComponent);
// 或者
app.component("MyComponent", {
  // 组件的实现
});

// 链式注册多个组件
app
  .component("ComponentA", ComponentA)
  .component("ComponentB", ComponentB)
  .component("ComponentC", ComponentC);
```

#### 局部注册

组件的全局注册将带来以下问题:

- 被全局注册但是没有被使用的组件在生产打包时无法进行自动移除(tree-shaking)
- 被全局注册的组件在被使用时依赖关系不明确，不利于组件的代码维护

因此，往往选择在一个特定的组件中对所需要的组件进行局部注册

```vue
<script setup>
// 在setup语法中，组件被导入后即代表被注册，可直接进行使用
import ComponentA from "./ComponentA.vue";
</script>

<template>
  <ComponentA />
</template>
```

否则，需要进行手动注册

```js
import ComponentA from "./ComponentA.js";

export default {
  // 注册组件
  components: {
    // ComponentA: ComponentA
    ComponentA,
  },
  setup() {
    // ...
  },
};
```
