### vue3 内置组件

#### Transition

通过内置组件`<Transition>`能够在一个元素或者组件进入或者离开 DOM 页面时运用指定的过渡或者动画样式（为方便，以下过渡或动画都简称动画，元素或组件都简称元素）

如果需要为多个元素或者组件（使用`v-for`渲染的）运用动画，可以使用内置的`<TransitionGroup>`组件

在 vue 中使用动画，除了使用以上两个内置组件外，还可以通过例如动态切换 CSS 样式的方式

`<Transition>`是一个内置组件，能够在其它任意组件中直接被使用，而无需进行注册。通过将一个元素或者组件添加在其组件元素下作为其默认插槽的插槽内容来进行动画的运用

一个元素或者组件进入或者离开 DOM 页面是指由以下事件之一导致的:

- 条件渲染，例如`v-if`、`v-show`
- 通过一个特殊的元素`<component>`触发的动态组件
- 改变`key`属性

`<Transition>`组件仅支持将单个的元素或者组件作为其默认插槽内容，来进行动画的运用，并且如果值为一个组件，该组件必须仅有单个根元素

##### 一个基本的动画效果

```vue
<script setup lang="ts">
import { ref } from "vue";

const isShow = ref(true);
</script>
<template>
  <button @click="isShow = !isShow">Toggle</button>
  <!-- 将需要运用动画的元素或者组件作为Transition组件的默认插槽内容 -->
  <Transition>
    <p v-show="isShow">hello</p>
  </Transition>
</template>
<style scoped>
/* 为内置的对应类名添加自定义的动画效果 */
/* 使用过渡，添加对应的过渡样式 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/* 使用动画，添加对应的动画样式 */
.v-enter-active {
  animation: v-in 0.5s;
}
.v-leave-active {
  animation: v-in 0.5s reverse;
}
@keyframes v-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
```

对应的 vue 底层逻辑为：先探测目标元素或者组件是否需要运用动画（是否为`<Transition>`组件的默认插槽内容）。如果是的话，则在恰当的时机为目标元素或组件添加或者移除内置指定的类名，通过对应类中的动画样式来进行动画的运用。如果存在 JS 钩子函数监听器的话，则同时在恰当的时机对钩子函数进行调用

##### 内置的动画类名

