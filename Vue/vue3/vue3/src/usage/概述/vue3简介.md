## vue3 简介

vue 是一款用于构建用户界面的 JS 框架，基于 HTML、CSS 和 JS 构建，并提供一套声明式、组件化的编程模型

- 声明式渲染:vue 基于标准的 HTML 扩展了一套模板语法(`<template>`)，在该语法内声明式地描述最终输出的 HTML 和 JS 状态之间的关系
  ```vue
  <template>
    <div id="app">
      <button @click="count++">Count is : {{ count }}</button>
    </div>
  </template>
  <script>
  import { createApp, ref } from "vue";
  createApp({
    setup() {
      return {
        count: ref(0),
      };
    },
  }).mount("#app");
  </script>
  ```
- 组件化:一个.vue 文件就是一个组件，其中集合了所需的 HTML、CSS 和 JS
- 响应式:vue 自动追踪 JS 中依赖的变化，并响应式地更新 DOM

### 渐进式使用 vue

#### 独立脚本

将 vue 当作一个单独的 JS 文件进行使用,在导入之后直接对 vue 的语法进行使用,不需要任何构建

相应的不需要构建步骤的轻量版本:[petite-vue](https://github.com/vuejs/petite-vue)

```html
<!-- 在这里书写所需的html内容 -->
<script src="https://unpkg.com/petite-vue"></script>
<script>
  // 导入vue脚本文件后，在这里对vue进行使用
  // 例如将vue挂载到指定的容器上，进行vue响应式页面的渲染等
</script>
```

#### 作为 Web Component 嵌入使用

使用 vue 来构建标准的 Web Component,然后将其嵌入到任何 HTML 页面中

TODO : 进入[Vue 与 Web Components](https://cn.vuejs.org/guide/extras/web-components.html),对此处进行完善

#### 单页面应用(SPA)

通过使用 vue 组件,vue 不仅能够响应式地渲染页面,还能够完成数据的后端获取以及本地处理,能够在不重新加载页面的前提下进行页面的切换等

以上这些功能的实现依赖于[全面的工具链支持](https://cn.vuejs.org/guide/scaling-up/tooling.html)

在构建页面,向后端获取数据时,除了要求后端提供 API 数据接口外,还可以搭配例如[Inertia.js](https://inertiajs.com/)之类的无需任何 API 的解决方案进行使用

TODO : 进入[全面的工具链支持](https://cn.vuejs.org/guide/scaling-up/tooling.html),对此处进行完善

#### 全栈/服务端渲染(SSR)

将 HTML 的渲染交给服务器进行处理,服务器返回渲染之后的 HTML 页面,避免因加载 JS 而导致首屏加载时间过长的问题

它能够很好地改善前端页面的性能,例如[最大内容绘制 (LCP)](https://web.dev/lcp/)

使用时,可以搭配例如[NuxtJS](https://nuxt.com/)框架进行使用

TODO : 进入[服务端渲染 (SSR)](https://cn.vuejs.org/guide/scaling-up/ssr.html),对此处进行完善

#### 静态站点生成(SSG)

将整个应用都在服务端将其预渲染为 HTML,然后将其返回.这要求所需的数据是静态的,不会进行数据的动态请求,这样才能够将 HTML 作为静态文件进行部署

这也称为[JAMStack](https://jamstack.org/what-is-jamstack/)

vue 维护的一个静态站点生成器:[VitePress](https://vitepress.dev/)

#### 构建 web 之外的更多应用

- 结合[Electron](https://www.electronjs.org/)或者[Tauri](https://tauri.app/)构建桌面应用
- 结合[ Ionic Vue ](https://ionicframework.com/docs/vue/overview)构建移动端应用
- 使用[Quasar](https://quasar.dev/)用同一套代码同时开发桌面端和移动端应用
- 使用 Vue 的[自定义渲染 API](https://cn.vuejs.org/api/custom-renderer.html)来构建不同目标的渲染器，比如 [WebGL](https://troisjs.github.io/examples/demos/1.html)甚至是[终端命令行](https://github.com/vue-terminal/vue-termui)！

### 单文件组件

一种类似于 HTML 格式的文件,将一个组件的逻辑(JS),模板(template)和样式(CSS)封装在同一个文件中,并以`.vue`作为文件的后缀.其中模板是一种声明式渲染的 HTML

```vue
<script setup>
import { ref } from "vue";
const greeting = ref("Hello World!");
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
```

使用单文件组件具有以下优点

- 书写熟悉的 HTML,CSS 和 JS 语法
- 将一个组件所需的强关联的 HTML,CSS 和 JS 集中在一个文件中
- 预编译模板,避免运行时的编译开销
- 组件作用域内的 CSS
- 使用组合式 API 时更简单的语法
- 通过交叉分析模板和逻辑代码进行更多的编译时优化
- 提供自动补全和模板内表达式的类型检查等 IDE 支持
- 模块热更新(HMR)支持

对于一个单文件组件,在编译阶段会在底层交由[@vue/compiler-sfc](https://github.com/vuejs/core/tree/main/packages/compiler-sfc)将其转换为一个标准的 JS 文件和 CSS 文件,转换之后可以在其它ES模块中进行导入使用

```js
import MyComponent from "./MyComponent.vue";
```

可以在这里看到一个单文件组件被编译后的样子:[Vue SFC 演练场](https://play.vuejs.org/#eNp9kUFLwzAUx79KfJcqzA3ZbXQDlYF6UFHBSy6je+sy0yQkL7NQ+t19SVn1ILv1/X//l/7SdnDr3PQYERZQhsorRyIgRbeSRjXOehKd8LgTvdh524iCq4U00lTWBBJNqMUy8cviAbW24tN6vb0orqQpZ8NxfBAPhI3TG0KehCj3N6uuy8t9X854yqkyLpI4Xjd2i3opgbkERuVs3IYJUOBX71Q9PQRr2LpLuxIq2zil0b84UqwmYSEySWzDZt9POSMfcXLKqz1WX//kh9CmTMKrx4D+iBJGRhtfIw14/f6MLT+PkM2j5vYZ+IbB6pgch9pdNFvW/tPLto/52ytTf4R1S2jC6VJJNDX73JfA/+P+zNV/defTed6Tpof+B7x8phs=)

### 线上尝试 vue

[官网演练场](https://play.vuejs.org/#eNp9kVFLwzAQx7/KeS9TmBuyt1EHKgP1QUUFX/JS2lvXmSYhucxC6Xf32tLqwxiEJPf/X5Lf5Rq8c25xjIRrTELmS8cbZah21jPktEujZmiUAchTTi+vhj2AJ47ejBFAFYo1zB5Jawtf1uv8YjZYbbfIJCNZTg9IwFQ5nTJJBJDsbzZN090CbZssJerV0rjIcLyubE76VqH4CsVKltNpnCOHzJpdWSwOwRqpo4dSmNnKlZr8q+PSmqBwPeIqTIXz57nX2Eeaj3q2p+z7hH4IdacpfPMUyB9J4eRx6gviwd5+vFAt+8kU8qgl+4z5TsHq2DEOaffR5IL9L6+nfaq6npSm+AzbmsmEsagOtP/kPl+hNPPhTOl/uKvFamwOtr/4aany)

不使用任何构建工具的原始 HTML: [JSFiddle](https://jsfiddle.net/yyx990803/2ke1ab0z/)

使用构建工具:[ StackBlitz ](https://stackblitz.com/edit/vitejs-vite-tkqzer?file=index.html&terminal=dev)

### 使用 vue3

#### 通过构建工具

使用 Vite 构建工具创建一个单页应用

```bash
npm init vue@latest
```

或者

```bash
npm init vite
```

#### 通过 CDN

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

相关的 CDN 服务有:

- [unpkg](https://unpkg.com/)
- [jsdelivr](https://www.jsdelivr.com/package/npm/vue)
- [cdnjs](https://cdnjs.com/libraries/vue)

##### 使用全局构建版本 Vue 的 CDN

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">
  <p>{{ message }}</p>
  <p>{{count}}</p>
  <button @click="addCount">+</button>
</div>

<script>
  // 此时Vue变量已经从上述的CDN中进行了构建,并作为了一个全局的对象,可直接使用
  console.log(Vue);
  // 每次可直接从Vue中解构所需要的属性来进行使用
  const { createApp, ref } = Vue;

  createApp({
    setup() {
      const message = ref("Hello vue!");
      const count = ref(0);
      const addCount = () => count.value++;
      return {
        message,
        count,
        addCount,
      };
    },
  }).mount("#app");
</script>
```

##### 使用 ES 模块构建版本的 CDN

```html
<div id="app">
  <p>{{ message }}</p>
  <p>{{count}}</p>
  <button @click="addCount">+</button>
</div>

<script type="module">
  // 此时没有全局的构建后的Vue变量被提供
  // 需要导入所需的内容时,每次都需要从CDN链接中进行导入
  import {
    createApp,
    ref,
  } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

  createApp({
    setup() {
      const message = ref("Hello vue!");
      const count = ref(0);
      const addCount = () => count.value++;
      return {
        message,
        count,
        addCount,
      };
    },
  }).mount("#app");
</script>
```

但是,可以通过使用使用 Import maps (导入映射表)来声明一个 vue 变量,并将其与 CDN 链接进行映射,每次改而从该变量中导入内容来使用

[浏览器兼容情况](https://caniuse.com/import-maps)

```html
<div id="app">
  <p>{{ message }}</p>
  <p>{{count}}</p>
  <button @click="addCount">+</button>
</div>
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<script type="module">
  // vue已和上述的CDN建立了映射关系,可直接从vue中进行导入
  import { createApp, ref } from "vue";

  createApp({
    setup() {
      const message = ref("Hello vue!");
      const count = ref(0);
      const addCount = () => count.value++;
      return {
        message,
        count,
        addCount,
      };
    },
  }).mount("#app");
</script>
```
