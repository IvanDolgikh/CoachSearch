<template>
    <div class="required-information">
        <div class="required-information__container">
            <div class="required-information__specialization">
                <p>Укажите вашу специализацию <sup>*</sup></p>
                <CoachesFiltersSelectButton />
            </div>

            <div class="required-information__gender">
                <p>Укажите ваш пол <sup>*</sup></p>
                <CoachesFiltersRadioButtonAge />
            </div>

            <div class="required-information__sex">
                <p>Укажите ваш возраст <sup>*</sup></p>
                <label>
                    <input type="text"
                        v-model="age">
                </label>
            </div>

            <div class="required-information__experience">
                <p>Укажите ваш опыт работы <sup>*</sup></p>
                <input type="text"
                    v-model="experience">
            </div>

            <button class="required-information__button"
                @click.prevent="sendAdditionalData()">
                Сохранить
            </button>

        </div>
    </div>
</template>

<script lang="ts"
    setup>
    import { ref } from 'vue'

    import CoachesFiltersSelectButton from './Coaches/CoachesFiltersSelectButton.vue';
    import CoachesFiltersRadioButtonAge from './Coaches/CoachesFiltersRadioButtonAge.vue';

    import { baseUrl } from '@api/api.js'

    import { useFiltersStore } from '../../store/filtersStore';

    const filtersStore = useFiltersStore()

    const emit = defineEmits(['get-additional-data'])

    const urlAdditionalData = `${baseUrl}api/coach/finish-registration`

    interface IAdditionalData {
        specializations: string[],
        gender: string,
        age: string,
        workExperience: string
    }

    const age = ref<string>('');
    const experience = ref<string>('');

    const sendAdditionalData = async (): Promise<void> => {

        const additionalData: IAdditionalData = {
            specializations: filtersStore.valueSpecialization.map(item => item.name),
            gender: filtersStore.valueGender,
            age: age.value,
            workExperience: experience.value
        };

        try {
            const response = await fetch(urlAdditionalData, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                },
                body: JSON.stringify(additionalData)
            })

            if (response.ok) {
                const result = await response.json()
                emit('get-additional-data', result);
                return result
            } else {
                throw new Error('Something wrong')
            }
        }

        catch (error) {
            throw error
        }
    }

</script>

<style lang="scss">
@import "@variables";

.required-information {

    &__container {
        border-radius: 20px;
        padding: 22px;
    }


    &__specialization,
    &__sex,
    &__gender,
    &__experience {
        margin: 0 0 40px 0;

        p {
            font-size: 24px;
            margin-bottom: 30px;
            font-weight: 600;
        }

        sup {
            color: $color-accent;
            font-size: 20px;
        }
    }

    &__sex,
    &__experience {
        input {
            font-family: 'Montserrat', sans-serif;
            color: $color-base-text;
            font-weight: 400;
            font-size: 18px;
            background-color: $color-base-white;
            border-radius: 8px;
            border: 1px solid $color-gray-lighter;
            padding: 6px 10px;
            width: 25%;
        }
    }

    &__button {
        display: block;
        font-family: 'Montserrat', sans-serif;
        color: $color-base-text;
        font-weight: 400;
        font-size: 18px;
        padding: 10px 16px;
        border-radius: 8px;
        transition: border 0.2s, background-color 0.2s;
        cursor: pointer;
        background-color: $color-base-white;
        border: 1px solid $color-accent;
        width: 30%;
        margin: 0 auto;

        &:hover {
            border: 1px solid $color-accent-lighter;
            background-color: $color-accent-lighter;
            transition: border 0.2s, background-color 0.2s;
        }
    }

    .p-button {
        background: $color-base-white;
        border-radius: 10px;

        &::before {
            display: none;
        }

        &.p-highlight {
            background-color: $color-accent-lighter;
        }
    }

    .p-button-label {
        font-size: 18px;
    }

    .ml-2 {
        font-size: 18px;
    }
}
</style>