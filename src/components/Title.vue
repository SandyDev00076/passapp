<template>
    <h1 :class="`m-0 text-3xl font-bold ${props.class}`"><slot></slot></h1>
</template>

<script setup lang="ts">
const props = defineProps({
    class: String
})
</script>
