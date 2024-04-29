<template>
    <div class="filter-sex">
        <div class="filter-sex__container">
            <div class="filter-sex__radio-container">
                <RadioButton v-model="filtersStore.valueGender"
                    inputId="man"
                    name="man"
                    value="man" />
                <label for="ingredient1"
                    class="ml-2">Мужской</label>
            </div>
            <div class="filter-sex__radio-container">
                <RadioButton v-model="filtersStore.valueGender"
                    inputId="woman"
                    name="woman"
                    value="woman" />
                <label for="ingredient2"
                    class="ml-2">Женский</label>
            </div>
        </div>
    </div>
</template>

<script setup
    lang="ts">

    import RadioButton from 'primevue/radiobutton';

    import { useFiltersStore } from '../../../store/filtersStore';

    const filtersStore = useFiltersStore()


</script>

<style lang="scss">
@import "@variables";

.filter-sex {

    &__container {
        display: flex;
        column-gap: 30px;
        margin-bottom: 30px;
    }

    &__radio-container {
        display: flex;
        column-gap: 10px;
    }

    /* Стилизация toggle */
    .p-radiobutton.p-highlight .p-radiobutton-box {
        border-color: $color-accent-middle;
    }

    .p-radiobutton .p-radiobutton-box .p-radiobutton-icon {
        background-color: $color-accent-middle;
    }

    .required-information .p-highlight {
        background-color: transparent;
    }

}
</style>