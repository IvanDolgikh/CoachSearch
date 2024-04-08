<template>
  <HeaderBlock v-if="hideBlocks" />
  <main>
    <RouterView></RouterView>
  </main>
  <FooterBlock v-if="hideBlocks" />

  <Preloader v-if="preloaderStore.loading" />
</template>

<script setup
  lang="ts">
  import { computed } from "vue"
  import { useRoute } from "vue-router";

  import FooterBlock from './components/Layouts/TheFooter.vue'
  import HeaderBlock from './components/Layouts/TheHeader.vue'
  import Preloader from './components/Common/Preloader.vue'

  import { usePreloaderStore } from './store/preloaderStore'

  const preloaderStore = usePreloaderStore()

  const router = useRoute()

  const hideBlocks = computed<boolean>(() => {
    return router.matched.some(direct => !(direct.name === 'authorization' || direct.name === 'registration'))
  })

</script>

<style scoped>
main {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: auto;
  flex-grow: 1;
}
</style>