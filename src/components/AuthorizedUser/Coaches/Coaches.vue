<template>
<div class="coaches">
    <div class="coaches__container">
        <img class="coaches__promo-image" src="../../../assets/images/promo-image.png" height="250" width="250" alt="Логотип CoachSearch.">
        <ul class="coaches__list">
            <Coach v-for="coach in data" :key="coach.trainerId" :coach = 'coach'></Coach>
        </ul>
    </div>
    <router-view></router-view>
</div>
</template>

<script setup>
import Coach from './Coach.vue';

import { ref, toRefs, onMounted } from 'vue'

import { getData, baseUrl } from '@api/api.js'

const urlAllTrainers = `${baseUrl}api/trainer`

const data = ref([])

onMounted(async () => {
    const result = await getData(urlAllTrainers)
    data.value = result
})

</script>

<style lang="scss" scoped>
.coaches {

    &__container {
        max-width: 1440px;
        margin: 0 auto 10% auto;
        padding: 0 80px;
    }

    &__promo-image {
        display: block;
        margin: 5% auto 5% auto;
    }

    &__list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px 20px;
        width: fit-content;
        margin: 0 auto;
    }

}
</style>