[Transition Classes](https://vuejs.org/assets/transition-classes.f0f7b3c9.png)

- `.v-enter-from`:进入前的状态。在元素进入前添加，进入后的下一帧移除
- `.v-enter-active`:进入时的状态。在元素整个进入的阶段被运用。元素进行前添加，动画完成时移除。可以用于定于动画的时长、延迟、时间函数等
- `.v-enter-to`:进入后的状态。在元素进入后的下一帧添加（`v-enter-from`移除时），在动画完成时移除
- `.v-leave-from`: 离开前的状态。当运用了动画效果的元素离开 DOM 页面被触发时添加，然后在随后一帧后移除
- `.v-leave-active`:离开时的状态。在元素整个离开的阶段被运用。在运用了动画效果的元素离开 DOM 页面被触发时添加，动画完成后移除。可以用于定于动画的时长、延迟、时间函数等
- `.v-leave-to`:离开后的状态。在运用了动画效果的元素离开 DOM 页面被触发的下一帧被添加（`v-leave-from`被移除时），动画完成时移除

##### 自定义动画类名前缀

如果需要对内置动画类名的前缀`v`进行修改，可以使用`<Transition>`组件的`name`属性

```vue
<script setup lang="ts">
import { ref } from "vue";

const isShow = ref(true);
</script>
<template>
  <button @click="isShow = !isShow">Toggle</button>
  <!-- 修改类名前缀 -->
  <Transition name="fade">
    <p v-show="isShow">hello</p>
  </Transition>
</template>
<style scoped>
/* 对应的类名及样式为 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```

##### 自定义动画类名

为了方便在 vue 中使用第三方的动画库，不仅动画类名的前缀，整个动画的类名也支持自定义

通过在`<Transition>`组件中添加以下的属性，对对应的内置类名进行覆盖:

- `enter-from-class`
- `enter-active-class`
- `enter-to-class`
- `leave-from-class`
- `leave-active-class`
- `leave-to-class`

```vue
<script setup lang="ts">
import { ref } from "vue";

const isShow = ref(true);
</script>
<template>
  <button @click="isShow = !isShow">Toggle</button>
  <!-- 修改整个类名 -->
  <Transition
    enter-active-class="animate__animated animate__tada"
    leave-active-class="animate__animated animate__bounceOutRight"
  >
    <p v-show="isShow">hello</p>
  </Transition>
</template>
<style scoped>
/* 使用第三方动画库 */
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
</style>
```

##### `type`属性

如果需要在同一个元素上同时运用动画和过渡的样式，可以在`<Transition>`组件上添加`type`属性并指定值，告诉 vue 应该监听动画或者过渡

```vue
<Transition type="animation">...</Transition>
```

##### 嵌套的过渡元素

默认情况下，`<Transition>`组件是对其默认插槽内容中的那单个元素的整体进行动画的运用，即使是一个嵌套的单个元素。如果需要对嵌套的单个元素中的某个指定的子元素运用动画，而其它元素不运用，可以结合 CSS 样式选择器以及`duration`属性实现

```vue
<script setup lang="ts">
import { ref } from "vue";

const isShow = ref(true);
</script>
<template>
  <button @click="isShow = !isShow">Toggle</button>
  <!-- 需要添加duration属性，值为子元素中所有动画整个执行过程中的总时长（包括delay等），避免其顶层父元素提前结束动画，导致无动画效果 -->
  <Transition :duration="1500">
    <div v-if="isShow" class="outer">
      <!-- 不会添加动画 -->
      <h3>title</h3>
      <!-- 添加动画 -->
      <div class="inner">Hello</div>
    </div>
  </Transition>
</template>
<style scoped>
/* 结合CSS样式选择器，指定.outer元素（嵌套单个元素的顶层元素）下的.inner子元素运用动画效果。其它子元素则不运用 */
.v-enter-active .inner,
.v-leave-active .inner {
  transition: all 1s ease-in-out;
  transition-delay: 0.25;
}

.v-enter-from .inner,
.v-leave-to .inner {
  transform: translateX(30px);
  opacity: 0;
}
</style>
```

对于`duration`属性，还可以指定一个对象作为值来分别指定 enter 和 leave 时的动画时长

```vue
<Transition :duration="{ enter: 500, leave: 800 }">...</Transition>
```

##### 动画性能考量

在运用动画的过程中，尽量使用例如`transform`和`opacity`等的属性，因为它们不会导致页面的重绘，造成巨大的重渲染开支

避免使用`height`和`margin`等属性

可以通过该网站[CSS-Triggers](https://csstriggers.com/)来查看哪些属性会导致页面的重绘

##### JS 动画

元素动画的样式，除了在 CSS 中通过添加样式规则来指定外，还可以在动画 JS 钩子函数中通过添加元素在对应时机的动态样式来实现

##### 可复用的 Transition

通过将`<Transition>`组件封装成一个自定义的组件，可以对 Transition 进行复用。使用时导入并注册自定义的组件来使用即可

将一个指定的动画效果进行封装

```vue
<script setup lang="ts">
function onEnter(el) {
  el.style.animation = "t-in 0.5s";
}

function onLeave(el) {
  el.style.animation = "t-in 0.5s";
}
</script>
<template>
  <Transition name="t" @enter="onEnter" @leave="onLeave">
    <slot></slot>
  </Transition>
</template>
<style>
/* 因为动画的样式不是作用域当前组件内的元素,所以不用添加scoped */
@keyframes t-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}
</style>
```

使用动画

```vue
<script setup lang="ts">
import { ref } from "vue";
import TTransition from "./TTransition.vue";
const isShow = ref(true);

function onClick() {
  isShow.value = !isShow.value;
}
</script>
<template>
  <button @click="onClick">toggle</button>
  <TTransition>
    <p v-show="isShow">Hello</p>
  </TTransition>
</template>
<style scoped></style>
```

##### 立即触发动画

可以使用`appear`属性,在元素第一次被渲染时将动画进行触发

```vue
<Transition appear>
  ...
</Transition>
```

##### 多个元素之间动态切换的动画

```vue
<script setup lang="ts">
import { ref } from "vue";
const docState = ref("saved");
const docStates = ref(["saved", "edited", "editing"]);

function onClick() {
  docState.value = docStates.value[Math.floor(Math.random() * 3)];
}
</script>
<template>
  <Transition appear name="slide-up">
    <button @click="onClick" v-if="docState === 'saved'">Edit</button>
    <button @click="onClick" v-else-if="docState === 'edited'">Save</button>
    <button @click="onClick" v-else-if="docState === 'editing'">Cancel</button>
  </Transition>
</template>
<style scoped>
.btn-container {
  display: inline-block;
  position: relative;
  height: 1em;
}

button {
  position: absolute;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
```

还可以添加`mode`属性来决定元素先触发离开还是进入时的动画

```vue
<!-- 先触发离开的动画 -->
<Transition mode="out-in">
  ...
</Transition>
<!-- 先触发进入的动画 -->
<Transition mode="in-out">
  ...
</Transition>
```

##### 组件间的动画

通过使用动态组件`<component>`可以在不同组件的动态切换之间使用动画效果

动态组件`<component :is="currentComponent"></component>`

`is`的值为被导入注册的组件名或者组件本身,代表当时正展示的组件

```vue
<script setup lang="ts">
import Home from "./Home.vue";
import Post from "./Post.vue";
import Archive from "./Archive.vue";
import { h, ref } from "vue";

const currentComponent = ref(Home);

function onClick(newCurrentComponent) {
  currentComponent.value = newCurrentComponent;
}
</script>
<template>
  <div>
    <a @click="onClick(Home)">Home</a>
    <a @click="onClick(Post)">Post</a>
    <a @click="onClick(Archive)">Archive</a>
  </div>

  <div>
    <!-- 动态切换当时正展示的组件,为切换过程添加动画效果 -->
    <Transition appear name="slide-up">
      <component :is="currentComponent"></component>
    </Transition>
  </div>
</template>
<style scoped>
.btn-container {
  display: inline-block;
  position: relative;
  height: 1em;
}

button {
  position: absolute;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
```

##### 动态的 Transition

通过为`<Transition>`指定一个动态的`name`属性来实现一个动态的 Transition

```vue
<Transition :name="transitionName">
  <!-- ... -->
</Transition>
```

#### TransitionGroup

TransitionGroup 与 Transition 的区别在于:

- 默认情况下,不会渲染多个子元素的那个容器元素,而是对多个列表子元素进行动画效果的渲染,同时也可以传入`tag`属性来指定一个元素作为容器元素进行渲染
- `mode`属性在此处无效果
- 每个列表子元素都必须有其对应的单独的`key`属性

```vue
<script setup lang="ts">
import { ref } from "vue";
const items = ref([1, 2, 3, 4, 5]);

function add() {
  items.value.push(6);
}
function remove() {
  items.value.pop();
}
</script>
<template>
  <!-- ul为容器元素 -->
  <button @click="add">add</button>
  <button @click="remove">remove</button>
  <TransitionGroup name="list" tag="ul">
    <!-- 为每个li元素添加单独的相同的动画效果 -->
    <li v-for="item in items" :key="item">
      <p>{{ item }}</p>
    </li>
  </TransitionGroup>
</template>
<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
```

##### `v-move`

可以通过`v-move`动画类名对元素的移动过程添加动画效果

```css
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
```

##### 结合 JS 钩子使用

```vue
<script setup lang="ts">
import { ref, computed } from "vue";
import gsap from "https://unpkg.com/gsap?module";
const list = [
  { msg: "Bruce Lee" },
  { msg: "Jackie Chan" },
  { msg: "Chuck Norris" },
  { msg: "Jet Li" },
  { msg: "Kung Fury" },
];

const query = ref("");

const computedList = computed(() => {
  return list.filter((item) =>
    item.msg.toLowerCase().includes(query.value.toLowerCase())
  );
});

function onBeforeEnter(el) {
  el.style.opacity = 0;
  el.style.height = 0;
}

function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    height: "1.6em",
    delay: el.dataset.index * 0.15,
    onComplete: done,
  });
}

function onLeave(el, done) {
  gsap.to(el, {
    opacity: 0,
    height: 0,
    delay: el.dataset.index * 0.15,
    onComplete: done,
  });
}
</script>
<template>
  <input v-model="query" />
  <TransitionGroup
    tag="ul"
    :css="false"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
  >
    <li
      v-for="(item, index) in computedList"
      :key="item.msg"
      :data-index="index"
    >
      {{ item.msg }}
    </li>
  </TransitionGroup>
</template>
<style scoped></style>
```

#### KeepAlive

在组件的动态切换中,一个组件的切换包含了组件的卸载和再挂载的过程,如果频繁切换,可能导致大量性能消耗的问题

但是,通过`<KeepAlive>`组件来对一个组件实例进行缓存,保存其切换前的状态,使其在切换过程中不被卸载

```vue
<script setup lang="ts">
import { ref } from "vue";
import ComponentA from "./ComponentA.vue";
import ComponentB from "./ComponentB.vue";

const currentComponent = ref(ComponentA);

function switchComponent(newComponent) {
  currentComponent.value = newComponent;
}
</script>
<template>
  <a @click="switchComponent(ComponentA)">ComponentA</a>
  <a @click="switchComponent(ComponentB)">ComponentB</a>

  <KeepAlive>
    <component :is="currentComponent"></component>
  </KeepAlive>
</template>
<style scoped></style>
```

##### `include`/`exclude`

默认情况下,KeepAlive 会将动态切换过程中的所有组件进行缓存

通过`include`/`exclude`属性,可以指定哪些组件应当/不应当被缓存

其值为一个或多个组件的组件名,通过组件实例中声明的`name`属性的值

在版本**3.2.34**之后,使用组合式 API 语法(`<script setup>`)中,会自动根据`.vue`文件的文件名来推断当前组件实例的组件名,不需要额外声明`name`属性

```vue
<template>
  <!-- 值可以为,分隔的多个字符串 -->
  <KeepAlive include="a,b">
    <component :is="currentComponent" />
  </KeepAlive>

  <!-- 值可以为一个正则表达式 -->
  <KeepAlive :include="/a|b/">
    <component :is="currentComponent" />
  </KeepAlive>

  <!-- 值可以为一个数组 -->
  <KeepAlive :include="['a', 'b']">
    <component :is="currentComponent" />
  </KeepAlive>
</template>
```

##### 最大缓存数量

可以通过`max`属性来指定组件被缓存的最大的数量.当超过这个值时,被访问的距离时间最长的那个组件将被销毁

```vue
<template>
  <KeepAlive :max="10">
    <component :is="currentComponent" />
  </KeepAlive>
</template>
```

##### 被缓存的组件的声明周期钩子

在 KeepAlive 下的组件,称那些未在 DOM 页面中展示的组件的状态为**deactivated**,那个在 DOM 页面中进行展示的组件状态为**activated**.对应的钩子函数分别为`onDeactivated`和`onActivated`

```vue
<script setup>
import { onActivated, onDeactivated } from "vue";

// 在组件(包含其子组件)进行初始化渲染,以及之后每次被重新插入到DOM页面中时调用
onActivated(() => {});

// 在组件(包含其子组件)被卸载,以及之后每次从DOM页面中移除时调用
onDeactivated(() => {});
</script>
```
