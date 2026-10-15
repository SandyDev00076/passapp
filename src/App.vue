<script setup lang="ts">
import { RouterView } from 'vue-router';
import { Toaster } from './components/ui/sonner';
import 'vue-sonner/style.css';
import useKeepPasswordsInSync from './composables/useKeepPasswordsInSync';

useKeepPasswordsInSync();

</script>

<template>
  <RouterView></RouterView>
  <Toaster />
</template>
