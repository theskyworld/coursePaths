## vue3 基本语法

### 创建应用实例(!!IMPORTANT)

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
<template>
<span>Message: {{ msg }}</span>
</template>
```

同时支持表达式

```vue
<template>
<!-- 调用方法 -->
<div>{{ name.toUpperCase() }}</div>
<div>{{ num + 1 }}</div>
<!-- 三元表达式 -->
<div>{{ ok ? "YES" : "NO" }}</div>
<div>{{ message.split("").reverse().join("") }}</div>
<!-- 模板字符串 -->
<div :id="`list-${id}`"></div>
<!-- 调用函数 -->
<time :title="toTitleDate(date)" :datetime="date">
  {{ formatDate(date) }}
</time>
</template>

```

在模板内,JS 表达式可以被使用在以下场景中:

- 文本插值内
- vue 指令的值中

需要注意的是,双大括号会将其中的内容解析为**纯文本**,而不是 HTML

如果需要插入 HTML,应当使用`v-html`指令

```vue
<template>
  <div class="container">
    <p v-html="rawHtml"></p>
  </div>
  <!-- 解析后的结果为 -->
  <div class="container">
    <p><span style="color: red">This should be red.</span></p>
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

绑定多个动态值(!!IMPORTANT)

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
- `Object`,`Boolean`,`String`,`RegExp`,`Map`,`Set`,`JSON`,`Intl`,`BigInt`,`console`

对于其它不能访问到的对象,可以在`app.config.globalProperties `上进行添加,以便在所有的组件中能够直接使用

#### 指令

