<script setup lang="ts">
import { Cloud } from '@lucide/vue';
import { Button } from './ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from './ui/empty';
</script>

<template>
    <Empty class="border border-dashed">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <Cloud />
      </EmptyMedia>
      <EmptyTitle>No passwords found!</EmptyTitle>
      <EmptyDescription>
        Please add one to get started!
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
        <router-link to="/add">
            <Button variant="outline" size="sm">
              Add a password
            </Button>
        </router-link>
    </EmptyContent>
  </Empty>
</template>
