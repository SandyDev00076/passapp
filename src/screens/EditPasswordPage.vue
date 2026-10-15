<script lang="ts" setup>
import PageLayout from '@/components/PageLayout.vue';
import SubHeading from '@/components/SubHeading.vue';
import Title from '@/components/Title.vue';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import usePasswordsStore from '@/stores/passwordsStore';
import { computed, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';


const { id } = defineProps<{
    id: string
}>();

const { fetchPassword, editPassword, passwordsLoaded } = usePasswordsStore();
const router = useRouter();
const errors = reactive({
    password: false
})

const passwordToEdit = computed(() => {
    return fetchPassword(id);
});

const inputValue = ref("");

watch(() => [passwordToEdit.value, passwordsLoaded] as const, ([newVal, isLoaded]) => {
    if (!isLoaded) {
        return;
    }

    if (!newVal) {
        router.replace("/");
    } else {
        inputValue.value = newVal.value;
    }
}, { immediate: true })

const onCancelClick = () => {
    router.go(-1);
}

const onFormSubmit = () => {
    if (inputValue.value === passwordToEdit.value?.value) {
        // show the error
        errors.password = true;
        return;
    }

    // input value is valid
    editPassword(id, inputValue.value);
    toast.success("Password updated successfully");
    router.push("/");
}

</script>
<template>
    <PageLayout>
        <Title>
            Edit {{ passwordToEdit?.site }}
        </Title>
        <SubHeading class="mb-4">
            You will only be able to edit the password.
        </SubHeading>
        <form novalidate @submit.prevent="onFormSubmit">
            <FieldGroup class="mb-2">
                <Field>
                    <FieldLabel for="edit-password">Password</FieldLabel>
                    <Input :maxLength="36" required id="edit-password" v-model="inputValue" />
                    <FieldError v-if="errors.password">Password cannot be same as previous one.</FieldError>
                </Field>
            </FieldGroup>
            <div class="flex gap-2 justify-end">
                <Button :disabled="!inputValue" type="submit">Edit Password</Button>
                <Button variant="secondary" type="button" @click="onCancelClick">Cancel</Button>
            </div>
        </form>
    </PageLayout>

</template>
