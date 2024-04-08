<template>
    <div class="coaches">
        <div class="coaches__search-input-container">
            <InputGroup>
                <InputGroupAddon>
                    <FloatLabel>
                        <InputText />
                        <label for="username">Найти</label>
                    </FloatLabel>
                </InputGroupAddon>

                <span></span>
                <button class="coaches__search-button">
                    <span class="pi pi-search"></span>
                </button>
            </InputGroup>

            <button class="coaches__filter-button"
                @click="isOpenModal = !isOpenModal">Фильтровать</button>

            <Transition name="modal-filter">
                <KeepAlive>
                    <CoachesFiltersModal v-if="isOpenModal"
                        @close-modal="isOpenModal = !isOpenModal" />
                </KeepAlive>

            </Transition>
        </div>
    </div>
</template>

<script setup
    lang="ts">
    import { ref } from 'vue'

    import CoachesFiltersModal from "./CoachesFiltersModal.vue";

    import InputText from "primevue/inputtext";
    import FloatLabel from "primevue/floatlabel";
    import InputGroup from 'primevue/inputgroup';
    import InputGroupAddon from 'primevue/inputgroupaddon';

    const isOpenModal = ref<boolean>(false)

</script>

<style lang="scss"
    scoped>
    @import "@variables";

    .coaches {
        &__search-input-container {
            margin-bottom: 70px;
            display: flex;
            padding: 30px 15px;
            background-color: $color-base-white;
            border-radius: 16px;

            label {
                font-size: 20px;
                font-weight: 400;
                color: $color-base-text;
                transform: translateY(-50%);
                margin: 0;
            }
        }

        &__search-button {
            display: block;
            background-color: $color-base-white;
            border: 1px solid #cbd5e1;
            padding: 0 10px;
            margin-right: 60px;
            transition: border-color 0.2s;
            cursor: pointer;

            span {
                font-size: 22px;
                color: $color-accent;
            }

            &:hover {
                border-color: $color-gray-lighter;
                transition: border-color 0.2s;
            }

            &:active {
                border: 1px solid $color-accent;
                transition: border-color 0.2s;
            }

            &:focus-visible {
                border: 1px solid $color-accent;
                transition: border-color 0.2s;
                outline: none;
            }
        }

        &__filter-button {
            display: flex;
            align-items: center;
            font-family: "Montserrat", sans-serif;
            font-weight: 400;
            color: $color-base-text;
            font-size: 18px;
            border-radius: 6px;
            padding: 5px 30px;
            background-color: $color-base-white;
            border: 1px solid #cbd5e1;
            cursor: pointer;
        }

        // Стили контейнера групп
        .p-inputgroup {
            width: 34%;
        }

        // Стили для группы с инпутом и label и кнопки
        .p-inputgroup-addon {
            padding: 0;
            border: none;
            width: 100%;
        }

        // Стили контейнера с инпутом и label
        .p-float-label {
            display: flex;
        }

        // Стили инпута поиска
        .p-inputtext {
            padding: 10px 15px;
            font-family: "Montserrat", sans-serif;
            font-weight: 300;
            font-size: 20px;
            color: $color-base-text;
            border-radius: 6px 0 0 6px;
        }

        // Стиль анимации label
        .p-float-label:has(input:focus) {
            label {
                top: -1rem;
            }
        }

        // Состояние фокуса инпута 
        .p-inputtext:enabled:focus {
            outline: 1px solid $color-accent;
        }

        .p-inputtext:enabled:hover {
            border-color: $color-gray-lighter;
        }
    }

    .modal-filter-enter-active,
    .modal-filter-leave-active {
        transition: opacity 0.2s ease;
    }

    .modal-filter-enter-from,
    .modal-filter-leave-to {
        opacity: 0;
    }
</style>