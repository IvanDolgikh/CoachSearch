<template>
  <div class="coaches">
    <div class="coaches__container">
      <CoachesFilters />
      <ul class="coaches__list">
        <CoachesListItem v-for="coach in data"
          :key="coach.trainerId"
          :coach="coach" />
      </ul>
    </div>

    <router-view></router-view>
  </div>
</template>

<script setup
  lang="ts">
  import CoachesListItem from "./CoachesListItem.vue";
  import CoachesFilters from "./CoachesFilters.vue";


  import { ref, onMounted } from "vue";
  import { getData, baseUrl } from "@api/api.js";
  import { usePreloaderStore } from '../../../store/preloaderStore'

  const preloaderStore = usePreloaderStore();

  const urlAllTrainers: string = `${baseUrl}api/trainer`;

  interface IData {
    trainerId: number;
    address: string;
    avatarUrl: string;
    fullName: string;
    isLiked: boolean;
    likesCount: number;
    specialization: string;
  }
  // const data = ref<IData[]>([]);

  const data = ref<IData[]>();

  onMounted(async () => {
    preloaderStore.loading = true
    const result = await getData(urlAllTrainers);
    data.value = result;
    preloaderStore.loading = false
  });
</script>

<style lang="scss"
  scoped>
  @import "@variables";

  .coaches {

    &__container {
      max-width: 1440px;
      margin: 2% auto 10% auto;
      padding: 0 60px;
    }

    &__promo-image {
      display: block;
      margin: 5% auto 5% auto;
    }

    &__list {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 40px 40px;
      width: fit-content;
      margin: 0 auto;
    }

  }
</style>
