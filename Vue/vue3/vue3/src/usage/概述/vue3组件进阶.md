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

### 组件属性传值

vue 中可以通过组件来将父组件中的数据传递给子组件

使用时先通过`defineProps`宏函数来声明所需要传递的数据

#### 声明属性

```vue
<template>
  <div>
    <!-- 组件属性传值 -->
  </div>
</template>
<script setup lang="ts">
// 声明所需要传递的属性
const props = defineProps(["prop1", "prop2"]);

// 或者使用一个对象，能够对传递的属性进行配置
const props = defineProps({
  prop1: {
    type: String, // 类型
    required: true, // 是否必须传递
  },
  prop2: Number,
});

// 或者使用TS类型
interface Props {
  // 声明要传递的属性名及其类型
  num: number;
  str: string;
}
const props = defineProps<Props>();
</script>
<style scoped></style>
```

#### 传递属性

```vue
<template>
  <!-- 通过组件进行数据传递 -->
  <Props prop1="prop1Value" prop2="prop2Value"></Props>
</template>
```

#### 使用属性

```ts
// 传递之后，可以通过defineProps的返回值来访问传递的属性
console.log(props.prop1, props.prop2); // "prop1Value" "prop2Value"
```

```vue
<template>
  <div>
    <!-- 组件属性传值 -->
    <p>{{ prop1 }}</p>
    <p>{{ prop2 }}</p>
  </div>
</template>
```

#### props 规范

##### props 名字格式

如果传递的 prop 名字由两个或以上的单词组成，应当使用 camelCase 形式

```vue
<template>
  <span>{{ greetingMessage }}</span>
</template>
<script setup>
defineProps({
  greetingMessage: String,
});
</script>
```

```vue
<template>
  <MyComponent greeting-message="hello" />
</template>
```

##### 传递不同类型的值

```vue
<template>
  <!-- String -->
  <BlogPost msg="hello" />
  <BlogPost :msg="message" />

  <!-- Number -->
  <BlogPost :likes="42" />
  <BlogPost :likes="post.likes" />

  <!-- Boolean -->
  <BlogPost is-published />
  <BlogPost :is-published="false" />
  <!-- 或者 -->
  <BlogPost/>
  <BlogPost :is-published="post.isPublished" />
  <!-- 对应的prop声明为defineProps({is-published : Boolean}) -->

  <!-- Array -->
  <BlogPost :comment-ids="[234, 266, 273]" />
  <BlogPost :comment-ids="post.commentIds" />

  <!-- Object -->

  <BlogPost
    :author="{
      name: 'Veronica',
      company: 'Veridian Dynamics',
    }"
  />
  <BlogPost :author="post.author" />
</template>
```

##### 传递多个 props

想要传递多个 props 时，可以选择将 props 放在一个对象中，而不是分开进行传递

```vue
<template>
  <BlogPost v-bind="post" />
  <!-- 等价于 -->
  <BlogPost :id="post.id" :title="post.title" />
</template>
<script setup>
const post = {
  id: 1,
  title: "My Journey with Vue",
};
</script>
```

##### 单向数据流

prop 用于将数据从父组件从子组件中进行传递，不能反过来传递

并且传递的 props 在子组件中是只读的，不可进行修改

```vue
<template>
  <div>
    <!-- 组件属性传值 -->
    <p>{{ name }}</p>
    <p>{{ age }}</p>
    <p>{{ doubleAge }}</p>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(["name", "age"]);
// props.name = ' Alice2'; // 报错

// 如果想要获取修改后的值，可以使用计算属性完成
const doubleAge = computed(() => props.age * 2);
</script>
<style scoped></style>
```

```vue
<template>
  <div class="container">
    <!-- 通过组件进行数据传递 -->
    <Props v-bind="propsToProps"></Props>
  </div>
</template>
<script setup lang="ts">
import Props from "./usage/basicUsage/Props.vue";

const propsToProps = reactive({
  name: "Alice",
  age: 12,
});
</script>
<style scoped></style>
```

#### prop 校验

```ts
defineProps({
  // 基础类型校验
  // 如果值为null或者undefined，则会跳过类型检查
  propA: Number,
  // 多种类型可能
  propB: [String, Number],
  // 必传
  propC: {
    type: String,
    required: true,
  },
  // 提供默认值
  propD: {
    type: Number,
    default: 100,
  },
  // 或者
  propE: {
    type: Object,
    default(rawProps) {
      return {
        message: "hello",
      };
    },
  },
  // 自定义校验类型
  propF: {
    validator(value) {
      // 要求传递的值必须为以下值之一
      return ["succes", "warning", "danger"].includes(value);
    },
  },
  // 类型为函数，且提供其默认值
  propG: {
    type: Function,
    // 默认函数
    default() {
      return "default function";
    },
  },
});
```
`type`的值可以为以下值之一
- `String`
- `Number`
- `Boolean`
- `Array`
- `Object`
- `Date`
- `Function`
- `Symbol`
- 自定义以类或者构造函数