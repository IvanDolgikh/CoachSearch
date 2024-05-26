<template>
    <div class="coach">

        <div class="coach__logo-container">
            <Logo class="coach__logo" />
        </div>

        <div class="coach__container"
            v-if="data && !isEditable">

            <a href="#required-info"
                class="coach__warning"
                v-if="!data.isRegistrationFinished">
                <span class="pi pi-exclamation-triangle"></span>
                <p>Чтобы ваш профиль успешно отображался в списке тренеров, завершите настройку своего профиля</p>
            </a>

            <button class="coach__edit-profile"
                v-if="data.isRegistrationFinished"
                @click="isEditable = !isEditable">Редактировать профиль</button>

            <div class="coach__base-info-container">
                <img class="coach__image"
                    v-if="data.avatarUrl"
                    :src="data.avatarUrl"
                    width="250"
                    height="250"
                    alt="Фото Тренера" />
                <img class="coach__image"
                    v-else
                    src="../../assets/images/mok/unknown.jpg"
                    width="250"
                    height="250"
                    alt="" />

                <p class="coach__fio">{{ data.fullName }}</p>

                <div class="coach__personal-info">
                    <p class="coach__personal-info-title">Личная информация</p>
                    <p class="coach__age"
                        v-if="data.age">
                        Возраст: <strong>{{ `${data.age} лет` }}</strong>
                    </p>

                    <p class="coach__experience"
                        v-if="data.workExperience">
                        Опыт работы: <strong>{{ `${data.workExperience} лет` }}</strong>
                    </p>

                    <p class="coach__specialization"
                        v-if="specializations">
                        Специализация: <strong>{{ specializations }}</strong>
                    </p>
                </div>



                <div class="coach__link-container">
                    <a class="coach__social-link"
                        :href="data.vkLink">
                        <IconVk class="coach__social-icon" />
                    </a>
                    <a class="coach__social-link"
                        :href="data.telegramLink">
                        <IconTg class="coach__social-icon" />
                    </a>
                </div>
            </div>


            <div class="coach__contacts-container">
                <p class="coach__contacts-title">Контактная информация</p>
                <p class="coach__tel">
                    Телефон: <strong>{{ data.phoneNumber }}</strong>
                </p>
                <p class="coach__email">
                    Эл почта: <strong>{{ data.email }}</strong>
                </p>
                <p class="coach__address">
                    Место проведения тренировок:
                    <strong>{{ data.address }}</strong>
                </p>
            </div>

            <div class="coach__about-container">
                <p class="coach__about-title">О себе</p>
                <p class="coach__about">{{ data.info }}</p>
            </div>

            <CoachProfileRequiredInformation id="required-info"
                v-if="!data.isRegistrationFinished"
                @get-additional-data="getadditionalData" />

        </div>

        <EditProfile v-if="isEditable && data"
            :userData="data"
            @close-modal="isEditable = !isEditable"
            @update-data="updateData" />

        <ErrorGetData v-if="errorsStore.errorGettingData" />
    </div>
</template>

<script setup
    lang="ts">

    import EditProfile from "./EditProfile.vue";
    import ErrorGetData from "../Common/ErrorGetData.vue";
    import Logo from '../Common/Logo.vue'
    import CoachProfileRequiredInformation from './CoachProfileRequiredInformation.vue'

    import { ref, onMounted, computed } from "vue";
    import { getData, baseUrl } from "@api/api.ts";
    import { usePreloaderStore } from '../../store/preloaderStore'
    import { useErrorsStore } from "../../store/errorsStore";

    import IconVk from "@icons-svg/icon-vk.svg";
    import IconTg from "@icons-svg/icon-tg.svg";

    const preloaderStore = usePreloaderStore();
    const errorsStore = useErrorsStore()


    const isEditable = ref<boolean>(false)

    const url: string = `${baseUrl}api/coach/profile`;

    interface IData {
        coachId: string
        avatarUrl: string;
        vkLink: string;
        telegramLink: string;
        fullName: string;
        phoneNumber: string;
        email: string;
        info: string;
        address?: string;
        specializations?: string[];
        age?: number;
        workExperience?: string;
        isRegistrationFinished?: boolean
    }

    const data = ref<IData>();

    const getCoachProfileData = async (): Promise<IData | undefined> => {
        try {
            const result = await getData(url)
            data.value = result;
            return result
        } catch (error: any) {
            errorsStore.showAndHideGettingDataError()
        }
    }

    const getadditionalData = (finishData: IData): IData => data.value = finishData
    const updateData = (newData: IData): IData => data.value = newData

    const specializations = computed<string>(() => {
        if (data.value?.specializations) {
            return data.value.specializations.join(', ')
        }
        return ''
    });

    onMounted(async (): Promise<void> => {
        preloaderStore.loading = true
        await getCoachProfileData()
        preloaderStore.loading = false
    });
</script>

