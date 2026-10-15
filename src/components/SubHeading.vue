<template>
    <h2 :class="`m-0 text-xl ${props.class}`"><slot></slot></h2>
</template>

<script setup lang="ts">
const props = defineProps({
    class: String
})
</script>
