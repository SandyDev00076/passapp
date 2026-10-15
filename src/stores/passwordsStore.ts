import type { Password } from "@/types";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

const PASSWORDS_LOCALSTORAGE_KEY = "pass-collection";

const usePasswordsStore = defineStore("passwords", () => {
  const passwords = ref<Password[]>([]);
  const passwordsLoaded = ref(false);

  // actions
  const setPasswords = (list: Password[]) => {
    passwords.value = [...list];
    passwordsLoaded.value = true;
  };

  const addPassword = (passwordToAdd: Password) => {
    passwords.value.push(passwordToAdd);
  };

  const fetchPassword = (id: string) => {
    return passwords.value.find((p) => p.id === id);
  };

  const removePassword = (id: string) => {
    const passwordToRemove = passwords.value.findIndex((p) => p.id === id);
    if (passwordToRemove < 0) {
      // no such password exists
      throw new Error("No such password exists");
    }
    // password found, remove it
    passwords.value.splice(passwordToRemove, 1);
  };

  const editPassword = (id: string, newPassword: string) => {
    const passwordToUpdate = passwords.value.find((p) => p.id === id);
    if (!passwordToUpdate) {
      throw new Error("Error while fetching the password entity");
    }
    passwordToUpdate.value = newPassword;
  };

  const updatePasswordWhenCopied = (id: string) => {
    const passwordToUpdate = passwords.value.find((p) => p.id === id);
    if (!passwordToUpdate) {
      throw new Error("Error while fetching the password entity");
    }
    passwordToUpdate.numberOfTimesCopied++;
    passwordToUpdate.lastUsedAt = new Date().toISOString();
  };

  watch(
    passwords,
    (newVal) => {
      localStorage.setItem(PASSWORDS_LOCALSTORAGE_KEY, JSON.stringify(newVal));
    },
    { deep: true },
  );

  const sortedPasswords = computed(() => {
    return passwords.value.sort(
      (a, b) => b.numberOfTimesCopied - a.numberOfTimesCopied,
    );
  });

  return {
    passwords: sortedPasswords,
    passwordsLoaded,
    setPasswords,
    addPassword,
    removePassword,
    fetchPassword,
    editPassword,
    updatePasswordWhenCopied,
  };
});

export default usePasswordsStore;
