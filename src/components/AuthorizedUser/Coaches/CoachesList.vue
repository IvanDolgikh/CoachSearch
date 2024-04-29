<template>
  <div class="coaches">
    <div class="coaches__logo-container">
      <Logo class="coaches__logo" />
    </div>
    <div class="coaches__container">
      <CoachesFilters />
      <ul class="coaches__list">
        <CoachesListItem v-for="coach in filterCoaches()"
          :key="coach.coachId"
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
  import Logo from '../../Common/Logo.vue'


  import { ref, onMounted, computed, watch, provide } from "vue";
  import { getData, baseUrl } from "@api/api.js";

  import { usePreloaderStore } from '../../../store/preloaderStore'
  import { useFiltersStore } from "../../../store/filtersStore";

  const preloaderStore = usePreloaderStore();
  const filtersStore = useFiltersStore()

  const urlAllTrainers: string = `${baseUrl}api/coach`;

  interface IData {
    coachId: string;
    address: string;
    avatarUrl: string;
    fullName: string;
    isLiked: boolean;
    likesCount: number;
    specializations: string[];
  }
  // const data = ref<IData[]>([]);

  const data = ref<IData[]>();
  const cloneData = computed<IData>(() => JSON.parse(JSON.stringify(data.value)))

  provide('keysForFilters', cloneData)

  const seacrhCoach = computed(() => {
    if (data.value && filtersStore.isSearching) {
      return data.value.filter(elem => {
        return elem.fullName.toLocaleLowerCase().includes(filtersStore.inputSearchText.toLowerCase())
      })
    } else {
      return data.value
    }
  })


  const filterCoaches = (): IData[] | undefined => {
    if (filtersStore.isSearching) {
      return seacrhCoach.value
    } else if (filtersStore.isOpenModal) {
      return filtersStore.filteredCoaches
    }
    else {
      return data.value
    }
  }

  watch(() => filtersStore.inputSearchText, () => {
    filtersStore.isSearching = false;
  });

  watch(() => filtersStore.filteredCoaches, (newValue) => {
    data.value = newValue
  })

  onMounted(async () => {
    preloaderStore.loading = true
    const result = await getData(urlAllTrainers);
    data.value = result.coaches;
    preloaderStore.loading = false
  });
</script>

<style lang="scss"
  scoped>
  @import "@variables";

  .coaches {

    &__logo-container {
      width: 100%;
      border-bottom: 1px solid $color-gray-lighter;
      margin: 0 0 60px 0;
      padding: 15px 0 15px 0;
    }

    &__logo {
      max-width: 1440px;
      margin: 0 auto;
    }

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
