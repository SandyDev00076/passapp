<script setup lang="ts">
import type { Password } from '@/types';
import { CardContent, CardFooter } from './ui/card';
import { ref } from 'vue';
import { Button } from './ui/button';
import { CopyIcon, EditIcon, EyeClosedIcon, EyeIcon, TrashIcon } from '@lucide/vue';
import { copyToClipboard } from '@/lib/utils';
import { toast } from 'vue-sonner';
import usePasswordsStore from '@/stores/passwordsStore';
import { useRouter } from 'vue-router';

const { password } = defineProps<{
    password: Password
}>();

const router = useRouter();

const showPassword = ref(false);

const { removePassword, updatePasswordWhenCopied } = usePasswordsStore();

const togglePasswordShowIcon = () => {
    showPassword.value = !showPassword.value;
}

const onDeleteClick = () => {
    removePassword(password.id);
    toast.success("Password deleted");
}

const onCopyClick = async () => {
    await copyToClipboard(password.value);
    updatePasswordWhenCopied(password.id);
    toast.success("Password copied");
}

const onEditClick = () => {
    router.push(`/edit/${password.id}`);
}

</script>

<template>
    <CardContent>
        {{ showPassword ? password.value : new Array(password.value.length).fill("*").join("") }}
    </CardContent>
    <CardFooter class="flex gap-2 justify-end">
        <div class="text-sm text-gray-500">copied {{ password.numberOfTimesCopied }} times</div>
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
    </CardFooter>
</template>
