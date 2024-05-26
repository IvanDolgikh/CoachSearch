<template>
    <div class="filter">
        <div class="filter__container">
            <button class="filter__button-cancel"
                @click="filtersStore.isOpenModal = !filtersStore.isOpenModal">
                <span class="pi pi-times"></span>
            </button>

            <p class="filter__specialization-title">Специализация тренера</p>
            <CoachesFiltersSelectButton />

            <p class="filter__sex-title">Пол</p>
            <CoachesFiltersRadioButtonGender />

            <p class="filter__age-title">Возраст</p>
            <CoachesFiltersSliderAge />

            <p class="filter__experience-title">Опыт работы</p>
            <CoachesFiltersSliderExperience />

            <p class="filter__experience-title">Начать показ с лучших?</p>
            <CoachesFiltersBest />

            <div class="filter__button-container">
                <button class="filter__button-accept"
                    @click="acceptFilters">Применить</button>
                <button class="filter__button-remove"
                    @click="removeFilters">Сбросить</button>
            </div>
        </div>
    </div>
</template>

<script setup
    lang="ts">

    import CoachesFiltersSelectButton from './CoachesFiltersSelectButton.vue'
    import CoachesFiltersRadioButtonGender from './CoachesFiltersRadioButtonGender.vue'
    import CoachesFiltersSliderAge from './CoachesFiltersSliderAge.vue';
    import CoachesFiltersSliderExperience from './CoachesFiltersSliderExperience.vue';
    import CoachesFiltersBest from './CoachesFiltersBest.vue';

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

    type TFilterFunction = (data: IData[] | undefined) => IData[] | undefined

    const props = defineProps(['dataCoaches'])

    const filterSpecializations: TFilterFunction = (data) => {
        const listSpecializations: string[] = filtersStore.valueSpecialization.map(item => item.name)
        if (listSpecializations.length === 0) {
            return data
        } else if (data) {
            const result: IData[] = data.filter(item => {
                for (let val of item.specializations) {
                    if (listSpecializations.includes(val)) {
                        return true;
                    }
                }
            });
            filtersStore.filteredCoaches = result
        }
    }

    const filterGender: TFilterFunction = (data) => {
        if (filtersStore.valueGender === '') {
            return data
        } else if (data) {
            const result: IData[] = data.filter(item => {
                if (item.gender === filtersStore.valueGender) {
                    return true
                }
            })
            filtersStore.filteredCoaches = result
        }
    }

    const defaultMinAgeValue: number = 18;
    const defaultMaxAgeValue: number = 80;

    const defaultMinExperienceValue: number = 0;
    const defaultMaxExperienceValue: number = 50;

    const filterAge: TFilterFunction = (data) => {
        const defaultAgeValue: number[] = [defaultMinAgeValue, defaultMaxAgeValue]
        if (filtersStore.valueAge.toString() === defaultAgeValue.toString()) {
            return data
        } else if (data) {
            const result: IData[] = data.filter(item => {
                if (item.age >= filtersStore.valueAge[0] && item.age <= filtersStore.valueAge[1]) {
                    return true
                }
            })
            filtersStore.filteredCoaches = result
        }
    }

    const filterWorkExperience: TFilterFunction = (data) => {
        const defaultExperienceValue: number[] = [defaultMinExperienceValue, defaultMaxExperienceValue]
        if (filtersStore.valueAmountExperience.toString() === defaultExperienceValue.toString()) {
            return data
        } else if (data) {
            const result: IData[] = data?.filter(item => {
                const experience: number = Number(item.workExperience)
                if (experience >= filtersStore.valueAmountExperience[0] && experience <= filtersStore.valueAmountExperience[1]) {
                    return true
                }
            })
            filtersStore.filteredCoaches = result
        }
    }

    const filterBestCoaches: TFilterFunction = (data) => {
        if (filtersStore.valueBest === 'yes') {
            return data?.sort((a, b) => b.likesCount - a.likesCount)
        }
    }

    const acceptFilters = (): void => {
        if (props.dataCoaches) {
            filtersStore.filteredCoaches = props.dataCoaches
            filterSpecializations(filtersStore.filteredCoaches)
            filterGender(filtersStore.filteredCoaches)
            filterAge(filtersStore.filteredCoaches)
            filterWorkExperience(filtersStore.filteredCoaches)
            filterBestCoaches(filtersStore.filteredCoaches)
            filtersStore.isOpenModal = !filtersStore.isOpenModal
        }
    }


    const removeFilters = (): void => {
        filtersStore.filteredCoaches = props.dataCoaches
        filtersStore.valueSpecialization.splice(0)
        filtersStore.valueGender = ''
        filtersStore.valueAge.splice(0, 2, defaultMinAgeValue, defaultMaxAgeValue)
        filtersStore.valueAmountExperience.splice(0, 2, defaultMinExperienceValue, defaultMaxExperienceValue)
        filtersStore.valueBest = ''
        filtersStore.isOpenModal = !filtersStore.isOpenModal
    }

</script>

<style lang="scss">
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
        margin: 1% auto;
        padding: 20px;
        max-width: 800px;
        border-radius: 16px;
        background-color: $color-base-white;

        @include vp-1199 {
            max-width: 700px;
        }

        @include vp-767 {
            max-width: 350px;
        }
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

        @include vp-1199 {
            span {
                font-size: 22px;
            }
        }

        @include vp-1199 {
            span {
                font-size: 20px;
            }
        }
    }

    &__button-container {
        display: flex;
        column-gap: 40px;

        @include vp-1199 {
            column-gap: 24px;
        }
    }

    &__button-accept,
    &__button-remove {
        display: block;
        font-family: 'Montserrat', sans-serif;
        color: $color-base-text;
        font-size: 18px;
        font-weight: 400;
        padding: 8px 16px;
        border-radius: 8px;
        transition: border 0.2s, background-color 0.2s;
        cursor: pointer;

        @include vp-1199 {
            font-size: 16px;
            padding: 6px 14px;
        }

        @include vp-767 {
            font-size: 14px;
        }
    }

    &__button-accept {
        background-color: transparent;
        border: 1px solid $color-accent;
        width: 30%;

        &:hover,
        &:focus-visible {
            outline: none;
            border: 1px solid $color-accent-lighter;
            background-color: $color-accent-lighter;
            transition: border 0.2s, background-color 0.2s;
        }

        @include vp-767 {
            width: auto;
        }
    }

    &__button-remove {
        display: block;
        width: auto;
        background-color: $color-bg-default;
        border: none;

        &:hover,
        &:focus-visible {
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

        @include vp-1199 {
            font-size: 18px;
            margin-bottom: 22px;
        }

        @include vp-767 {
            font-size: 16px;
            margin-bottom: 18px;
        }
    }

    &__age-title,
    &__experience-title {
        margin-bottom: 32px;

        @include vp-1199 {
            margin-bottom: 30px;
        }

        @include vp-767 {
            margin-bottom: 26px;
        }
    }
}
</style>