export default defineNuxtPlugin(async (nuxtApp) => {
  await nuxtApp.$pinia.use(({ store }) => {
    store["$router"] = useRouter();
  });
  await nuxtApp.$pinia.use(({ store }) => {
    store["$axios"] = nuxtApp.$axios
  });
})