[vue 指令](https://cn.vuejs.org/api/built-in-directives.html)指的是一系列以`v-`作为前缀的模板中特殊属性

其值期望的是一个 JS 表达式,也即值是动态的。如果需要添加一个静态的属性值,直接添加在 DOM 元素上即可,无需通过指令添加

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
  <!-- 解析后为<a href='https://api.github.com/user'> ... </a> -->
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

动态参数:vue 指定不仅支持其值是动态的,也支持其参数也是动态的(!!IMPORTANT)

```vue
<template>
  <!-- 动态参数 -->
  <p v-bind:[attributeName]="attributeValue">dynamic argument</p>
  <!-- 简写 -->
  <p :[attributeName]="attributeValue">dynamic argument</p>
</template>
<script setup>
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
<template>
    <div>
        <p ref="pElem">{{ countRef }}</p>
    </div>
</template>
<script setup lang='ts'>
import { nextTick, onMounted, ref } from 'vue';

const countRef = ref(0);
const pElem = ref();

const addCount = () => countRef.value++;

onMounted(async () => {
    addCount();
    // 更新DOM之前p元素中的countRef值
    console.log(pElem.value.innerText); // 0
    // 等待DOM元素的更新，需要添加await
    await nextTick();
    // 更新DOM之后p元素中的countRef值
    console.log(pElem.value.innerText); // 1
})


</script>
<style scoped></style>
```

##### 自动解包

一个 ref 在以下场景下会进行自动解包

- 顶级的 ref 在模板中进行使用时

  ```vue
  <template>
    <div class="container">
      <p>{{ num + 1 }}</p>
      <!-- <p>{{ obj.id + 1 }}</p> -->
      <p>{{ obj.id.value + 1 }}</p>
      <p>{{ id + 1 }}</p>
    </div>
  </template>
  <script setup lang="ts">
  import { ref } from "vue";

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

- 作为一个 reactive 对象(不包含 shallowReactive)的属性值时

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

而`reactive`是直接使目标对象本身(其代理对象)具有响应式，通过直接读取对象本身的值就可以获取响应式值

当`ref`中的目标值为一个对象时，会在底层调用`reactive`实现响应式

```vue
<template>
  <div class="container">
    <button @click="state.count++">{{ state.count }}</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

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
import { ref } from "vue";

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
    // 对state2无影响
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

### 计算属性

可以通过计算属性将模板中复杂的表达式书写在 JS 中

通过`computed`将表达式的结果进行返回之后在模板中使用

```vue
<template>
  <div class="container">
    <!-- 计算属性 -->
    <p>年龄大于十岁的用户:{{ ageMoreThanTenUser }}</p>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive } from "vue";

const users = reactive([
  {
    name: "Alice1",
    age: 12,
  },
  {
    name: "Alice2",
    age: 9,
  },
  {
    name: "Alice3",
    age: 7,
  },
]);
// 使用computed对上述的users进行过滤
const ageMoreThanTenUser = computed(
  () => users.filter((user) => user.age >= 10)[0].name
);
</script>
```

`computed`会自动追踪响应式依赖，当响应式依赖的值(`users`)发生变化时，会自动对其返回的值进行更新

##### 会缓存计算属性值

可以发现，对于上述`ageMoreThanTenUser`值得获取，通过在模板中调用方法也可以实现

```vue
<template>
  <div class="container">
    <!-- 计算属性 -->
    <p>年龄大于十岁的用户:{{ getAgeMoreThanTenUser() }}</p>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive } from "vue";

const users = reactive([
  {
    name: "Alice1",
    age: 12,
  },
  {
    name: "Alice2",
    age: 9,
  },
  {
    name: "Alice3",
    age: 7,
  },
]);

// 使用方法
const getAgeMoreThanTenUser = () =>
  users.filter((user) => user.age >= 10)[0].name;
</script>
<style scoped></style>
```

但是，相较于方法，计算属性返回的值会被保存。这意味着，只要计算属性的依赖值没有发生变化，就不会重新进行计算，使用的始终是上次计算之后返回的值;只有在每次依赖值发生改变时，才会进行重新计算

方法调用总是会在重渲染发生时再次执行函数

```vue
<template>
  <div class="container">
    <p>{{ now }}</p>
    <p>{{ getNow() }}</p>
    <p>{{ countRef }}</p>
    <!-- 点击按钮，让组件重渲染，getNow()将跟随被调用 -->
    <button @click="countRef++">click</button>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
const countRef = ref(0);

const now = computed(() => {
  console.log("now called ...");
  // Date.now()不会作为依赖，now始终不会进行重新计算
  return Date.now();
});

const getNow = () => {
  // 每次组件重新渲染时再次调用
  console.log("getNow called...");
  return Date.now();
};
</script>
<style scoped></style>
```

##### 可写的计算属性

计算属性返回的值默认都是只读的，如果对其进行修改将报错

```ts
// 只读的计算属性
const count = ref(1);
const doubleCount = computed(() => count.value * 2);
// doubleCount.value = 3; // 报错
```

可写的计算属性

```ts
// 可写的计算属性
import { computed, ref } from "vue";

const countRef = ref(1);
const doubleCountRef = computed({
    get() {
        return countRef.value * 2;
    },
    set(newVal) {
        // 修改依赖的值，触发计算属性的重新计算，返回新的doubleCount1值
        // 等价于对doubleCount1进行修改
        countRef.value = newVal / 2;
    }
});
doubleCountRef.value = 3;
console.log(countRef.value); // 1.5
console.log(doubleCountRef.value); // 3
```

### 类和样式绑定

通过对 DOM 中元素的`class`和`style`属性来绑定一个或多个动态值，实现元素样式的动态切换

#### 绑定`class`

##### 值为对象

通过给`:class`来传递一个动态的对象值，实现元素`class`属性值的动态切换

对于被绑定的对象，其键为一个字符串值，表示是否要添加的类名(即解析后`class='[键名]'`);对应的其值为一个真假值（`true`/`false`或者其它表示真假的值），表示其键对应的类名是否被添加

```vue
<template>
  <div class="container">
    <!-- 类和样式绑定 -->
    <!-- 绑定class -->
    <!-- 通过isActive的真假值来决定是否为以下DOM元素添加active类名 -->
    <button :class="{ active: isActive }">click</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
// 添加active类名
const isActive = ref(true);
// const isActive = ref("someWhateverContent");
// const isActive = ref(Symbol(''));

// 不添加active类名
// const isActive = ref('');
// const isActive = ref(null);
// const isActive = ref(undefined);
</script>
<style scoped>
.active {
  border: solid 1px red;
}
</style>
```

在对象中书写多个字段

```vue
<template>
  <div class="container">
    <!-- 类和样式绑定 -->
    <!-- 绑定class -->
    <!-- 通过isActive的真假值来决定是否为以下DOM元素添加active类名 -->
    <div><button @click="change">change</button></div>
    <!-- 点击按钮，通过添加或移除active类名实现button元素样式的动态切换 -->
    <div>
      <button @click="isActive = !isActive" :class="{ active: isActive }">
        click
      </button>
    </div>
    <div :class="{ active: isActive, 'text-danger': hasError }">some text</div>
    <div :class="dynamicClassObj">some text</div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
const isActive = ref(true);
const hasError = ref(false);

// 切换样式
const change = () => {
  isActive.value = !isActive.value;
  hasError.value = !hasError.value;
};

const dynamicClassObj = reactive({ active: isActive, "text-danger": hasError });
</script>
<style scoped>
div {
  margin: 10px 0;
}

.active {
  border: solid 1px red;
}

.text-danger {
  color: green;
}
</style>
```

或者直接绑定一个动态对象的对象名

```vue
<template>
  <div class="container">
    <div><button @click="change">change</button></div>
    <div :class="dynamicClassObj">some text</div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
const isActive = ref(true);
const hasError = ref(false);

// 切换样式
const change = () => {
  isActive.value = !isActive.value;
  hasError.value = !hasError.value;
};

const dynamicClassObj = reactive({ active: isActive, "text-danger": hasError });
</script>
<style scoped>
div {
  margin: 10px 0;
}

.active {
  border: solid 1px red;
}

.text-danger {
  color: green;
}
</style>
```

##### 值为一个变量
```vue
<template>
    <div class="container">
        <button :class="activeClass"></button>
        <!-- 解析后的结果为 -->
        <button class="active"></button>
    </div>
</template>
<script setup lang="ts">

import { ref } from "vue";

const activeClass = ref('active');

</script>
<style scoped></style>
```

##### 值为数组

此时数组中存在的元素的值代表要添加的类名，不存在的则代表不添加

```vue
<template>
  <div class="container">
    <!-- 通过数组添加active和text-danger类 -->
    <div :class="[activeClass, errClass]">someText</div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";

// 添加active类
const activeClass = ref("active");
// 添加text-danger类
const errClass = ref("text-danger");

</script>
<style scoped>
div {
  margin: 10px 0;
}

.active {
  border: solid 1px red;
}

.text-danger {
  color: green;
}
</style>
```

要控制某个类名的是否添加,通过在模板中使用三元表达式或者结合对象来进行控制

```vue
<template>
  <div class="container">
    <div><button @click="change">change</button></div>
    <!-- 使用三元表达式控制类名的是否添加 -->
    <div :class="[isActive ? activeClass : '', errClass]">someText</div>
    <!-- 或者结合对象使用 -->
    <div :class="[{ active: isActive }, errClass]">someText</div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
// 添加active类名
const isActive = ref(true);
const hasError = ref(false);

// 切换样式
const change = () => {
  isActive.value = !isActive.value;
  hasError.value = !hasError.value;
};

// 添加active类
const activeClass = ref("active");
// 添加text-danger类
const errClass = ref("text-danger");
</script>
<style scoped>
div {
  margin: 10px 0;
}

.active {
  border: solid 1px red;
}

.text-danger {
  color: green;
}
</style>
```

##### 组件类名的透传

当在父组件中使用子组件时，如果在该子组件元素上添加了类名，那么这些类名会透传到对应子组件的根元素上进行添加

```vue
<template>
  <!-- 父组件 -->
  <!-- 类名的透传 -->
  <ClassAndStyleBound class="active text-danger"></ClassAndStyleBound>
</template>
```

```vue
<template>
  <!-- 子组件 -->
  <!-- 组件类名的透传，透传到该根元素上 -->
  <div></div>
</template>
```

如果存在多个根元素，则通过为指定的根元素添加 vue 实例的 attrs 属性:`$attrs`来将透传的属性添加到该根元素上

```vue
<template>
  <!-- 父组件 -->
  <!-- 类名的透传 -->
  <ClassAndStyleBound class="active text-danger"></ClassAndStyleBound>
</template>
```

```vue
<template>
  <!-- 子组件 -->
  <div></div>
  <!-- 将透传的类名添加到该根元素上 -->
  <p :class="$attrs.class">another root element</p>
</template>
```

#### 绑定`style`

类似于绑定`class`，也是用于动态地切换一个元素的样式，其值也存在对象和数组两种

##### 值为对象

对象的键名代表要添加的内置 CSS 样式名(例如`color`,`font-size`)，键值代表对应样式的值

```vue
<template>
  <div>
    <!-- 绑定style -->
    <div :style="{ color: activeColor, 'font-size': fontSize + 'px' }">
      someText
    </div>
    <div :style="dynamicStyleObj">someText</div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";

// 绑定style
// 通过变量的值确定具体样式
const activeColor = ref("pink");
const fontSize = ref(30);

// 使用对象名
// 更贴近于CSS的写法
const dynamicStyleObj = reactive({
  color: "red",
  fontSize: "25px",
});
</script>
```

##### 值为数组

通过数组为元素添加多个样式名

```vue
<template>
  <div>
    <!-- 值为数组 -->
    <div :style="[baseStyle, colorfulStyle]">someText</div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
// 值为数组
const baseStyle = reactive({
  fontSize: "30px",
});
const colorfulStyle = reactive({
  border: "solid 3px pink",
});
</script>
```

##### 自动添加样式名前缀

在处理浏览器对样式的兼容性问题时，如果使用了需要[浏览器特殊前缀](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix)的 CSS 样式时，vue 会自动添加对应的前缀，无需手动添加

##### 样式多值

或者，你也可以通过数组来为一个样式添加多个带有前缀的值，vue 仅会渲染浏览器支持的最后一个值

```vue
<template>
  <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
</template>
```

### 条件渲染

#### `v-if`

```vue
<template>
  <div>
    <!-- 条件渲染 -->
    <!-- v-if -->
    <!-- 控制元素是否渲染 -->
    <p v-if="isRender">someText</p>
    <button @click="isRender = !isRender">toggleIsRender</button>

    <!-- v-else -->
    <!-- 控制渲染元素的替代内容 -->
    <p v-if="isWonderful">wonderful!</p>
    <p v-else>Opps!</p>
    <button @click="isWonderful = !isWonderful">toggleIsWonderful</button>

    <!-- v-else-if -->
    <!-- 控制渲染哪个元素 -->
    <p v-if="name === 'Alice1'">Alice1</p>
    <p v-else-if="name === 'Alice2'">Alice2</p>
    <p v-else-if="name === 'Alice3'">Alice3</p>
    <button @click="switchName">switchName</button>

    <!-- 通过添加在template元素上来控制多个元素的条件渲染 -->
    <template v-if="isWonderful">
      <p>wonderful!1</p>
      <p>wonderful!2</p>
      <p>hello</p>
      <button disabled>button</button>
    </template>
    <p v-else>Opps!</p>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const isRender = ref(true);
const isWonderful = ref(true);

const names = ["Alice1", "Alice2", "Alice3"];
const name = ref("Alice1");
const switchName = () => {
  name.value = names[Math.floor(Math.random() * 3)];
};
</script>
<style scoped></style>
```

##### 惰性渲染
`v-if`的渲染为惰性的，如果其值初始为`false`，则不会做任何事情

```vue
<template>
  <div>
    <!-- 条件渲染 -->
    <!-- v-if -->
    <!-- 控制元素的是否渲染 -->
    <p v-if="isRender">someText</p>
    <button @click="isRender = !isRender">toggleIsRender</button>

    <!-- v-show -->
    <p v-show="isShow">vShow</p>
    <button @click="isShow = !isShow">toggleIsShow</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
// v-if惰性渲染，初始条件为false,则不做任何事情
const isRender = ref(false);

// v-show
// 无论初始条件为什么，初始都会进行渲染
const isShow = ref(false);
</script>
```

#### `v-show`

`v-show`的作用和`v-if`相同，用法类似

```vue
<template>
  <div>
    <!-- 条件渲染 -->
    <!-- v-show -->
    <p v-show="isShow">vShow</p>
    <button @click="isShow = !isShow">toggleIsShow</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

// v-show
// 无论初始条件为什么，初始都会进行渲染
const isShow = ref(false);
</script>
```

区别在于

- `v-show`会在 DOM 渲染中保留该元素，切换时只是切换元素的`display`属性，并且无论初始条件为 `true` 还是 `false`，初始时都会将元素进行渲染
- `v-if`则是真实地将元素进行销毁或者重建，在切换时，元素对应的事件监听器、子组件等都会跟着进行销毁或重建。并且，其渲染是惰性的，如果初始条件为 `false`，则不会做任何事情，直到条件为 `true` 之后才进行渲染
- 因此，`v-if`有更高的切换开销，`v-show`有更高的初始渲染开销。如果需要频繁切换，使用`v-show`，反之，使用`v-if`
- `v-show` 不支持在 `<template>` 元素上使用，也不能和 `v-else` 搭配使用

### 列表渲染

将`v-for`添加到那个需要被渲染成列表（多项）的元素上

##### 遍历数组

使用`v-for`指令来基于一个数组渲染出一个列表

```vue
<template>
  <div>
    <!-- 列表渲染 -->
    <div>
      <ul>
        <li v-for="name in names" :key="name">{{ name }}</li>
        <!-- 也可以使用...of... -->
        <li v-for="name of names" :key="name">{{ name }}</li>
      </ul>
    </div>
    <div>
      <p v-for="(user, index) in users" :key="user.id">
        <span>{{ index }}-</span>
        <span>userName : {{ user.name }}-</span>
        <span>userAge : {{ user.age }}</span>
      </p>
      <!-- 使用对象的解构语法 -->
      <p v-for="({ id, name, age }, index) in users" :key="id">
        <span>{{ index }}-</span>
        <span>userName : {{ name }}-</span>
        <span>userAge : {{ age }}</span>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const names = ref(["Alice1", "Alice2", "Alice3"]);

const users = ref([
  {
    id: 1,
    name: "Alice1",
    age: 12,
  },
  {
    id: 2,
    name: "Alice2",
    age: 13,
  },
  {
    id: 3,
    name: "Alice3",
    age: 14,
  },
]);
</script>
<style scoped></style>
```

##### 遍历对象

还可以基于一个对象来进行列表渲染

```vue
<template>
  <div>
    <!-- 列表渲染 -->
    <!-- 基于对象 -->
    <div>
      <!-- 第一个为值,第二个为键,第三个为索引 -->
      <p v-for="(value, key, index) in obj" :key="index">
        <span>{{ index }}-{{ key }}:{{ value }}</span>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
const obj = reactive({
  title: "How to do lists in Vue",
  author: "Jane Doe",
  publishedAt: "2016-04-10",
});
</script>
<style scoped></style>
```

##### 遍历范围数值

还可以基于一个表示范围的数值进行列表渲染

```vue
<template>
  <div>
    <!-- 列表渲染 -->
    <!-- 基于范围数值 -->
    <div>
      <!-- 将以下内容渲染五遍 -->
      <!-- n从1开始 -->
      <p v-for="n in 5" :key="n">wonderful!</p>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped></style>
```

##### 可以在`template`上使用

```vue
<template>
  <div>
    <!-- 列表渲染 -->
    <!-- 在template上使用 -->
    <div>
      <template v-for="{ id, name, age } in users" :key="id">
        <ul>
          <li>{{ name }}</li>
          <li>{{ age }}</li>
        </ul>
        <p>{{ name }}-{{ age }}</p>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";

const users = ref([
  {
    id: 1,
    name: "Alice1",
    age: 12,
  },
  {
    id: 2,
    name: "Alice2",
    age: 13,
  },
  {
    id: 3,
    name: "Alice3",
    age: 14,
  },
]);
</script>
<style scoped></style>
```

##### 可以在一个组件上使用

```vue
<template>
  <!-- 将以下组件渲染三遍 -->
  <ListRendering v-for="n in 3" :key="n"></ListRendering>
</template>
```

还可以通过列表渲染来进行属性的传值

结合列表渲染制作一个 todoList

```vue
<!-- App.vue -->
<template>
  <div class="container">
    <!-- 还可以通过列表渲染来进行属性的传值 -->
    <form @submit.prevent="addNewTodo">
      <label for="new-todo">Add a todo</label>
      <input
        type="text"
        id="new-todo"
        v-model="newTodoTitle"
        placeholder="E.g. Feed the cat"
      />
      <button>Add</button>
    </form>
    <ul>
      <TodoListItem
        v-for="({ id, title }, index) in todos"
        :key="id"
        :title="title"
        @remove="todos.splice(index, 1)"
      >
      </TodoListItem>
    </ul>
  </div>
</template>
<script setup lang="ts">
import TodoListItem from "./usage/components/TodoListItem.vue";
import { reactive, ref } from "vue";

// 初始渲染的todos
const todos = ref([
  {
    id: 1,
    title: "Do the dishes",
  },
  {
    id: 2,
    title: "Take out the trash",
  },
  {
    id: 3,
    title: "Mow the lawn",
  },
]);

// 要添加的todo
const newTodoTitle = ref("");
let newTodoId = 4;
const addNewTodo = () => {
  todos.value.push({
    id: newTodoId++,
    title: newTodoTitle.value,
  });
  newTodoTitle.value = "";
};
</script>
<style scoped></style>
```

```vue
<!--TodoListItem.vue  -->
<template>
  <div>
    <li>
      {{ title }}
      <button @click="$emit('remove')">remove</button>
    </li>
  </div>
</template>
<script setup lang="ts">
defineProps(["title"]);
defineEmits(["remove"]);
</script>
<style scoped></style>
```

### 事件处理

#### 事件监听

通过`v-on:eventName`或者`@eventName`来对 DOM 元素中的事件进行监听

其值可以为一个内联事件处理器或者一个方法事件处理器

#### 内联事件处理器

```vue
<template>
  <div>
    <!-- 事件处理 -->
    <!-- 内联事件处理器 -->
    <p>{{ msg }}</p>
    <button @click="count++">{{ count }}</button>
    <button @click="increaseCount()">{{ count }}</button>
    <!-- 传递参数 -->
    <button @click="changeMsg('hi')">changeMsg</button>
    <!-- 访问事件对象event -->
    <button @click="warn('Form cannot be submitted yet', $event)">
      submit
    </button>
    <!-- 或者 -->
    <button @click="(event) => warn('Form cannot be submitted yet', event)">
      submit
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const count = ref(0);

const increaseCount = () => count.value++;
</script>
<style scoped></style>
```

#### 方法事件处理器

```vue
<template>
  <div>
    <!-- 事件处理 -->
    <!-- 方法事件处理器 -->
    <button @click="greet">greet</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const greet = (e: Event) => {
  if (e) {
    console.log((e.target as any)?.tagName); // "BUTTON"
  }
};
</script>
<style scoped></style>
```

#### 事件修饰符

包括以下事件修饰符

- `.stop`
- `.prevent`
- `.self`
- `.capture`
- `.once`
- `.passive`

```html
<!-- 单击事件将停止传递 -->
<a @click.stop="doThis"></a>

<!-- 提交事件将不再重新加载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰语可以使用链式书写 -->
<a @click.stop.prevent="doThat"></a>

<!-- 也可以只有修饰符 -->
<form @submit.prevent></form>

<!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
<!-- 例如：事件处理器不来自子元素 -->
<div @click.self="doThat">...</div>

<!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
<!-- 例如：指向内部元素的事件，在被内部元素处理前，先被外部处理 -->
<div @click.capture="doThis">...</div>

<!-- 点击事件最多被触发一次 -->
<a @click.once="doThis"></a>

<!-- 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成 -->
<!-- 以防其中包含 `event.preventDefault()` -->
<div @scroll.passive="onScroll">...</div>
```

#### 按键修饰符

通过绑定特定的按键(`keyName`),当按键抬起或者按下时(`@keyup|keydown`触发特定的回调函数(`'callback'`)

形式为`@keyup|keydown.keyName='callback'`

```vue
<template>
  <div>
    <!-- 事件处理 -->
    <!-- 按键修饰符 -->
    <!-- 当enter按键抬起时触发logContent事件回调函数 -->
    <input @keyup.enter="logContent" v-model="content" />
    <!-- 当enter按键按下时触发logContent事件回调函数,一直按下一直触发 -->
    <input @keydown.enter="logContent" v-model="content" />
    <input @keyup.page-down="logContent" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const content = ref("");
const logContent = () => console.log(content.value);
</script>
<style scoped></style>
```

常见的按键别名(`keyName`)有:

- `.enter`
- `.tab`
- `.delete` (捕获“Delete”和“Backspace”两个按键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

以下按键别名只能绑定在`@keydown`上:

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

```html
<!-- 按下alt键时触发logContent事件回调函数 -->
<input @keydown.alt="logContent" v-model="content" />
```

结合以上四个按键来绑定多个按键

```html
<!-- 绑定多个按键 -->
<!-- 当alt键被按下,同时抬起enter键时触发logContent事件回调函数 -->
<input @keyup.alt.enter="logContent" v-model="content" />
```

或者跟事件进行绑定

```html
<!-- 只有按下alt的同时点击按钮时才会触发logContent事件回调函数 -->
<button @click.alt="logContent">alt+click</button>
```

##### `.exact`修饰符

在上述跟事件绑定的情况中,只要是满足了按下 alt 的同时点击按钮的条件就会触发 `logContent` 事件回调函数,即使同时按下 Alt 或 Shift 也会触发

通过`.exact`修饰符可以对上述问题进行修正

```html
<!-- 按下alt的同时点击按钮时触发,如果同时也按下了shift或者ctrl不会触发 -->
<button @click.alt.exact="logContent">alt+click</button>
```

```html
<!-- 只有点击按钮时才触发,同时按下其它键例如alt,ctrl,shift不会触发 -->
<button @click.exact="logContent">alt+click</button>
```

##### 鼠标按键修饰符

- `.left`
- `.right`
- `.middle`

### 表单输入绑定

#### `v-model`原理

vue 中通过`v-model`指令来将一个变量与表单中的值进行绑定

<template>
    <div>
        <!-- 表单输入绑定 -->
        <!-- msg变量的值将跟随输入框中的文本值进行变化 -->
        <!-- 输入框中文本值也将随着msg变量值的变化而变化 -->
        <p>{{ msg }}</p>
        <input type="text" v-model="msg">
        <button @click="msg = 'newMsg'">changeMsg</button>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
const msg = ref('')
</script>
<style scoped></style>

其底层逻辑是通过`v-bind`将表单输入框中`value`属性的值与变量(`msg`)进行绑定,实现`value`的值跟随`msg`变量的值进行变化;

同时监听输入框的 `input` 事件,在输入框中的值(`value`值)发生更改时,每次将更改后的值重新赋值给`msg`变量,实现`msg`变量的更新

最终实现`value`和`msg`的双向绑定

```html
<template>
    <div>
        <p>{{ msg }}</p>
        <input type="text" :value="msg" @input="e => msg = (e.target as any)?.value" />
        <!-- 或者 -->
        <input type="text" :value="msg" @input="changeMsg($event)">
        <!-- 使用这种的形式,其中一种与v-model的区别在于: 对于需要使用 IME 的语言 (中文，日文和韩文等),在拼字阶段也触发更新-->

    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';


const msg = ref("");
const changeMsg = (e: Event) => msg.value = (e.target as any).value;

</script>
<style scoped></style>
```

对于不同类型的输入框,会绑定不同的属性和监听不同的事件:

- 对于文本类型的` <input>` 和`<textarea>`:绑定`value`属性,监听`input`事件
- `<input type="checkbox">` 和 `<input type="radio">`:绑定`checked`属性,监听`change`事件
- `<select>`:绑定`value`属性,监听`change`事件

#### 表单绑定

##### 绑定单行文本输入框

```html
<!-- 表单输入绑定 -->
<!-- msg变量的值将跟随输入框中的文本值进行变化 -->
<!-- 输入框中文本值也将随着msg变量值的变化而变化 -->
<p>{{ msg }}</p>
<input type="text" v-model="msg" />
<!-- 等价于 -->
<input type="text" :value="msg" @input="e => msg = (e.target as any)?.value" />
<button @click="msg = 'newMsg'">changeMsg</button>
```

##### 绑定多行文本输入框

```html
<!-- 多行文本 -->
<p style="white-space: pre-line;">{{ multiline }}</p>
<textarea v-model="multiline"></textarea>
```

##### 绑定复选框

```html
<!-- 单一复选框 -->
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>

<!-- 多个复选框 -->
<div>checkedNames : {{ checkedNames }}</div>
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames" />
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
<label for="mike">Mike</label>
```

##### 绑定单选按钮

```html
<!-- 单选按钮 -->
<div>picked:{{ picked }}</div>
<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>
<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
```

##### 绑定选择器

```vue
<template>
  <div>
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
      <option v-for="(option, index) in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const selectedName = ref("");
const options = ref(["Alice1", "Alice2", "Alice3"]);
</script>
```

##### 动态值绑定

```vue
<template>
  <!-- 动态值绑定 -->
  <div>toggle : {{ toggle }}</div>
  <!-- 默认情况下,toggle展示的值为true/false,现在通过true-valu和false-value的指定,toggle展示的值为yes/no -->
  <input type="checkbox" v-model="toggle" true-value="yes" false-value="no" />
  <!-- 动态绑定 -->
  <div>dynamicToggle : {{ dynamicToggle }}</div>
  <input
    type="checkbox"
    v-model="dynamicToggle"
    :true-value="dynamicTrueValue"
    :false-value="dynamicFalseValue"
  />
</template>
<script>
const toggle = ref("");
const dynamicToggle = ref("");
const dynamicTrueValue = "right";
const dynamicFalseValue = "wrong";
</script>
```

#### 修饰符

##### `.lazy`

`v-model`默认在每次`input`事件之后更新数据,通过添加`.lazy`修饰符改为在每次`change`事件之后更新数据

```html
<input v-model.lazy="msg" />
```

##### `.number`

将用户输入的内容自动转换为数值

底层通过调用`parseFloat()`进行转换,转换不了则返回原始值

在`type="number"`的输入框中会自动启用

```html
<input v-model.number="age" />
```

##### `trim`

自动去除用户输入内容的两端空格

```html
<input v-model.trim="msg" />
```

### 生命周期钩子

vue 中的每个生命周期钩子接收一个回调函数,在特定的时机对回调函数进行调用

[对应的 API](https://cn.vuejs.org/api/composition-api-lifecycle.html)

TODO : 在涉及到对应的 API 时进行整合完善

### 侦听器

#### `watch`

通过计算属性`computed`可以很好地在依赖值发生变化时计算出其对应的衍生值,并且不建议在计算属性函数中添加副作用的操作,只用于返回计算值

如果需要在依赖值发生变化时,执行相应的副作用操作,可以使用侦听器`watch`

```vue
<template>
  <div>
    <!-- 点击按钮,获取github上user的随机图片 -->
    <button @click="uid = getRandomId()">change</button>
    <img :src="targetAvatar" alt="" />
  </div>
</template>
<script setup lang="ts">
import { ref, useAttrs, watch, computed } from "vue";
import axios from "axios";

interface Data {
  id: number;
  avatar_url: string;
  [key: string]: any;
}
// 用户id,点击change按钮后随机切换
const uid = ref(1);
// 根据uid获取的对应user
let targetUser = ref<Data>();
// user的图像链接
const targetAvatar = computed(() => targetUser.value?.avatar_url);

const getRandomId = () => Math.floor(Math.random() * 30 + 1);
// 侦听uid属性,每次变化时执行对应的回调函数
watch(uid, async () => {
  await axios.get("https://api.github.com/users").then((value) => {
    const datas = value.data.splice(0, 30);
    targetUser.value = datas.find((data: Data) => data.id === uid.value);
  });
});
</script>
<style scoped></style>
```

##### 侦听源类型

侦听器中那个被侦听的对象可以为不同的形式,包括

- 一个 ref 值,包含计算属性的返回值
- 一个响应式对象
- 一个 getter 函数
- 多个被侦听的对象组成的数组

```ts
const x = ref(0);
const y = ref(0);
const obj = reactive({
  count: 0,
});

// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`);
});

// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`);
  }
);

