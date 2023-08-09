<template>
    <div>
        <div class="group">
            <!-- 实现组件v-model的方式一 -->
            <!-- <input @input="$emit('update:modelValue', ($event.target as any)?.value)" :value="modelValue" id="input"
                :type="type" required> -->
            <!-- 实现组件v-model的方式二 -->
            <!-- <input v-model="value" id="input" :type="type" required> -->

            <!-- 自定义参数 -->
            <!-- <input v-model="value" id="input" :type="type" required> -->
            <!-- <span class="highlight"></span>
            <span class="bar"></span>
            <label for="input">{{ label }}</label> -->
        </div>

        <!-- 多个组件v-model -->
        <div class="group">
            <input v-model="value1" id="input" :type="type" required>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label for="input">{{ label1 }}</label>
        </div>
        <div class="group">
            <input v-model="value2" id="input" :type="type" required>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label for="input">{{ label2 }}</label>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { computed } from 'vue';

type TypeValues = "text" | "textarea" | "number" | "radio" | "checkbox"
interface Input {
    type: TypeValues,
    value?: string,
    label?: string,
    label1?: string;
    label2?: string;
    modelValue?: string,

    // 自定义参数
    // title?: string;

    // 多个组件v-model
    firstName: string;
    lastName: string;

    // 自定义修饰符
    firstNameModifiers?: {};
    lastNameModifiers?: {};
}
const props = defineProps<Input>();
// const emit = defineEmits(['update:modelValue'])
// 自定义参数
// const emit = defineEmits(["update:title"])
// 多个组件v-model
const emit = defineEmits(["update:firstName", "update:lastName"])


// 实现组件v-model的方式二
// const value = computed({
//     get() {
//         return props.modelValue;
//     },
//     set(value) {
//         emit("update:modelValue", value);
//     }
// })


// 自定义参数
// const value = computed({
//     get() {
//         return props.title;
//     },
//     set(value) {
//         emit("update:title", value);
//     }
// })


// 多个组件v-model
// const value1 = computed({
//     get() {
//         return props.firstName;
//     },
//     set(value) {
//         emit("update:firstName", value)
//     }
// });
// const value2 = computed({
//     get() {
//         return props.lastName;
//     },
//     set(value) {
//         emit("update:lastName", value)
//     }
// })


// 自定义修饰符
// .capitalize修饰符的实现逻辑
const capitalizeFirstLetter = (value: string) => {
    console.log("XXx")
    return value.charAt(0).toUpperCase() + value.slice(1);
};

function emitValue(modelParam: "firstName" | "lastName", value: string) {
    if (modelParam === "firstName") {
        // 对.capitalize修饰符进行使用
        if (props.firstNameModifiers && (props.firstNameModifiers as any).capitalize) {
            value = capitalizeFirstLetter(value);
        }
    } else {
        // 对.capitalize修饰符进行使用
        if (props.lastNameModifiers && (props.lastNameModifiers as any).capitalize) {
            value = capitalizeFirstLetter(value);
        }
    }

    // 触发事件回调函数
    emit(`update:${modelParam}`, value);
};
const value1 = computed({
    get() {
        return props.firstName;
    },
    set(value) {
        emitValue("firstName", value)
    }
});
const value2 = computed({
    get() {
        return props.lastName;
    },
    set(value) {
        emitValue("lastName", value)
    }
})
</script>
<style scoped>
@import url("../styles/customInput.css");
</style>