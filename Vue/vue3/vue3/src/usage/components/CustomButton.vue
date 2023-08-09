<template>
    <!-- 透传-->
    <!-- <div class="btn btn__primary"> -->
        <!-- <p>Button</p> -->
        <!-- {{ $attrs.onClick }} -->
        <!-- 值为() => console.log("hello") -->
        <!-- {{ $attrs.class }} -->
        <!-- 值为foo-bar -->
    <!-- </div> -->

    <!-- 将透传的内容添加到内部元素上 -->
    <div>
        <div v-bind="$attrs" class="btn btn__primary">
            <p>Button</p>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { useAttrs } from 'vue';

defineOptions({
    inheritAttrs: false,
})

// 访问透传过来的内容
const attrs = useAttrs();
console.log(attrs.class); // "foo-bar"
console.log(attrs.onClick); // "() => console.log("hello")"
</script>
<style scoped>
@import url("../styles/customButton.css")
</style>