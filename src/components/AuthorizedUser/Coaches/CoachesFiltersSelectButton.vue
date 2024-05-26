<template>
    <div class="filter-specialization">
        <div class="filter-specialization__container">
            <SelectButton v-model="filterStore.valueSpecialization"
                :options="filterStore.optionSpecialization"
                optionLabel="name"
                multiple
                aria-labelledby="multiple" />
        </div>
    </div>
</template>

<script setup
    lang="ts">
    import SelectButton from 'primevue/selectbutton';
    import { useFiltersStore } from "../../../store/filtersStore";

    const filterStore = useFiltersStore()

</script>

<style lang="scss">
.filter-specialization {

    &__container {
        margin-bottom: 30px;

        @include vp-1199 {
            margin-bottom: 26px;
        }

        @include vp-767 {
            margin-bottom: 24px;
        }
    }

    // Стилизация SelectButton
    .p-component {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;

        @include vp-1199 {
            gap: 16px;
        }

        @include vp-767 {
            gap: 12px;
        }
    }

    .p-button {
        background: $color-bg-default;
        border-radius: 10px;

        @include vp-1199 {
            padding: 0.4rem 0.8rem;
        }

        @include vp-767 {
            padding: 0.3rem 0.6rem;
        }

        &::before {
            display: none;
        }
    }

    .p-button-label {
        font-family: "Montserrat", sans-serif;
        color: #4d4d4d;
        font-weight: 300;

        font-size: 17px;

        @include vp-1199 {
            font-size: 15px;
        }

        @include vp-767 {
            font-size: 13px;
        }
    }

    .p-highlight {
        background-color: $color-accent-lighter;
    }
}
</style>