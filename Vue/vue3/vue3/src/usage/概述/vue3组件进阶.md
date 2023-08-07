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

#### prop 规范

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
  <BlogPost />
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
    <!-- 一次性将多个props进行传递 -->
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

### 组件事件回调函数传递

除通过属性传值`defineProps`将数据从父组件向子组件传递外

vue 中还可以通过`defineEmits`将事件回调函数从父组件传递到子组件

#### 声明要传递的事件回调函数名

```vue
<template>
  <div>
    <!-- 组件事件回调函数传递 -->
  </div>
</template>
<script setup lang="ts">
// 声明要接收的事件回调函数
const emit = defineEmits(["sayHello"]);
// 或者
interface Emit {
  (e: "sayHello"): void;
}
const emit = defineEmits<Emit>();
</script>
<style scoped></style>
```

#### 对事件回调函数进行传递

```vue
<template>
  <!-- 通过组件进行事件回调函数的传递 -->
  <Emits @say-hello="sayHello"></Emits>
</template>
<script setup lang="ts">
const sayHello = () => console.log("hello");
</script>
```

#### 触发接收到的事件回调函数

```vue
<template>
  <div>
    <!-- 组件事件回调函数传递 -->
    <button @click="clickFn">click</button>
    <!-- 或者 -->
    <button @click="$emit('sayHello')">click</button>
  </div>
</template>
<script setup lang="ts">
// 声明要接收的事件回调函数
const emit = defineEmits(["sayHello"]);
const clickFn = () => {
  // 对接收到的事件事件回调函数进行触发
  emit("sayHello");
};
</script>
<style scoped></style>
```

#### 注意事项

- 组件的事件回调函数同时也支持`.once`修饰符

```vue
<template>
  <MyComponent @some-event.once="callback" />
</template>
```

- 事件回调函数名的命名规范与 prop 相同
- 组件触发的事件没有冒泡机制

#### 参数处理

```vue
<template>
  <div>
    <!-- 组件事件回调函数传递 -->
    <button @click="clickFn">click</button>
  </div>
</template>
<script setup lang="ts">
// 声明要接收的事件回调函数
const emit = defineEmits(["increaseBy"]);
const clickFn = () => {
  // 对接收到的事件回调函数进行触发
  emit("increaseBy", 1);
};
</script>
<style scoped></style>
```

```vue
<template>
  <div class="container">
    <!-- 通过组件进行事件回调函数的传递 -->
    <Emits @increase-by="increaseBy"></Emits>
  </div>
</template>
<script setup lang="ts">
import Emits from "./usage/basicUsage/Emits.vue";
const count = ref(0);
const increaseBy = (n: number) => (count.value += n);
</script>
<style scoped></style>
```

### 组件 v-model

#### 子组件上实现

结合`defineProps`和`defineEmits`就可以像原生元素一样在组件上使用`v-model`

在组件上，`v-model`的实质为:

```vue
<!-- 父组件 -->
<template>
  <CustomInput
    :modelValue="searchText"
    @update:modelValue="(newValue) => (searchText = newValue)"
  />
</template>
<script setup>
import { ref } from "vue";
const searchText = ref("");
</script>
```

在子组件中声明`modelValue`属性，并将其跟`input`元素的`value`属性进行绑定，然后声明`update:modelValue`事件回调函数，就可以实现`searchText`和`CustomInput`子组件中`input`元素的双向绑定

```vue
<!-- CustomInput.vue -->
<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

现在，可以直接在组件中使用`v-model`了

```vue
<template>
  <CustomInput v-model="searchText" />
</template>
```

组件 v-model 的核心逻辑都在于子组件上的对应实现，在父组件上只需要添加例如`v-model="searchText"`即可

上面展示了一种在子组件上的实现方式

还有另外一种的实现方式:

```vue
<!-- CustomInput.vue -->
<script setup>
import { computed } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

