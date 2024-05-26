<template>
    <div class="filter-experience">
        <div class="filter-experience__container">
            <Slider v-model="filtersStore.valueAmountExperience"
                range
                class="w-14rem"
                :min="0"
                :max="50" />

            <span class="filter-experience__show-age">{{ showAmountExperience }}</span>
        </div>
    </div>
</template>


<script setup
    lang="ts">
    import { computed } from 'vue';

    import Slider from 'primevue/slider';

    import { useFiltersStore } from '../../../store/filtersStore';

    const filtersStore = useFiltersStore()

    const showAmountExperience = computed<string>(() => {
        const [from, to] = filtersStore.valueAmountExperience
        return `От ${from} до ${to}`
    })

</script>

<style lang="scss">
.filter-experience {
    &__container {
        max-width: 300px;
        margin: 0 0 30px 8px;

        @include vp-1199 {
            max-width: 270px;
            margin-bottom: 26px;
        }

        @include vp-767 {
            margin-bottom: 24px;
        }
    }

    &__show-age {
        display: block;
        margin-top: 16px;
        font-size: 16px;

        @include vp-767 {
            font-size: 14px;
        }
    }

    // Стилизация Slider
    .p-slider-range {
        background-color: $color-accent-middle;
    }
}
</style>