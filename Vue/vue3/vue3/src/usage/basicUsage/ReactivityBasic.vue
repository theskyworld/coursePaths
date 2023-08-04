<template>
    <div class="container">
        <!-- 响应式基础 -->
        <p>{{ count }}</p>
        <button @click="increaseCount">increase</button>
        <p>{{ objRef }}</p>
        <button @click="clickFn">click</button>
        <button @click="state.count++">{{ state.count }}</button>
        <button @click="person.nested.age++">{{ person.nested.age }}</button>
        <button @click="state1.count++">{{ state1.count }}</button>
        <button @click="addCountNum">{{ state2.countNum }}</button>
        <button @click="clickFn2">{{ state2.countNum }}</button>
        <p>{{ numObj.num }}</p>

        <p>{{ count + 1 }}</p>
        <!-- <p>{{ obj.id + 1 }}</p> -->
        <p>{{ obj.id.value + 1 }}</p>
        <p>{{ id + 1 }}</p>
    </div>
</template>
<script setup lang="ts">
import { nextTick, reactive, ref } from "vue";

// ref
// 推荐使用ref来声明响应式状态
const count = ref(0);
const increaseCount = () => count.value++;

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
    console.log(objRef.value.nested.count)
};
// nextTick();


// reactive
const state = reactive({
    count: 0,
})
// 深层响应式
const person = reactive({
    nested: {
        age: 12,
    },
    name: 'Alice',
})

// 响应式丢失
const raw1 = { count: 0 };
const raw2 = { count: 1 };
let state1 = reactive(raw1);
// 将raw1整个替换，将丢失对raw1的响应式
state1 = reactive(raw2);


// 解构响应式对象
const state2 = reactive({ countNum: 0 });
let { countNum } = state2;
// countNum将丢失响应式
// 对state无影响
const addCountNum = () => countNum++;

// 或者将响应式对象的属性作为一个参数传递给函数时也将失去响应式
const addNum = (num: number | Record<string, number>) => {
    if (typeof num === 'number') {
        num++
    } else {
        num.countNum++;
    }
};
const clickFn2 = () => {
    // addNum(state2.countNum);
    // 除非将整个响应式对象进行传递
    addNum(state2);
}


// ref的自动解包
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


// 顶级ref
const num = ref(3);
// 非顶级ref
const obj = {
    id: ref(0),
}
const { id } = obj;

// 非自动解包
const books = reactive([ref("vue3")]);
// 这里需要 .value
console.log(books[0].value); // "vue3"

const map = reactive(new Map([['count', ref(0)]]))
// 这里需要 .value
console.log(map.get('count')!.value); // 0
</script> 
<style scoped></style>
