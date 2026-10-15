<script lang="ts" setup>
import usePasswordsStore from '@/stores/passwordsStore';
import type { Password } from '@/types';
import { CopyIcon, EditIcon, EyeClosedIcon, EyeIcon, TrashIcon } from '@lucide/vue';
import { ref } from 'vue';
import { TableCell, TableRow } from './ui/table';
import { Button } from './ui/button';
import { copyToClipboard } from '@/lib/utils';
import { toast } from 'vue-sonner';
import { useRouter } from 'vue-router';

const { password, sNo } = defineProps<{
    password: Password,
    sNo: number,
}>();

const { removePassword } = usePasswordsStore();
const router = useRouter();

const showPassword = ref(false);

const togglePasswordShowIcon = () => {
    showPassword.value = !showPassword.value;
}

const onDeleteClick = () => {
    removePassword(password.id);
    toast.success("Password deleted");
}

const onCopyClick = async () => {
    await copyToClipboard(password.value);
    toast.success("Password copied");
}

const onEditClick = () => {
    router.push(`/edit/${password.id}`);
}

</script>
<template>
    <TableRow>
        <TableCell>
            {{ sNo }}
        </TableCell>
        <TableCell>
            {{ password.site }}
        </TableCell>
        <TableCell>
            {{ showPassword ? password.value : new Array(password.value.length).fill("*").join("") }}
        </TableCell>
        <TableCell class=" flex gap-2">
            <Button variant="outline" size="icon" aria-label="Show/Hide Password" @click="togglePasswordShowIcon()">
                <EyeIcon v-if="!showPassword" />
                <EyeClosedIcon v-else />
            </Button>
            <Button variant="outline" size="icon" aria-label="Copy Password" @click="onCopyClick()">
                <CopyIcon />
            </Button>
            <Button variant="outline" size="icon" aria-label="Edit" @click="onEditClick()">
                <EditIcon />
            </Button>
            <Button variant="outline" size="icon" aria-label="Delete" @click="onDeleteClick()">
                <TrashIcon class=" stroke-red-700" />
            </Button>
        </TableCell>
    </TableRow>
</template>
