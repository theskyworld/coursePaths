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
* {
    box-sizing: border-box;
}

/* basic stylings ------------------------------------------ */
.container {
    font-family: "Roboto";
    width: 600px;
    margin: 30px auto 0;
    display: block;
    background: #fff;
    padding: 10px 50px 50px;
}

h2 {
    text-align: center;
    margin-bottom: 50px;
}

h2 small {
    font-weight: normal;
    color: #888;
    display: block;
}

.footer {
    text-align: center;
}

.footer a {
    color: #53b2c8;
}

/* form starting stylings ------------------------------- */
.group {
    position: relative;
    margin-bottom: 45px;
}

input {
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 300px;
    border: none;
    border-bottom: 1px solid #757575;
    background-color: #242424;
}

input:focus {
    outline: none;
}

/* LABEL ======================================= */
label {
    color: #999;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
}

/* active state */
input:focus~label,
input:valid~label {
    top: -20px;
    font-size: 14px;
    color: #5264ae;
}

/* BOTTOM BARS ================================= */
.bar {
    position: relative;
    display: block;
    width: 300px;
}

.bar:before,
.bar:after {
    content: "";
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: #5264ae;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
}

.bar:before {
    left: 50%;
}

.bar:after {
    right: 50%;
}

/* active state */
input:focus~.bar:before,
input:focus~.bar:after {
    width: 50%;
}

/* HIGHLIGHTER ================================== */
.highlight {
    position: absolute;
    height: 60%;
    width: 100px;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
}

/* active state */
input:focus~.highlight {
    -webkit-animation: inputHighlighter 0.3s ease;
    -moz-animation: inputHighlighter 0.3s ease;
    animation: inputHighlighter 0.3s ease;
}

/* ANIMATIONS ================ */
@-webkit-keyframes inputHighlighter {
    from {
        background: #5264ae;
    }

    to {
        width: 0;
        background: transparent;
    }
}

@-moz-keyframes inputHighlighter {
    from {
        background: #5264ae;
    }

    to {
        width: 0;
        background: transparent;
    }
}

@keyframes inputHighlighter {
    from {
        background: #5264ae;
    }

    to {
        width: 0;
        background: transparent;
    }
}
</style>