<script lang="ts" setup>
import type { Password } from '@/types';
import { Card, CardHeader, CardTitle } from './ui/card';
import PasswordTile from './PasswordTile.vue';

const props = defineProps<{
    passwords: Password[]
}>()

</script>

<template>
    <Card v-for="password in passwords" class="mb-2">
        <CardHeader>
            <CardTitle>{{ password.site }}</CardTitle>
        </CardHeader>
        <PasswordTile :password="password" />
    </Card>
</template>
