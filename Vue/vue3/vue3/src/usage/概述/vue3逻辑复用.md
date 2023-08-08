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

### 自定义指令

vue 中实现逻辑复用，重用代码的已有方式存在组件和组合式函数两种

同时，当为了重用涉及普通元素的底层 DOM 访问逻辑时，可以使用自定义指定

```vue
<template>
  <div>
    <!-- 自定义指令 -->
    <!-- 使用vFocus自定义指令 -->
    <input type="text" v-focus />
  </div>
</template>
<script setup lang="ts">
import CustomInput from "../components/CustomInput.vue";

// 创建一个vFocus自定义指令
const autoFocus = (el) => el.focus();
const vFocus = {
  // mounted: (el) => el.focus(),
  // 或者
  mounted: autoFocus,
  // 等价于
  // 使用指令钩子
  // mounted(el) {
  //     autoFocus(el);
  // }
};
</script>
<style scoped></style>
```

注册一个全局的自定义指令

```ts
const app = createApp(App);

// 使 v-focus 在所有组件中都可用
app.directive("focus", {
  /* ... */
});
```

#### 指令钩子

一个自定义指令的主要实现逻辑是在组件的不同生命周期添加对应的回调函数，在到达该生命周期时对该回调函数进行调用

因此，包含以下对应的指令钩子，在不同的时机进行调用

```ts
const vFocus = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {},
};
```

- `el` : 指令被绑定到的那个元素，可直接操作对应的 DOM 元素
- `binding` : 一个包含以下属性的对象

  - `value` : 传递给指令的值。例如`v-focus='2'`，则`value`的值为`2`
  - `oldValue` : 组件更新之前的值，仅在`beforeUpdate`和`updated`中可用
  - `arg` : 传递给指令的参数。例如`v-focus:foo`中，`arg`的值为`foo`
  - `modifiers`: 一个包含所有使用的修饰符的对象。例如`v-focus.foo.bar`中，`modifiers`的值为`{foo : true, bar : true}`
  - `instance`: 当前使用该指令的组件实例
  - `dir` : 指令的定义对象

- `vnode`:被绑定元素的底层 vnode

- `prevNode` : 组件更新之前被绑定元素的底层 vnode，仅在`beforeUpdate`和`updated`中可用

如果仅需要使用`mounted`和`updated`钩子，可以使用以下的形式

```vue
<template>
  <div v-color="color"></div>
</template>
```

```ts
// main.ts
app.directive("color", (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value;
});
```

#### 组件上使用

当在组件上使用自定义指令时，它会始终应用于组件的根节点元素，和透传类似

但是当应用到一个多根元素的组件时，指令将会被忽略且抛出一个警告。指令不能通过`v-bind="$attrs"`来传递给一个指定的元素

总的来说，不推荐在组件上使用自定义指令

### 插件

通过插件能够为 vue 提供全局使用的功能，因为它通过`app`进行全局注册

一个插件，可以是一个函数，或者一个包含`install`方法的对象

创建一个插件

```ts
// plugins\i18n.ts
// 用于在用户提供的字典中查找指定字符的对应语言翻译后的文本
// plugins/i18n.js
export default {
  install: (app, options) => {
    // 注入一个全局可用的 $translate() 方法
    app.config.globalProperties.$translate = (key) => {
      // 获取 `options` 对象的深层属性
      // 使用 `key` 作为索引
      return key.split(".").reduce((o, i) => {
        if (o) return o[i];
      }, options);
    };
  },
};
```

注册一个插件

```ts
// main.ts
import i18nPlugin from "./plugins/i18n";

// 第一个参数为要注册的插件名，第二个参数为可选的对象
// 第二个参数为例如用户提供的简单版本的字典，对于greetings.hello字符，其翻译后的文本为Bonjour!
app.use(i18nPlugin, {
  greetings: {
    hello: "Bonjour!",
  },
});
```

使用插件

```vue
<template>
  <h1>{{ $translate("greetings.hello") }}</h1>
  <!-- {{ $translate('greetings.hello') }}会被替换为Bonjour! -->
</template>
```

或者一个插件也可以通过 provide/inject 的方式进行提供和注入使用

```ts
// plugins/i18n.js
export default {
  install: (app, options) => {
    app.config.globalProperties.$translate = (key) => {
      return key.split(".").reduce((o, i) => {
        if (o) return o[i];
      }, options);
    };

    // 提供插件
    app.provide("i18n", options);
  },
};
```

```vue
<script setup>
import { inject } from "vue";

// 注入插件使用
const i18n = inject("i18n");

console.log(i18n.greetings.hello);
</script>
```