// 响应式对象
watch(obj, (newObj) => {
  console.log(newObj);
});

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`);
});
```

注意侦听响应式对象的某个属性时,需要使用 getter

```ts
// 提供一个 getter 函数
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`);
  }
);
```

##### 深层侦听器

如果对一个响应式对象进行侦听,则默认会隐式地创建一个深层侦听器

```ts
const obj = reactive({ count: 0 });

watch(obj, (newValue, oldValue) => {
  // 深层侦听器
});

obj.count++;
```

其它情况下,可以通过设置`deep`选项属性来开启深层侦听器

```ts
watch(
  () => state.someObject,
  (newValue, oldValue) => {},
  { deep: true }
);
```

##### 即时回调地侦听器

默认情况下,侦听器中的回调函数都是懒执行的,仅当被侦听的数据源发生改变时,才会执行回调

如果希望在刚创建侦听器的时候就执行一次回调函数,可以使用`immediate`选项属性

```ts
watch(source, (newValue, oldValue) => {}, { immediate: true });
```

##### 回调函数的触发时机

默认情况下,回调函数都会在 vue 组件更新之前被调用,在回调函数中访问的 DOM 都是 vue 更新之前的状态

如果想要访问 Vue 更新之后的状态,可以使用`flush: 'post'`选项属性

```ts
watch(source, callback, {
  flush: "post",
});

