import AddPasswordPage from "@/screens/AddPasswordPage.vue";
import EditPasswordPage from "@/screens/EditPasswordPage.vue";
import PasswordsPage from "@/screens/PasswordsPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: PasswordsPage },
    {
      path: "/add",
      component: AddPasswordPage,
    },
    {
      path: "/edit/:id",
      component: EditPasswordPage,
      props: true,
    },
  ],
});

export default router;