// 添加一个额外的value变量
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <input v-model="value" />
</template>
```

#### 自定义 v-model 的参数

默认情况下，组件上的 v-model 其 prop 为`modelValue`,对应的事件为`update:modelValue`，参数为`modelValue`

但是，可以在使用时通过以下方式来对参数名进行修改

```vue
<template>
  <!-- 将参数modelValue改为title -->
  <CustomInput v-model:title="searchText" />
</template>
```

在子组件中，对应的实现为:

```vue
<!-- CustomInput.vue -->
<script setup>
defineProps(["title"]);
defineEmits(["update:title"]);
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```

#### 多个组件 v-model

在一个子组件上也可以使用多个 v-model 来绑定多个值，每个被绑定的值都对应各自不同的子组件中的原生元素，有着各自的事件监听处理程序，互不影响

```vue
<template>
  <!-- 在一个组件上声明多个v-model -->
  <CustomInput v-model:first-name="firstName" v-model:last-name="lastName" />
</template>
```

```vue
<script setup>
defineProps({
  firstName: String,
  lastName: String,
});

defineEmits(["update:firstName", "update:lastName"]);
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```

#### 自定义修饰符

v-model 除了支持一些内置的修饰符，例如`.trim`、`.number`外，还支持自定义的修饰符

在子组件中创建指定修饰符的实现逻辑以及对修饰符进行使用的逻辑

```vue
<!-- CustomInput.vue -->
<script setup>
const props = defineProps({
  modelValue: String,
  // 用于存放所有使用的自定义修饰符，默认值为{}
  modelModifiers: { default: () => ({}) },
});

const emit = defineEmits(["update:modelValue"]);

// .capitalize修饰符的实现逻辑
const capitalizeFirstLetter = (value) => {
  value.charAt(0).toUpperCase() + value.slice(1);
};