watchEffect(callback, {
  flush: "post",
});
```

后置刷新的 `watchEffect() `有个更方便的别名 `watchPostEffect()`

```ts
import { watchPostEffect } from "vue";

watchPostEffect(() => {});
```

##### 停止侦听器

可以通过`watch`或者`watchEffect`返回的回到函数来手动停止一个侦听器.虽然侦听器都默认会在组件被卸载时自动停止

```ts
const unwatch = watch(source, () => {});
const unwatch = watchEffect(() => {});

// ...当该侦听器不再需要时
unwatch();
```

但是需要注意的是,异步调用的侦听器不会自动停止侦听,因此避免将侦听器进行异步调用

```ts
<script setup>
import { watchEffect } from 'vue'

// 它会自动停止
watchEffect(() => {})

// ...这个则不会！
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>
```

#### `watchEffect`

在`watch`函数中,往往需要传入第一个参数来作为那个被侦听的数据源,然后再传入第二个参数作为回调函数

如果那个被侦听的对象不仅作为一个数据源来使用,也同时在回调函数中被使用时,可以通过`watchEffect`来进行简化

```ts
const todoId = ref(1);
const data = ref(null);
watch(
  todoId,
  async () => {
    await axios
      .get(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`)
      .then((value) => {
        data.value = value.data;
      });
  },
  { immediate: true }
);
```

使用`watchEffect`对以上情况进行简化

```ts
watchEffect(async () => {
  await axios
    .get(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`)
    .then((value) => {
      data.value = value.data;
    });
});
```

在`watchEffect`函数中,只需要传入回调函数即可,会自动对回调函数中涉及到的所有依赖值进行追踪,变化时自动执行回调函数

并且`watchEffect`函数默认是立即执行的

对于只有一个依赖项的例子来说，`watchEffect()` 的好处相对较小

但是对于有多个依赖项的侦听器来说，使用 `watchEffect()` 可以消除手动维护依赖列表的负担

如果需要侦听一个嵌套数据结构中的几个属性，`watchEffect()` 可能会比深度侦听器更有效，因为它将只跟踪回调中被使用到的属性，而不是递归地跟踪所有的属性

`watchEffect` 仅会在其同步执行期间，才追踪依赖。在使用异步回调时，只有在第一个 `await`正常工作前访问到的属性才会被追踪

### 模板引用

可以通过 vue 中的一个特殊属性`ref`来对组件中的 DOM 元素或者子组件进行访问

#### DOM 元素

```vue
<template>
  <div>
    <!-- 模板引用 -->
    <p ref="pElem">some text</p>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";