<style lang="scss"
    scoped>

    .coach {

        flex-grow: 1;

        &__logo-container {
            width: 100%;
            border-bottom: 1px solid $color-gray-lighter;
            margin-bottom: 60px;
            padding: 15px 100px;

            @include vp-1199 {
                margin-bottom: 40px;
                padding: 10px 60px;
            }

            @include vp-767 {
                margin-bottom: 30px;
                padding: 8px 20px;
            }
        }

        &__logo {
            width: fit-content;
            margin-left: auto;
        }

        &__container {
            position: relative;
            max-width: 1440px;
            padding: 0 80px;
            margin: 0 auto 10% auto;

            @include vp-1199 {
                padding: 0 60px;
            }

            @include vp-767 {
                padding: 0 20px;
            }
        }

        &__warning {
            display: flex;
            align-items: center;
            column-gap: 30px;
            width: fit-content;
            margin: 0 auto 90px auto;
            padding: 10px 30px;
            background-color: $color-base-white;
            border: none;
            border-radius: 10px;
            font-family: "Montserrat", sans-serif;
            color: #4d4d4d;
            font-weight: 400;
            text-align: left;
            line-height: 1.4;
            cursor: pointer;

            p {
                font-size: 18px;
            }

            span {
                font-size: 26px;
                color: $color-accent;
            }


            @include vp-1199 {
                padding: 8px 20px;
                margin-bottom: 60px;

                p {
                    font-size: 14px;
                }

                span {
                    font-size: 24px;
                }
            }

            @include vp-767 {
                display: flex;
                flex-direction: column;
                row-gap: 14px;
                padding: 8px 16px;
                margin-bottom: 40px;

                p {
                    font-size: 12px;
                    text-align: center;
                }

                span {
                    font-size: 21px;
                }
            }
        }

        &__edit-profile {
            display: block;
            background-color: transparent;
            padding: 10px 15px;
            border: 1px solid $color-gray-lighter;
            border-radius: 8px;
            font-size: 16px;
            color: $color-base-text;
            margin: 0 0 60px auto;
            width: fit-content;
            cursor: pointer;
            transition: background-color 0.2s, border 0.2s;

            &:hover,
            &:focus-visible {
                outline: none;
                background-color: $color-accent-lighter;
                border-color: $color-accent-lighter;
                transition: background-color 0.2s, border 0.2s;
            }

            &:active {
                background-color: transparent;
                border-color: $color-accent-lighter;
            }

            @include vp-1199 {
                font-size: 14px;
                padding: 6px 10px;
            }

            @include vp-767 {
                font-size: 12px;
                padding: 6px 8px;
                margin-bottom: 40px;
            }
        }

        &__base-info-container {
            display: grid;
            grid-template-columns: min-content 1fr;
            grid-template-rows: repeat(3, min-content);
            justify-content: start;
            column-gap: 40px;
            margin-bottom: 40px;

            @include vp-1199 {
                margin-bottom: 26px;
            }

            @include vp-767 {
                display: flex;
                flex-direction: column;
            }
        }

        &__image {
            display: block;
            object-fit: cover;
            border-radius: 20px;
            grid-column: 1;
            grid-row: 1 / 3;

            @include vp-1199 {
                width: 180px;
                height: 180px;
            }

            @include vp-767 {
                width: 120px;
                height: 120px;
                margin: 0 auto 20px auto;
                order: 0;
            }
        }

        &__fio {
            font-size: 30px;
            text-align: start;
            margin: 20px 0;

            @include vp-1199 {
                font-size: 26px;
                margin: 14px 0 16px 0;
            }

            @include vp-767 {
                font-size: 22px;
                text-align: center;
                margin: 0 0 12px 0;
                order: 1;
            }
        }

        &__personal-info {
            display: flex;
            flex-direction: column;
            row-gap: 30px;

            @include vp-1199 {
                row-gap: 20px;
            }

            @include vp-767 {
                row-gap: 10px;
                order: 3;
                padding: 18px;
                background-color: #e2e2e2;
                border-radius: 20px;
            }
        }

        &__age,
        &__experience,
        &__specialization {

            font-size: 18px;

            @include vp-1199 {
                font-size: 16px;
            }

            @include vp-767 {
                font-size: 14px;
            }
        }

        &__link-container {
            grid-column: 1;
            margin-top: 20px;
            height: fit-content;
            display: flex;
            column-gap: 20px;
            justify-self: center;

            @include vp-1199 {
                column-gap: 14px;
                margin-top: 16px;
            }

            @include vp-767 {
                margin: 0 auto 20px auto;
                order: 2;
            }
        }

        &__social-icon {
            width: 48px;
            height: 48px;

            @include vp-1199 {
                width: 40px;
                height: 40px;
            }

            @include vp-767 {
                width: 32px;
                height: 32px;
            }
        }

        &__contacts-container {
            padding: 22px;
            border-radius: 20px;
            background-color: #e2e2e2;
            display: flex;
            flex-direction: column;
            row-gap: 18px;
            margin-bottom: 40px;

            @include vp-1199 {
                padding: 18px;
                row-gap: 14px;
                margin-bottom: 26px;
            }

            @include vp-767 {
                row-gap: 12px;
            }
        }

        &__tel,
        &__email,
        &__address {
            font-size: 18px;

            @include vp-1199 {
                font-size: 16px;
            }

            @include vp-767 {
                font-size: 14px;
            }
        }

        &__address,
        &__specialization {
            line-height: 1.5;
        }

        &__about-container {
            margin-left: 22px;

            @include vp-1199 {
                margin-left: 18px;
            }
        }

        &__about {
            font-size: 18px;
            border-bottom: 1px solid $color-gray-lighter;
            padding-bottom: 10px;
            line-height: 1.5;

            @include vp-1199 {
                font-size: 16px;
            }

            @include vp-767 {
                font-size: 14px;
            }
        }

        &__contacts-title,
        &__about-title,
        &__personal-info-title {
            font-size: 22px;
            margin-bottom: 8px;
            font-weight: 600;

            @include vp-1199 {
                font-size: 18px;
                margin-bottom: 6px;
            }

            @include vp-767 {
                font-size: 16px;
                margin-bottom: 4px;
            }
        }

        &__personal-info-title {
            display: none;

            @include vp-767 {
                display: block;
            }
        }

        &__about-title {
            margin-bottom: 20px;

            @include vp-1199 {
                margin-bottom: 16px;
            }

            @include vp-767 {
                margin-bottom: 14px;
            }
        }

        strong {
            font-weight: 500;
        }
    }
</style>
