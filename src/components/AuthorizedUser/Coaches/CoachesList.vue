<template>
  <div class="coaches">
    <div class="coaches__logo-container">
      <Logo class="coaches__logo" />
    </div>

    <div class="coaches__container"
      v-if="data">
      <CoachesFilters v-if="data.length !== 0"
        :dataCoaches="data" />
      <ul class="coaches__list">
        <CoachesListItem v-for="coach in filterCoaches()"
          :key="coach.coachId"
          :coach="coach" />
      </ul>
    </div>

    <ErrorGetData v-if="errorsStore.errorGettingData" />

    <Transition name="error-like">
      <ErrorLike v-if="errorsStore.errorLeaveLike" />
    </Transition>


    <router-view></router-view>
  </div>
</template>

<script setup
  lang="ts">

  import ErrorGetData from "../../Common/ErrorGetData.vue";
  import ErrorLike from "../../Common/ErrorLike.vue"
  import CoachesListItem from "./CoachesListItem.vue";
  import CoachesFilters from "./CoachesFilters.vue";
  import Logo from '../../Common/Logo.vue'


  import { ref, onMounted, computed, watch } from "vue";
  import { getData, baseUrl } from "@api/api.js";

  import { usePreloaderStore } from '../../../store/preloaderStore'
  import { useFiltersStore } from "../../../store/filtersStore";
  import { useErrorsStore } from "../../../store/errorsStore";

  const preloaderStore = usePreloaderStore();
  const filtersStore = useFiltersStore()
  const errorsStore = useErrorsStore()

  const urlAllTrainers: string = `${baseUrl}api/coach`;

  interface IData {
    coachId: string;
    address: string;
    avatarUrl: string;
    fullName: string;
    isLiked: boolean;
    likesCount: number;
    specializations: string[];
    gender: string;
    age: number;
    workExperience: string;
  }


  const data = ref<IData[]>([]);

  const determineDataForSearch = computed<IData[]>(() => {
    if (filtersStore.filteredCoaches.length !== 0) {
      return filtersStore.filteredCoaches
    } else {
      return data.value
    }
  })

  const seacrhCoach = computed<IData[]>(() => {
    if (determineDataForSearch.value && filtersStore.isSearching) {
      return determineDataForSearch.value.filter(elem => {
        return elem.fullName.toLocaleLowerCase().includes(filtersStore.inputSearchText.toLowerCase())
      })
    } else {
      return data.value
    }
  })


  const filterCoaches = (): IData[] => {
    if (filtersStore.isSearching) {
      return seacrhCoach.value
    } else if (filtersStore.filteredCoaches) {
      return filtersStore.filteredCoaches
    }
    else {
      return data.value
    }
  }

  watch(() => filtersStore.inputSearchText, () => {
    filtersStore.isSearching = false;
  });

  const getCoachList = async (): Promise<void> => {
    try {
      const result: any = await getData(urlAllTrainers);
      data.value = result.coaches;
      filtersStore.filteredCoaches = data.value
    } catch (error: any) {
      errorsStore.showAndHideGettingDataError()
    }
  }

  onMounted(async (): Promise<void> => {
    preloaderStore.loading = true
    await getCoachList()
    preloaderStore.loading = false
  });

</script>

<style lang="scss"
  scoped>

  .coaches {
    flex-grow: 1;

    &__logo-container {
      width: 100%;
      border-bottom: 1px solid $color-gray-lighter;
      margin-bottom: 60px;
      padding: 15px 100px;

      @include vp-1199 {
        margin-bottom: 40px;
        padding: 10px 60px;
      }

      @include vp-767 {
        margin-bottom: 30px;
        padding: 8px 20px;
      }
    }

    &__logo {
      width: fit-content;
      margin-left: auto;
    }

    &__container {
      max-width: 1440px;
      margin: 0 auto 10% auto;
      padding: 0 60px;

      @include vp-767 {
        padding: 0 20px;
      }
    }

    &__list {
      display: flex;
      justify-content: center;
      align-items: stretch;
      flex-wrap: wrap;
      gap: 40px;
      width: fit-content;
      margin: 0 auto;

      @include vp-1199 {
        gap: 30px;
      }

      @include vp-1199 {
        gap: 20px;
      }
    }

  }

  .error-like-enter-active,
  .error-like-leave-active {
    transition: opacity 0.2s ease;
  }

  .error-like-enter-from,
  .error-like-leave-to {
    opacity: 0;
  }
</style>
