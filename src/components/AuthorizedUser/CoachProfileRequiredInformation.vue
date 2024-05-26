<template>
    <div class="required-information">
        <div class="required-information__container">
            <form @submit.prevent="sendAdditionalData()">
                <div class="required-information__specialization">
                    <p>Укажите вашу специализацию <sup>*</sup></p>
                    <CoachesFiltersSelectButton />
                </div>

                <div class="required-information__gender">
                    <p>Укажите ваш пол <sup>*</sup></p>
                    <CoachesFiltersRadioButtonGender />
                </div>

                <div class="required-information__sex">
                    <p>Укажите ваш возраст <sup>*</sup></p>
                    <label>
                        <input type="text"
                            required
                            v-model="age">
                    </label>
                </div>

                <div class="required-information__experience">
                    <p>Укажите ваш опыт работы <sup>*</sup></p>
                    <input type="text"
                        required
                        v-model="experience">
                </div>

                <button class="required-information__button">
                    Сохранить
                </button>
            </form>
        </div>
    </div>
</template>

<script lang="ts"
    setup>
    import { ref } from 'vue'

    import CoachesFiltersSelectButton from './Coaches/CoachesFiltersSelectButton.vue';
    import CoachesFiltersRadioButtonGender from './Coaches/CoachesFiltersRadioButtonGender.vue';

    import { baseUrl } from '@api/api.js'

    import { useFiltersStore } from '../../store/filtersStore';
    import { usePreloaderStore } from '../../store/preloaderStore'

    const filtersStore = useFiltersStore()
    const preloaderStore = usePreloaderStore();

    const emit = defineEmits(['get-additional-data'])

    const urlAdditionalData: string = `${baseUrl}api/coach/finish-registration`

    interface IAdditionalData {
        specializations: string[],
        gender: string,
        age: string,
        workExperience: string
    }

    const age = ref<string>('');
    const experience = ref<string>('');

    const sendAdditionalData = async (): Promise<void> => {
        preloaderStore.loading = true

        const additionalData: IAdditionalData = {
            specializations: filtersStore.valueSpecialization.map(item => item.name),
            gender: filtersStore.valueGender,
            age: age.value,
            workExperience: experience.value
        };

        try {
            const response: any = await fetch(urlAdditionalData, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                },
                body: JSON.stringify(additionalData)
            })

            if (response.ok) {
                const result: IAdditionalData = await response.json()
                emit('get-additional-data', result);
            } else {
                throw new Error
            }
        }

        catch (error: any) {
            preloaderStore.loading = false
        }

        preloaderStore.loading = false
    }

</script>

<style lang="scss">
.required-information {

    &__container {
        padding: 40px 22px 22px 22px;
    }

    &__specialization,
    &__sex,
    &__gender,
    &__experience {
        margin: 0 0 40px 0;

        p {
            font-size: 22px;
            margin-bottom: 30px;
            font-weight: 600;
        }

        sup {
            color: $color-accent;
            font-size: 20px;
        }

        @include vp-1199 {
            margin-bottom: 30px;

            p {
                font-size: 18px;
                margin-bottom: 24px;
            }

            sup {
                font-size: 14px;
            }
        }

        @include vp-767 {
            margin-bottom: 20px;

            p {
                font-size: 16px;
                margin-bottom: 16px;
            }

            sup {
                font-size: 12px;
            }
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

            &:hover,
            &:focus-visible {
                outline: none;
                border-color: $color-accent-middle;
                transition: border 0.2s;
            }

            &:active {
                border-color: $color-accent-lighter;
            }
        }


        @include vp-1199 {
            input {
                font-size: 16px;
            }
        }

        @include vp-767 {
            input {
                font-size: 14px;
                width: 50%;
            }
        }
    }

    &__button {
        display: block;
        grid-column: 1 / 3;
        width: 34%;
        margin: 60px auto 0 auto;
        background-color: #474747;
        color: $color-base-white;
        border: none;
        border-radius: 10px;
        font-size: 18px;
        padding: 12px 30px;
        cursor: pointer;
        transition: background-color 0.2s;

        @include vp-1199 {
            font-size: 16px;
            padding: 8px 22px;
        }

        @include vp-767 {
            font-size: 14px;
            padding: 8px 18px;
            width: 50%;
        }

        &:hover,
        &:focus-visible {
            outline: none;
            background-color: $color-accent-middle;
            transition: background-color 0.2s;
        }

        &:active {
            background-color: $color-accent-lighter;
        }
    }

    .p-button {
        background: $color-base-white;

        &.p-highlight {
            background-color: $color-accent-lighter;
        }
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