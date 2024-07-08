<template>
  <div>
    <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
  </div>
</template>

<script>

export default {
  data() {
    return {
      routeName: useRouter().currentRoute.value.name,
    };
  },
  props: {
    title: {
      type: String,
      default: "Evolve IoT Plateform V3.2",
    },
  },
};
</script>
<style lang="scss">

</style>
