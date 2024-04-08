<template>
    <div class="filter-specialization">
        <div class="filter-specialization__container">
            <SelectButton v-model="valueSpecialization"
                :options="optionSpecialization"
                optionLabel="name"
                multiple
                aria-labelledby="multiple" />
        </div>
    </div>
</template>

<script setup
    lang="ts">
    import { reactive, ref } from 'vue';

    import SelectButton from 'primevue/selectbutton';

    type TOptionSpecialization = {
        name: string
    }

    const valueSpecialization = ref<TOptionSpecialization[]>([])

    const optionSpecialization = reactive<TOptionSpecialization[]>([
        { name: 'Йога' },
        { name: 'Табата' },
        { name: 'Велотренировки' },
        { name: 'Pilates' },
        { name: 'Кинезис' },
        { name: 'TRX' },
        { name: 'Танцевальные направления' },
        { name: 'Единоборства' },
        { name: 'Функциональные тренировки' },
        { name: 'Силовые тренировки' },
        { name: 'Растяжка' }
    ])

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