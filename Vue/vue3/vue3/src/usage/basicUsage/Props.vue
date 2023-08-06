<template>
    <div>
        <!-- 组件属性传值 -->
        <!-- <p>{{ prop1 }}</p> -->
        <!-- <p>{{ prop2 }}</p> -->
        <p>{{ name }}</p>
        <p> {{ age }}</p>
        <p>{{ doubleAge }}</p>
    </div>
</template>
<script setup lang='ts'>
import { computed } from 'vue';

// 声明所需要传递的属性
// const props = defineProps(['prop1', 'prop2', "isTrue"]);
// 或者使用一个对象，能够对传递的属性进行配置
// const props = defineProps({
//     myStr: {
//         type: String, // 类型
//         required: true, // 是否必须传递
//     },
//     myNum: Number,
// });
// 或者使用TS类型
// interface Props {
//     // 声明要传递的属性名及其类型
//     num: number;
//     str: string;
// }
// const props = defineProps<Props>();


// 传递之后，可以通过defineProps的返回值来访问传递的属性
// console.log(props.prop1, props.prop2); // "prop1Value" "prop2Value"

const props = defineProps(["name", 'age']);
// props.name = ' Alice2'; // 报错

// 如果想要获取修改后的值，可以使用计算属性完成
const doubleAge = computed(() => props.age * 2);
</script>
<style scoped></style>