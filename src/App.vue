<template>
  <div class="main">
    <RouterView></RouterView>
  </div>
  <Footer></Footer>
</template>

<script setup>
import Footer from './components/Footer.vue'

</script>

<style scoped>

.main {
  display: flex;
  flex-direction: column;
  flex: auto;
  flex-grow: 1;
}

</style>