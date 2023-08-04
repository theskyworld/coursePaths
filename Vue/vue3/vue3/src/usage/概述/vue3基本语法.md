## vue3 基本语法

### 创建应用实例

#### `createApp`创建应用

通过调用`createApp`来创建一个 vue 的应用实例

```ts
import { createApp } from "vue";
// 根组件
import App from "./App.vue";

const app = createApp({
  /* 根组件选项 */
});
// 或者
const app = createApp(App);
```

#### `mount`挂载应用

通过调用应用实例`app`的 `mount`方法来将一个创建的应用进行挂载到指定的容器上(HTML 元素)

接收一个实际的 DOM 元素或者 CSS 选择器字符串来作为参数

返回根组件实例

```html
<div id="app"></div>
```

```ts
app.mount("#app");
```

同时支持创建并挂载多个应用实例,每个实例之间相互独立

```html
<div id="app1"></div>
<div id="app2"></div>
```

```ts
import { createApp } from "vue";
// 根组件
import App from "./App.vue";

const app1 = createApp(App);
const app2 = createApp(App);

app1.mount("#app1");
app2.mount("#app2");
```

### 模板语法

一种基于 HTML 的语法,能够声明式地将组件实例的数据展现到 DOM 上,并实现响应式

在底层,vue 会将模板编译成一个优化后的 JS 代码

