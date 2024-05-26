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
.filter-sex {

    &__container {
        display: flex;
        column-gap: 30px;
        margin-bottom: 30px;

        @include vp-1199 {
            margin-bottom: 26px;
        }

        @include vp-767 {
            margin-bottom: 24px;
            column-gap: 22px;
        }
    }

    &__radio-container {
        display: flex;
        column-gap: 10px;

        @include vp-767 {
            column-gap: 8px;
        }
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

    .ml-2 {
        font-size: 18px;

        @include vp-1199 {
            font-size: 16px;
        }

        @include vp-767 {
            font-size: 14px;
        }
    }

}
</style>