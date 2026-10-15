<script setup lang="ts">
import NoPasswords from '@/components/NoPasswords.vue';
import PageLayout from '@/components/PageLayout.vue';
import PasswordList from '@/components/PasswordList.vue';
import PasswordTiles from '@/components/PasswordTiles.vue';
import SubHeading from '@/components/SubHeading.vue';
import Title from '@/components/Title.vue';
import { Button } from '@/components/ui/button';
import usePasswordsStore from '@/stores/passwordsStore';
import { PlusIcon } from '@lucide/vue';
import { RouterLink } from 'vue-router';

const { passwords } = usePasswordsStore();

</script>

<template>
    <PageLayout>
        <div class=" flex justify-between items-center">
            <div>
                <Title>
                    PassApp
                </Title>
                <SubHeading class=" mb-4">
                    A safe place for all your passwords!
                </SubHeading>
            </div>
            <RouterLink to="/add">
                <Button variant="outline" class="hidden md:block">Add a Password</Button>
                <Button size="icon" class="md:hidden">
                    <PlusIcon />
                </Button>
            </RouterLink>
        </div>

        <div v-if="passwords.length === 0">
            <!-- empty UI -->
            <NoPasswords />
        </div>
        <div v-else>
            <div class="md:hidden">
                <PasswordTiles :passwords="passwords" />
            </div>
            <div class="hidden md:block">
                <PasswordList :passwords="passwords" />
            </div>
        </div>
    </PageLayout>
</template>
