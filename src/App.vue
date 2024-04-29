<template>
  <HeaderBlock v-if="hideHeader" />
  <main>
    <RouterView></RouterView>
  </main>
  <FooterBlock v-if="hideFooter" />

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

  const hideFooter = computed<boolean>(() => {
    return router.matched.some(direct => !(direct.name === 'authorization' || direct.name === 'registration'))
  })

  const hideHeader = computed<boolean>(() => {
    return router.matched.some(direct => (direct.name === 'main'))
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