function emitValue(e) {
  let value = e.target.value;
  // 对.capitalize修饰符进行使用
  if (props.modelModifiers.capitalize) {
    capitalizeFirstLetter(value);
  }
  // 触发事件回调函数
  emit("update:modelValue", value);
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

在父组件中添加自定义修饰符进行使用

```vue
<template>
  <CustomInput v-model.capitalize="myText" />
</template>
```

如果使用修饰符的同时还带有 v-model 参数，则使用方式为:

```vue
<template>
  <CustomInput v-model:title.capitalize="myText" />
</template>
```

相应的子组件处理为:

```ts
const props = defineProps(["title", "titleModifiers"]);
defineEmits(["update:title"]);

console.log(props.titleModifiers); // { capitalize: true }
```

一个结合多组件 v-model、v-model 参数和修饰符的使用例子:

```vue
<template>
  <CustomInput
    v-model:first-name.capitalize="first"
    v-model:last-name.uppercase="last"
  />
</template>
```

```ts
<script setup>
const props = defineProps({
  firstName: String,
  lastName: String,
  firstNameModifiers: { default: () => ({}) },
  lastNameModifiers: { default: () => ({}) }
})
defineEmits(['update:firstName', 'update:lastName'])

console.log(props.firstNameModifiers) // { capitalize: true }
console.log(props.lastNameModifiers) // { uppercase: true}
</script>
```

### 透传属性

透传属性是指那些被添加在子组件上，且不属于任何 props 或者 emits 的属性，例如`class`、`style`或者`id`

这些属性会自动地添加(继承)到子组件的根元素/根组件上

举例来说，假如我们有一个 `<MyButton>` 组件，它的模板长这样：

```vue
<template>
  <!-- 根元素 -->
  <button>click me</button>
</template>
```

在其父组件中为子组件添加`class`属性

```vue
<template>
  <MyButton class="large" />
</template>
```

最后渲染出的 DOM 结果是

```html
<button class="large">click me</button>
```

#### `class`或者`style`的自动合并

如果在子组件的根元素上已经存在了`class`或者`style`属性，则它们会进行合并

```vue
<template>
  <!-- 根元素 -->
  <button class="btn">click me</button>
</template>
```

透传`class='large'`属性后，最后渲染出的 DOM 结果会变成

```html
<button class="btn large">click me</button>
```

#### 透传事件

类似于属性的透传，事件监听器也能够实现从父组件透传到子组件根元素

```vue
<!-- 透传事件，该click事件及对应的事件监听器将透传至子组件CustomButton的根元素上 -->
<CustomButton @click="logHello"></CustomButton>
```

#### 访问透传过来的属性或事件

通过`$attrs`属性可以子组件中访问父组件透传过来的属性或事件

```vue
<template>
  <!-- 透传-->
  <div class="btn btn__primary">
    <p>Button</p>
    {{ $attrs.onClick }}
    <!-- 值为() => console.log("hello") -->
    {{ $attrs.class }}
    <!-- 值为foo-bar -->
  </div>
</template>
<script setup lang="ts">
import { useAttrs } from "vue";

// 访问透传过来的内容
const attrs = useAttrs();
console.log(attrs.class); // "foo-bar"
console.log(attrs.onClick); // "() => console.log("hello")"
</script>
```

对应的父组件为

```vue
<template>
<CustomButton class="foo-bar" @click="() => console.log("hello")"></CustomButton>
</template>
```

#### 禁用透传属性

如果不希望一个组件将属性或者事件透传给其子组件的根元素或根组件，可以设置` inheritAttrs: false`

```vue
<script setup>
defineOptions({
  inheritAttrs: false,
});
</script>
```

#### 透传至内部的元素是

默认情况下，透传的属性或事件都是传递给子组件的根元素的，但是可以使用` inheritAttrs: false`和`v-bind="$attrs"`属性来将透传的内容添加到指定的内部元素上

```vue
<template>
  <!-- 将透传的内容添加到内部元素上 -->
  <div>
    <div v-bind="$attrs" class="btn btn__primary">
      <p>Button</p>
    </div>
  </div>
</template>
<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
</script>
```

#### 多个根元素的透传

如果子组件中存在多个根元素，则需要为其中一个或多个根元素设置`v-bind="$attrs"`属性，透传的内容将被添加到对应的根元素上。如果一个都未添加，将报错

```vue
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```

### 插槽

通过`defineProps`、`defineEmits`和透传，能够将属性或者事件由父组件向子组件进行传递，这些都属性 JS 值的传递

同时，通过插槽能够将模板内容由父组件向子组件传递

当我们不需要使用插槽中，在父组件中添加子组件是这样的:

```vue
<template>
  <div>
    <ChildComponent></ChildComponent>
    <!-- 使用prop、emit或者透传 -->
    <ChildComponent
      class="large"
      :title="myTitle"
      @change="onChange"
    ></ChildComponent>
  </div>
</template>
```

当需要使用插值时，将要传递的模板内容定义在子组件下即可

```vue
<template>
  <div>
    <ChildComponent>
      <!-- 插槽内容 -->
      <p>hello</p>
      <button>click</button>
    </ChildComponent>
  </div>
</template>
```

上述被传递的模板内容成为插槽内容，要想在子组件中接收传递的模板内容，需要定义插槽出口

```vue
<!-- ChildComponent.vue -->
<template>
  <div>
    <!-- 插槽出口 -->
    <!-- 插槽内容会将<slot></slot>替换，在这里渲染插槽内容 -->
    <slot></slot>
  </div>
</template>
```

#### 默认内容

可以在子组件中指定插槽的默认内容，在父组件中没有提供任何插槽内容的时候进行渲染

```vue
<!-- ChildComponent.vue -->
<template>
  <button>
    <slot>
      <!--插槽的默认内容 -->
      click
    </slot>
  </button>
</template>
```

#### 具名插槽

当在子组件中定义了多个插槽出口时，可以通过为插槽出口指定名字来方便插槽内容的渲染

```vue
<!-- ChildComponent.vue -->
<template>
  <div class="container">
    <header>
      <!-- 拒具名插槽 -->
      <!-- 提供name属性，方便插槽内容的渲染 -->
      <slot name="header"></slot>
    </header>
    <main>
      <!-- 未提供name属性，则等价于默认提供name='default' -->
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
```

对应地，在父组件中通过在插槽内容中的`<template>`元素上提供`v-slot:slotName`(或者简写`#slotName`)来将当前的插槽内容渲染到对应指定的插槽出口上

```vue
<template>
  <div>
    <ChildComponent>
      <!-- 插槽内容 -->
      <!-- 渲染到name='header'插槽下 -->
      <template #header>
        <h1>header content</h1>
      </template>

      <!-- 动态插槽名 -->
      <!-- <template v-slot:[dynamicSlotName]> -->
      <!-- <h1>header content</h1> -->
      <!-- </template> -->
      <!-- 或者 -->
      <!-- <template #[dynamicSlotName]> -->
      <!-- <h1>header content</h1> -->
      <!-- </template> -->

      <!-- 渲染到name='default'插槽下 -->
      <template #default>
        <p>main content</p>
        <p>main content</p>
      </template>

      <!-- 渲染到name='footer'插槽下 -->
      <template #footer>
        <p>footer content</p>
      </template>
    </ChildComponent>
  </div>
</template>
```

并且，在父组件中，所有没有位于插槽内容中顶层`<template>`中的内容都默认表示被渲染在默认插槽下

因此，上面的内容就等价于

```vue
<template>
  <div>
    <ChildComponent>
      <!-- 插槽内容 -->
      <!-- 渲染到name='header'插槽下 -->
      <template #header>
        <h1>header content</h1>
      </template>

      <!-- 渲染到name='default'插槽下 -->
      <p>main content</p>
      <p>main content</p>

      <!-- 渲染到name='footer'插槽下 -->
      <template #footer>
        <p>footer content</p>
      </template>
    </ChildComponent>
  </div>
</template>
```

#### 作用域插槽

默认情况下，插槽内容(位于父组件内)都无法访问到对应子组件作用域中的，但是可以通过作用域插槽将子组件中的数据由子组件向父组件传递，以便插槽内容内能够访问

```vue
<!-- ChildComponent.vue -->
<template>
  <div>
    <!-- 通过作用域插槽将以下内容向父组件中的插槽内容中传递 -->
    <slot text="hello" :count="1"></slot>

    <!-- 结合具名插槽使用 -->
    <slot name="header" headerText="header"></slot>
    <slot name="default" defaultText="default"></slot>
    <slot name="footer" footerText="footer"></slot>
  </div>
</template>
```

```vue
<template>
  <div>
    <!-- 父附件中通过v-slot来对子组件中传递的内容进行接收 -->
    <ChildComponent v-slot="slotProps">
      <!-- 插槽内容 -->
      <p>{{ slotProps.text }}</p>
      <span>{{ slotProps.count }}</span>
    </ChildComponent>

    <!-- 或者使用对象的解构语法 -->
    <ChildComponent v-slot="{ text, count }">
      <!-- 插槽内容 -->
      <p>{{ text }}</p>
      <span>{{ count }}</span>
    </ChildComponent>

    <!-- 或者结合具名插槽使用 -->
    <ChildComponent v-slot="{ text, count }">
      <!-- 插槽内容 -->
      <template #header="headerProps">
        <p>{{ headerProps }}</p>
      </template>
      <!-- 默认插槽应当显式标出 -->
      <template #default="defaultProps">
        <p>{{ defaultProps }}</p>
      </template>
      <template #footer="footerProps">
        <p>{{ footerProps }}</p>
      </template>
    </ChildComponent>
  </div>
</template>
```
