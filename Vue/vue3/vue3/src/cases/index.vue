<script setup lang='ts'>
import { ref } from 'vue';



/*********************************导包分界线***************************************/
/* macros */



/* props */

/* emits */


/* datas */
const type = "primary";
const isShowClose = ref(false);
const cssStyle = {color : 'red'};
const dynamicAttrs = {
    style: cssStyle,
    class: {
        "v-message": true,
        [`v-message--${type}`]: type,
        'is-close': isShowClose,

    },
    role: "alert"
}

/* computed */



/* methods */



/* watch */


/* hooks */

/* useComposition */

</script>
<template>
    <div v-bind="dynamicAttrs">hello</div>
</template>
<style scoped></style>