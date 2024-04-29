<template>
    <div class="filter-best">
        <div class="filter-best__container">
            <div class="filter-best__radio-container">
                <RadioButton v-model="filtersStore.valueBest"
                    inputId="man"
                    name="man"
                    value="man" />
                <label for="ingredient1"
                    class="ml-2">Да</label>
            </div>
            <div class="filter-best__radio-container">
                <RadioButton v-model="filtersStore.valueBest"
                    inputId="woman"
                    name="woman"
                    value="woman" />
                <label for="ingredient2"
                    class="ml-2">Нет</label>
            </div>
        </div>
    </div>
</template>

<script setup
    lang="ts">

    import RadioButton from 'primevue/radiobutton';

    import { useFiltersStore } from '../../../store/filtersStore';

    const filtersStore = useFiltersStore();

</script>

<style lang="scss">
@import "@variables";

.filter-best {

    &__container {
        display: flex;
        column-gap: 30px;
        margin-bottom: 40px;
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
}
</style>