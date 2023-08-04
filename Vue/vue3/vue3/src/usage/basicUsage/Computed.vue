<template>
    <div class='container'>
        <!-- 计算属性 -->
        <p>年龄大于十岁的用户:{{ ageMoreThanTenUser }}</p>
        <p>年龄大于十岁的用户:{{ getAgeMoreThanTenUser() }}</p>
        <button @click="users[0].age++">change</button>
        <p>{{ now }}</p>
        <p>{{ getNow() }}</p>
        <p>{{ doubleCount1 }}</p>
    </div>
</template>
<script setup lang='ts'>
import { computed, reactive, ref } from 'vue';

const users = reactive([
    {
        name: 'Alice1',
        age: 12,
    },
    {
        name: 'Alice2',
        age: 9,
    },
    {
        name: 'Alice3',
        age: 7,
    }
]);
// 使用computed对上述的users进行过滤
// const ageMoreThanTenUser = computed(() => users.filter(user => user.age >= 10)[0].age);
const ageMoreThanTenUser = computed(() => {
    console.log("ageMoreThanTenUser called ...");
    return users.filter(user => user.age >= 10)[0].age;
});

const now = computed(() => {
    console.log("now called ...");
    // Date.now()不会作为依赖，now始终不会进行重新计算
    return Date.now();
});

// const getAgeMoreThanTenUser = () => users.filter(user => user.age >= 10)[0].age;
const getAgeMoreThanTenUser = () => {
    console.log("getAgeMoreThanTenUser called...")
    return users.filter(user => user.age >= 10)[0].age;
};

const getNow = () => {
    // 每次组件重新渲染时再次调用
    console.log("getNow called...");
    return Date.now();
}

// 只读的计算属性
const count = ref(1);
const doubleCount = computed(() => count.value * 2);
// doubleCount.value = 3; // 报错

// 可写的计算属性
const doubleCount1 = computed({
    get() {
        return count.value * 2;
    },
    set(newVal) {
        // 修改依赖的值，触发计算属性的重新计算，返回新的doubleCount1值
        // 等价于对doubleCount1进行修改
        count.value = newVal / 2;
    }
});
doubleCount1.value = 3;
console.log(doubleCount1.value); // 3
</script>
<style scoped></style>