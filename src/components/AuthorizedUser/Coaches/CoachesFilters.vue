<template>
    <div class="coaches">
        <div class="coaches__search-container">
            <InputGroup>
                <InputGroupAddon>
                    <FloatLabel>
                        <InputText v-model="filtersStore.inputSearchText" />
                        <label for="username">Найти</label>
                    </FloatLabel>
                </InputGroupAddon>

                <button class="coaches__search-button"
                    @click="filtersStore.isSearching = !filtersStore.isSearching">
                    <span class="pi pi-search"></span>
                </button>
            </InputGroup>

            <button class="coaches__filter-button"
                @click="filtersStore.isOpenModal = !filtersStore.isOpenModal">Фильтровать</button>

            <Transition name="modal-filter">
                <KeepAlive>
                    <CoachesFiltersModal v-if="filtersStore.isOpenModal"
                        :dataCoaches="props.dataCoaches" />
                </KeepAlive>

            </Transition>
        </div>
    </div>
</template>

<script setup
    lang="ts">

    import CoachesFiltersModal from "./CoachesFiltersModal.vue";

    import InputText from "primevue/inputtext";
    import FloatLabel from "primevue/floatlabel";
    import InputGroup from 'primevue/inputgroup';
    import InputGroupAddon from 'primevue/inputgroupaddon';

    import { useFiltersStore } from '../../../store/filtersStore';

    const filtersStore = useFiltersStore()

    interface IData {
        coachId: string;
        address: string;
        avatarUrl: string;
        fullName: string;
        isLiked: boolean;
        likesCount: number;
        specializations: string[];
        gender: string;
        age: number;
        workExperience: string;
    }

    const props = defineProps<{
        dataCoaches: IData[]
    }>();

</script>

<style lang="scss"
    scoped>

    .coaches {
        &__search-container {
            margin-bottom: 70px;
            display: flex;
            padding: 26px 16px 16px 16px;
            background-color: $color-base-white;
            border-radius: 16px;


            label {
                font-size: 18px;
                font-weight: 400;
                color: $color-base-text;
                transform: translateY(-50%);
                margin: 0;
            }

            @include vp-1199 {
                margin-bottom: 50px;

                label {
                    font-size: 16px;
                }
            }

            @include vp-767 {
                flex-direction: column;
                row-gap: 20px;
                margin-bottom: 40px;

                label {
                    font-size: 14px;
                }
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

            @include vp-1199 {
                span {
                    font-size: 20px;
                }
            }

            @include vp-767 {
                margin: 0;

                span {
                    font-size: 18px;
                }
            }

            &:hover {
                border-color: $color-gray-lighter;
                transition: border-color 0.2s;
            }

            &:focus-visible {
                border: 1px solid $color-accent;
                transition: border-color 0.2s;
                outline: none;
            }

            &:active {
                border: 1px solid $color-accent;
                transition: border-color 0.2s;
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
            transition: border 0.2s;

            &:hover,
            &:focus-visible {
                outline: none;
                border-color: $color-base-text;
                transition: border 0.2s
            }

            &:active {
                border-color: $color-accent-middle;
            }

            @include vp-1199 {
                padding: 4px 20px;
                font-size: 16px;
            }

            @include vp-767 {
                padding: 8px 18px;
                margin-left: auto;
                font-size: 14px;
                width: fit-content;
            }
        }

        // Стили контейнера групп
        .p-inputgroup {
            width: 40%;

            @include vp-1199 {
                width: 50%;
            }

            @include vp-767 {
                width: 100%;
            }
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
            padding: 8px 15px;
            font-family: "Montserrat", sans-serif;
            font-weight: 400;
            font-size: 18px;
            color: $color-base-text;
            border-radius: 6px 0 0 6px;

            @include vp-1199 {
                font-size: 16px;
            }

            @include vp-1199 {
                font-size: 14px;
            }
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