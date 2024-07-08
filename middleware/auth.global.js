// middleware/auth.js
const publicPages = ["/login", "/home", "/forgot-password"];
export default defineNuxtRouteMiddleware((to, from) => {
  if (!publicPages.includes(to.path) && import.meta.client) {
    const authStore = useStore();
   
    if (!authStore.authenticated) {
      return navigateTo({ path: "/home" })
    }

    if (authStore.authenticated && to.path=="/" || to.path=="/") {
      return navigateTo({ path: "/root" })
    }
  }

})
