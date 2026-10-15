<script setup lang="ts">
import PageLayout from '@/components/PageLayout.vue';
import SubHeading from '@/components/SubHeading.vue';
import Title from '@/components/Title.vue';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import usePasswordsStore from '@/stores/passwordsStore';
import { EyeClosedIcon, EyeIcon } from '@lucide/vue';
import { nanoid } from 'nanoid';
import { reactive, ref, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';

const showPassword = ref(false);
const site = ref("");
const passwordValue = ref("");
const siteInputBox = useTemplateRef<HTMLInputElement>("siteInputBox");
const passwordInputBox = useTemplateRef<HTMLInputElement>("passwordInputBox");

const { addPassword } = usePasswordsStore();
const router = useRouter();

const errors = reactive({
    site: false,
    password: false,
})

const onSubmit = () => {
    errors.site = !site.value.trim();
    errors.password = !passwordValue.value;

    if (errors.site) {
        siteInputBox.value?.focus();
        return;
    }

    if (errors.password) {
        passwordInputBox.value?.focus();
        return;
    }

    // all validations have passed
    // add the password to its ref
    addPassword({
        createdAt: new Date().toISOString(),
        id: nanoid(),
        lastUsedAt: undefined,
        site: site.value,
        value: passwordValue.value,
        numberOfTimesCopied: 0
    });
    router.push("/");
}

const toggleShowPassword = () => {
    showPassword.value = !showPassword.value;
}

</script>

<template>
    <PageLayout>
        <Title>
            Add a Password
        </Title>
        <SubHeading class="mb-4">
            Add the site of the password, and its value
        </SubHeading>
        <form novalidate @submit.prevent="onSubmit">
            <FieldGroup>
                <Field>
                    <FieldLabel for="site-input">Site</FieldLabel>
                    <Input ref="siteInputBox" required id="site-input" placeholder="Upto 36 characters only"
                        :maxLength="36" v-model="site" />
                    <FieldError v-show="errors.site">Site is required</FieldError>
                </Field>
                <Field>
                    <FieldLabel for="pass-input">Password</FieldLabel>
                    <div class="flex gap-2">
                        <Input ref="passwordInputBox" :maxLength="36" required
                            :type="showPassword ? 'text' : 'password'" id="pass-input"
                            placeholder="Upto 36 characters only" v-model="passwordValue" />
                        <Button :disabled="!passwordValue" class="hidden md:block" type="button" variant="secondary"
                            @click="toggleShowPassword">
                            {{ showPassword ? 'Hide Password' : 'Show Password' }}
                        </Button>
                        <Button :disabled="!passwordValue" class="md:hidden" type="button" variant="secondary"
                            size="icon" @click="toggleShowPassword">
                            <EyeIcon v-if="!showPassword" />
                            <EyeClosedIcon v-else />
                        </Button>
                    </div>
                    <FieldError v-show="errors.password">Password is required</FieldError>
                </Field>
                <div class=" flex gap-3 justify-end">
                    <Button type="submit">Add Password</Button>
                    <router-link to="/">
                        <Button variant="secondary">Cancel</Button>
                    </router-link>
                </div>
            </FieldGroup>
        </form>
    </PageLayout>
</template>
