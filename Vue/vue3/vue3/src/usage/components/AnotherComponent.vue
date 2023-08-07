<template>
    <div>
        <!-- 依赖提供和注入 -->
        <!-- 任意嵌套层级的子组件 -->
        <p>{{ message }}</p>
    </div>
</template>
<script setup lang='ts'>
import { inject} from 'vue';
import { messageInjectionKey } from "../../symbols";

// 子组件中注入依赖
// const message = inject("message");
// 还可以提供默认值
// const message = inject('message', 'default value')
const message = inject(messageInjectionKey)
// 默认值一般通过工厂函数来获取,避免在用不到默认值的情况下产生不必要的开销或副作用
// 此时应当传入第三个参数true,表示默认值通过工厂函数获得
// const message = inject(messageInjectionKey, () => "default value", true)
</script>
<style scoped></style>