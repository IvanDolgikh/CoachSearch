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
@import "@variables";

.filter-specialization {

    &__container {
        margin-bottom: 30px;
    }

    // Стилизация SelectButton
    .p-component {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }

    .p-button {
        background: $color-bg-default;
        border-radius: 10px;

        &::before {
            display: none;
        }
    }

    .p-button-label {
        font-family: "Montserrat", sans-serif;
        color: #4d4d4d;
        font-weight: 300;
    }

    .p-highlight {
        background-color: $color-accent-lighter;
    }
}
</style>