// 通过ref对上面的p元素进行访问
// 需要注意的是声明的变量名要跟上述ref属性的值相同
const pElem = ref();
// 然后在组件挂载之后访问p元素
onMounted(() => {
  console.log(pElem.value.innerText); // "some Text"
});
</script>
<style scoped></style>
```

当在`v-for`中使用模板引用时,它获取到的是所有被渲染出来的列表元素,值为一个数组

```vue
<template>
    <div>
        <!-- 模板引用 -->
        <p>
        <ul>
            <li v-for="num in nums" :key="num" ref="numsElem"> {{ num }}</li>
        </ul>
        </p>
    </div>
</template>
<script setup lang='ts'>
import { onMounted, ref } from 'vue';

const nums = ref([1, 2, 3]);
const numsElem = ref();
onMounted(() => {
    console.log(numsElem.value); // 一个包含以上三个li元素的数组
    console.log(numsElem.value[0].innerText); // 1
})
</script>
<style scoped></style>
```

#### 子组件

`ref`属性也可以被添加在一个子组件上,访问当前子组件实例

```vue
<template>
  <div>
    <!-- 模板引用 -->
    <TemplateReference ref="childInstance"></TemplateReference>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";

const childInstance = ref();
onMounted(() => {
  console.log(childInstance.value); // TemplateReference子组件实例
});
</script>
<style scoped></style>
```
