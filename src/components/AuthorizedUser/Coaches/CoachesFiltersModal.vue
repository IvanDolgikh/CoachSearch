<template>
    <div class="filter">
        <div class="filter__container">
            <button class="filter__button-cancel"
                @click="$emit('close-modal')">
                <span class="pi pi-times"></span>
            </button>

            <p class="filter__specialization-title">Специализация тренера</p>
            <CoachesFiltersSelectButton />

            <p class="filter__sex-title">Пол</p>
            <CoachesFiltersRadioButtonAge />

            <p class="filter__age-title">Возраст</p>
            <CoachesFiltersSliderAge />

            <p class="filter__experience-title">Опыт работы</p>
            <CoachesFiltersSliderExperience />

            <p class="filter__experience-title">Начать показ с лучших?</p>
            <CoachesFiltersSliderBest />

            <div class="filter__button-container">
                <button class="filter__button-accept">Применить</button>
                <button class="filter__button-remove">Сбросить</button>
            </div>
        </div>
    </div>
</template>

<script setup
    lang="ts">

    import { defineEmits } from 'vue';

    import CoachesFiltersSelectButton from './CoachesFiltersSelectButton.vue'
    import CoachesFiltersRadioButtonAge from './CoachesFiltersRadioButtonAge.vue'
    import CoachesFiltersSliderAge from './CoachesFiltersSliderAge.vue';
    import CoachesFiltersSliderExperience from './CoachesFiltersSliderExperience.vue';
    import CoachesFiltersSliderBest from './CoachesFiltersSliderBest.vue';

    const emit = defineEmits(['close-modal'])

</script>

<style lang="scss">
@import "@variables";

.filter {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
    background-color: #0000007d;
    overflow-y: auto;

    &__container {
        margin: 5% auto;
        padding: 20px;
        max-width: 800px;
        border-radius: 16px;
        background-color: $color-base-white;
    }

    &__button-cancel {
        display: block;
        background-color: transparent;
        border: none;
        cursor: pointer;
        margin-left: auto;

        span {
            font-size: 24px;
            color: $color-gray-lighter;
        }
    }

    &__button-container {
        display: flex;
        column-gap: 40px;
    }

    &__button-accept,
    &__button-remove {
        display: block;
        font-family: 'Montserrat', sans-serif;
        color: $color-base-text;
        font-weight: 400;
        padding: 8px 16px;
        border-radius: 8px;
        transition: border 0.2s, background-color 0.2s;
        cursor: pointer;
    }

    &__button-accept {
        background-color: transparent;
        border: 1px solid $color-accent;
        width: 30%;

        &:hover {
            border: 1px solid $color-accent-lighter;
            background-color: $color-accent-lighter;
            transition: border 0.2s, background-color 0.2s;
        }
    }

    &__button-remove {
        display: block;
        width: auto;
        background-color: $color-bg-default;
        border: none;
        justify-self: flex-end;

        &:hover {
            background-color: #f6f6f6;
            transition: background-color 0.2s;
        }
    }

    &__specialization-title,
    &__age-title,
    &__sex-title,
    &__experience-title {
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 24px;
    }

    &__age-title,
    &__experience-title {
        margin-bottom: 32px;
    }
}
</style>