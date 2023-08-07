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
.btn {
    width: 15rem;
    height: 4rem;
    border-radius: 1rem;
    /* box-shadow: 0.3rem 0.3rem 0.6rem var(--greyLight-2), -0.2rem -0.2rem 0.5rem var(--white); */
    justify-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s ease;
}

.btn__primary {
    grid-column: 1/2;
    grid-row: 4/5;
    background: var(--primary);
    /* box-shadow: inset 0.2rem 0.2rem 1rem var(--primary-light), inset -0.2rem -0.2rem 1rem var(--primary-dark), 0.3rem 0.3rem 0.6rem var(--greyLight-2), -0.2rem -0.2rem 0.5rem var(--white); */
    color: var(--greyLight-1);
}

.btn__primary:hover {
    color: var(--white);
}

.btn__primary:active {
    box-shadow: inset 0.2rem 0.2rem 1rem var(--primary-dark), inset -0.2rem -0.2rem 1rem var(--primary-light);
}

.btn p {
    font-size: 1.6rem;
}
</style>