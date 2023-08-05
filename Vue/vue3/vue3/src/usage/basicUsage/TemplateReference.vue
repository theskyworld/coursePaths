<template>
    <div>
        <!-- 模板引用 -->
        <p ref="pElem">some text</p>
        <p>
        <ul>
            <li v-for="num in nums" :key="num" ref="numsElem"> {{ num }}</li>
        </ul>
        </p>
    </div>
</template>
<script setup lang='ts'>
import { onMounted, ref } from 'vue';

// 通过ref对上面的p元素进行访问
// 需要注意的是声明的变量名要跟上述ref属性的值相同
const pElem = ref();
// 然后在组件挂载之后访问p元素
onMounted(() => {
    console.log(pElem.value.innerText); // "some Text"
})


const nums = ref([1, 2, 3]);
const numsElem = ref();
onMounted(() => {
    console.log(numsElem.value); // 一个包含以上三个li元素的数组
    console.log(numsElem.value[0].innerText); // 1
})
</script>
<style scoped></style>