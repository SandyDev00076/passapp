<script lang="ts" setup>
import type { Password } from '@/types';
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from './ui/table';
import PasswordRow from './PasswordRow.vue';

const props = defineProps({
    passwords: Array<Password>
})

</script>

<template>
    <Table>
        <TableCaption>A list of all your passwords</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>
                    #
                </TableHead>
                <TableHead>
                    Site
                </TableHead>
                <TableHead>
                    Password
                </TableHead>
                <TableHead>
                    # copied
                </TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <PasswordRow v-for="(password, index) in passwords" :password="password" :key="password.id"
                :s-no="index + 1" />
        </TableBody>
    </Table>
</template>
