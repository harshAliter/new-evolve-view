<template>
  <div class="error-page">
    <h1>{{ error.statusCode }}</h1>
    <p>{{ error.message }}</p>
    <nuxt-link to="/">Go back to Home</nuxt-link>
  </div>
</template>

<script setup>
import { useError } from 'nuxt/app'

const error = useError()
</script>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

.error-page h1 {
  font-size: 5rem;
  margin: 0;
}

.error-page p {
  font-size: 1.5rem;
}

.error-page a {
  margin-top: 1rem;
  color: #007bff;
  text-decoration: none;
}
</style>
