<template>
    <div class="filter-best">
        <div class="filter-best__container">
            <div class="filter-best__radio-container">
                <RadioButton v-model="filtersStore.valueBest"
                    inputId="yes"
                    name="yes"
                    value="yes" />
                <label for="ingredient1"
                    class="ml-2">Да</label>
            </div>
            <div class="filter-best__radio-container">
                <RadioButton v-model="filtersStore.valueBest"
                    inputId="no"
                    name="no"
                    value="no" />
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
.filter-best {

    &__container {
        display: flex;
        column-gap: 30px;
        margin-bottom: 40px;

        @include vp-767 {
            margin-bottom: 30px;
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