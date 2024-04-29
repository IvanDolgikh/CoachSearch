<template>
    <div class="filter-age">
        <div class="filter-age__container">
            <Slider v-model="filtersStore.valueAge"
                range
                class="w-14rem"
                :min="18"
                :max="80" />

            <span class="filter-age__show-age">{{ showAge }}</span>
        </div>
    </div>
</template>


<script setup
    lang="ts">
    import { computed } from 'vue';

    import Slider from 'primevue/slider';

    import { useFiltersStore } from '../../../store/filtersStore';

    const filtersStore = useFiltersStore()

    const showAge = computed<string>(() => {
        const [from, to] = filtersStore.valueAge
        return `От ${from} до ${to}`
    })

</script>

<style lang="scss">
@import "@variables";

.filter-age {
    &__container {
        max-width: 300px;
        margin: 0 0 30px 8px;
    }

    &__show-age {
        display: block;
        margin-top: 16px;
    }

    // Стилизация Slider
    .p-slider-range {
        background-color: $color-accent-middle;
    }
}
</style>