也可以使用[直接书写渲染函数](https://cn.vuejs.org/guide/extras/render-function.html)来替代模板语法

#### 文本插值

一种最基本的将数据绑定到 DOM 上的形式,使用双大括号语法

```vue
<span>Message: {{ msg }}</span>
```

同时支持表达式

```vue
<div>{{ name.toUpperCase() }}</div>
<div>{{ num + 1 }}</div>
<div>{{ ok ? "YES" : "NO" }}</div>
<div>{{ message.split("").reverse().join("") }}</div>
<div :id="`list-${id}`"></div>
<time :title="toTitleDate(date)" :datetime="date">
  {{ formatDate(date) }}
</time>
```

在模板内,JS 表达式可以被使用在以下场景中:

- 文本插值内
- vue 指令的值中

需要注意的时,双大括号会将其中的内容解析为**纯文本**,而不是 HTML

如果需要插入 HTML,应当使用`v-html`指令

```vue
<template>
  <div class="container">
    <p v-html="rawHtml"></p>
  </div>
</template>
<script setup lang="ts">
const rawHtml = '<span style="color: red">This should be red.</span>';
</script>
<style scoped></style>
```

#### 属性绑定

使用`v-bind`指令,将一个属性动态地绑定到 DOM 上

```vue
<!-- 表示将一个id属性绑定到了div元素上,其值为dynamicId变量的值,或者一个表达式计算后的值 -->
<div v-bind:id="dynamicId"></div>
<!-- 如果绑定的属性值为null或者undefined,表示将该属性移除 -->
<p v-bind:class="null">{{ name }}</p>
```

简写形式

```vue
<div :id="dynamicId"></div>
```

布尔值属性:

- 对于 DOM 中的布尔值属性(`disabled`,`required`,`readonly`等),在模板语法中的处理为:如果其值为一个真值或者一个空字符串,则代表 DOM 元素会包含该布尔值属性;如果其值为假值或者不存在,则代表 DOM 元素不会包含该布尔值属性
  ```vue
  <button :disabled="isButtonDisabled">Button</button>
  ```

绑定多个动态值

```vue
<template>
  <p v-bind="objectOfAttrs">objectOfAttrs</p>
  <!-- 解析后为<p id="container" class="wrapper">objectOfAttrs</p> -->
</template>
<script setup>
const objectOfAttrs = {
  id: "container",
  class: "wrapper",
};
</script>
```

#### 有限的全局对象列表

在模板使用的表达式中,能够访问到的 JS 中的全局对象是有限的,包括以下内容:

- `Infinity`,`undefined`,`NaN`,`isFinite`,`isNaN`,`parseFloat`,`parseInt`,`decodeURI`
- `decodeURIComponent`,`encodeURI`,`encodeURIComponent`,`Math`,`Number`,`Date`,`Array`
- `Object`,`Boolean`,`String`,`RegExp`,`Map`,`Set`,`JSON`,`Intl`,`BigInt`,console

对于其它不能访问到的对象,可以在`app.config.globalProperties `上进行添加,以便在所有的组件中能够直接使用

#### 指令

[vue 指令](https://cn.vuejs.org/api/built-in-directives.html)指的是一系列以`v-`作为前缀的模板中特殊属性

其值期望的是一个 JS 表达式,也即值是动态的.如果需要添加一个静态的属性值,直接添加在 DOM 元素上即可,无需通过指令添加

一个指令的作用是,在表达式的值变化时响应式地更新 DOM

```vue
<p v-if="seen">Now you see me</p>
```

`v-if`指令会基于表达式`seen`值的变化来响应式地移除或插入该`p`元素

##### 指令参数

一个指令可能会需要某个可选的参数,在指令名之后通过`:`隔开

意味着将该参数添加到当前的 DOM 元素上作为 DOM 元素的属性,属性的值为指令的表达式计算后的值

```vue
<template>
  <a v-bind:href="url"> ... </a>

  <!-- 简写 -->
  <a :href="url"> ... </a>
  <!-- 解析后为<a url='https://api.github.com/user'> ... </a> -->
</template>
<script setup>
const url = "https://api.github.com/user";
</script>
```

```vue
<template>
  <button v-on:click="sayHello()">click</button>
  <!-- 简写 -->
  <button @click="sayHello()">click</button>
</template>
<script setup>
const sayHello = () => console.log("hello");
</script>
```

动态参数:vue 指定不仅支持其值是动态的,也支持其参数也是动态的

```vue
<template>
  <!-- 动态参数 -->
  <p v-bind:[attributeName]="attributeValue">dynamic argument</p>
  <!-- 简写 -->
  <p :[attributeName]="attributeValue">dynamic argument</p>
</template>
<script setup>
// 或者使用计算属性
const attributeName = "class";
const attributeValue = "danger";
</script>
```

##### 指令修饰符

修饰符是以点开头的特殊后缀，表明指令需要以一些特殊的方式被绑定

例如`.prevent`修饰符会告知 `v-on` 指令对触发的事件调用 `event.preventDefault()`：

```vue
<form @submit.prevent="onSubmit">...</form>
```

![image-20230804132610845](C:\Users\ycx\AppData\Roaming\Typora\typora-user-images\image-20230804132610845.png)

### 响应式基础

#### `ref`

推荐使用`ref`来声明一个响应式状态

`ref`会将原始对象包裹在一个带有`value`属性的 ref 对象中

获取原始对象的响应式的值时需要通过`.value`来进行访问，除非该值已经被解构（例如在模板中）

```vue
<template>
  <div class="container">
    <!-- 响应式基础 -->
    <p>{{ count }}</p>
    <button @click="increaseCount">increase</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

// ref
// 推荐使用ref来声明响应式状态
const count = ref(0);
const increaseCount = () => count.value++;
</script>
<style scoped></style>
```

##### 深层响应式

`ref`可以对任意类型的值进行响应式处理，包含深层嵌套的对象、数组、Set 等

对于非原始数据类型的值，其底层会调用`reactive`将其转换为响应式对象

如果不需要深层次的响应式处理，可以使用`shallowRef`

```vue
<template>
  <div class="container">
    <p>{{ objRef }}</p>
    <button @click="clickFn">click</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

// 深层响应式
const objRef = ref({
  nested: {
    count: 0,
  },
  arr: [1, 2, 3],
});

const clickFn = () => {
  objRef.value.nested.count++;
  objRef.value.arr.push(4);
};
</script>
<style scoped></style>
```

##### `nextTick`

通过使用`nextTick`可以等待 DOM 更新之后再执行代码

```ts
import { nextTick } from "vue";

async function increment() {
  count.value++;
  await nextTick();
  // 现在 DOM 已经更新了
}
```

##### 自动解包

一个 ref 在以下场景下会进行自动解包

- 顶级的 ref 在模板中进行使用时

  ```vue
  <template>
    <div class="container">
      <p>{{ count + 1 }}</p>
      <!-- <p>{{ obj.id + 1 }}</p> -->
      <p>{{ obj.id.value + 1 }}</p>
      <p>{{ id + 1 }}</p>
    </div>
  </template>
  <script setup lang="ts">
  import { nextTick, reactive, ref } from "vue";

  // 顶级 ref
  const num = ref(3);
  // 非顶级 ref
  const obj = {
    id: ref(0),
  };

  // 可以通过将ref解构出来使其成为一个顶级ref解决以上问题
  const { id } = obj;
  </script>
  <style scoped></style>
  ```

- 作为一个 reactive 对象(不包含 shallowReactive)的属性时

  ```ts
  const num1 = ref(0);
  const numObj = reactive({
    // 无需添加.value，会自动解包
    num: num1,
  });
  console.log(numObj.num); // 0
  numObj.num++;
  console.log(numObj.num); // 1

  // 将一个ref赋值给一个reactive对象的属性时也会自动解包
  const num2 = ref(10);
  numObj.num = num2 as unknown as number;
  console.log(numObj.num); // 10
  numObj.num++;
  console.log(numObj.num); // 11
  ```

但是需要注意的是，当一个 ref 被放在一个数组或者 Map 中来作为`reactive()`的参数时，不会自动解包

```ts
// 非自动解包
const books = reactive([ref("vue3")]);
// 这里需要 .value
console.log(books[0].value); // "vue3"

const map = reactive(new Map([["count", ref(0)]]));
// 这里需要 .value
console.log(map.get("count")!.value); // 0
```

#### `reactive`

`ref`实现响应式是将目标对象包装在一个特殊的对象中，然后通过`.value`来访问目标对象的响应值

而`reactive`是直接是目标对象本身具有响应式，直接通过读取对象本身的值就可以获取响应式值

当`ref`中的目标值为一个对象时，会在底层调用`reactive`实现响应式

```vue
<template>
  <div class="container">
    <button @click="state.count++">{{ state.count }}</button>
  </div>
</template>
<script setup lang="ts">
import { nextTick, reactive, ref } from "vue";

// reactive
const state = reactive({
  count: 0,
});
</script>
<style scoped></style>
```

并且默认也是深层响应式的:

```vue
<template>
  <div class="container">
    <button @click="person.nested.age++">{{ person.nested.age }}</button>
  </div>
</template>
<script setup lang="ts">
import { nextTick, reactive, ref } from "vue";

// reactive
// 深层响应式
const person = reactive({
  nested: {
    age: 12,
  },
  name: "Alice",
});
</script>
<style scoped></style>
```

如果需要使用浅层次的响应式，可以使用`shallowReactive`

由于`reactive`的本质是通过`Proxy`对目标对象进行代理，并返回目标对象的代理对象

故具有响应式的是代理对象，并且使用时使用的也是代理对象，代理对象与目标对象本身并不对等

```ts
const raw = {};
const proxy = reactive(raw);

// 代理对象和原始对象不是全等的
console.log(proxy === raw); // false
```

为了保证访问代理的一致性，对同一个目标对象调用`reactive`将总是返回一个代理对象，对一个已存在的代理对象调用`reactive`将返回该代理对象本身

```ts
// 在同一个对象上调用 reactive() 会返回相同的代理
console.log(reactive(raw) === proxy); // true

// 在一个代理上调用 reactive() 会返回它自己
console.log(reactive(proxy) === proxy); // true
```

##### 局限性

- 只能处理一些有限的值: 只能对例如对象、数组、Map、Set 等类型的数据进行响应式的处理，不能处理 string、numbr 或者 boolean 类型的数据
- 响应式丢失问题

  - 替换整个对象将丢失响应式:
    ```ts
    // 响应式丢失
    const raw1 = { count: 0 };
    const raw2 = { count: 1 };
    let state1 = reactive(raw1);
    // 将raw1整个替换，将丢失对raw1的响应式
    state1 = reactive(raw2);
    ```
  - 解构响应式对象时将丢失响应式

    ```ts
    // 解构响应式对象
    const state2 = reactive({ countNum: 0 });
    let { countNum } = state2;
    // countNum将丢失响应式
    // 对state无影响
    const addCountNum = () => countNum++;

    // 或者将响应式对象的属性作为一个参数传递给函数时也将失去响应式
    const addNum = (num: number | Record<string, number>) => {
      if (typeof num === "number") {
        num++;
      } else {
        num.countNum++;
      }
    };
    const clickFn2 = () => {
      // addNum(state2.countNum);
      // 除非将整个响应式对象进行传递
      addNum(state2);
    };
    ```
