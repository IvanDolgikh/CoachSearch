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
                <p>Чтобы ваш профиль успешно отображался в списке тренеров,<br>завершите настройку своего профиля</p>
            </a>

            <button class="coach__edit-profile"
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

                <p class="coach__age"
                    v-if="data.age">
                    Возраст: <strong>{{ `${data.age} лет` }}</strong>
                </p>

                <p class="coach__experience"
                    v-if="data.workExperience">
                    Опыт работы: <strong>{{ `${data.workExperience} лет` }}</strong>
                </p>

                <p class="coach__specialization"
                    v-if="data.specializations">
                    Специализация: <strong>{{ specializations }}</strong>
                </p>

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

            <div class="coach__additional-info-container">
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
        </div>

        <EditProfile v-if="isEditable"
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

    const getCoachProfileData = async () => {
        try {
            const result = await getData(url)
            data.value = result;
            return result
        } catch {
            errorsStore.showAndHideGettingDataError()
        }
    }

    const getadditionalData = (finishData: IData): IData => data.value = finishData

    const specializations = computed(() => {
        if (data.value?.specializations) {
            return data.value.specializations.join(', ')
        }
    });

    const updateData = (newData: IData): IData => data.value = newData

    onMounted(async (): Promise<void> => {
        preloaderStore.loading = true
        getCoachProfileData()
        preloaderStore.loading = false
    });
</script>

<style lang="scss"
    scoped>
    @import "@variables";

    .coach {


        &__logo-container {
            width: 100%;
            border-bottom: 1px solid $color-gray-lighter;
            margin: 0 0 60px 0;
            padding: 15px 0 15px 0;
        }

        &__logo {
            max-width: 1440px;
            margin: 0 auto;
        }

        &__warning {
            display: flex;
            align-items: center;
            column-gap: 30px;
            width: fit-content;
            margin: 0 auto 50px auto;
            padding: 10px 30px;
            background-color: $color-base-white;
            border: none;
            border-radius: 10px;
            font-family: "Montserrat", sans-serif;
            color: #4d4d4d;
            font-weight: 300;
            text-align: left;
            line-height: 1.4;
            cursor: pointer;

            p {
                font-size: 20px;
            }

            span {
                font-size: 26px;
                color: $color-accent;
            }
        }

        &__container {
            max-width: 1440px;
            padding: 0 80px;
            margin: 0 auto 10% auto;
        }

        &__edit-profile {
            display: block;
            background-color: transparent;
            padding: 10px 15px;
            border: 1px solid $color-gray-lighter;
            border-radius: 8px;
            color: $color-base-text;
            margin: 0 0 60px auto;
            cursor: pointer;
        }

        &__base-info-container {
            display: grid;
            grid-template-columns: min-content 1fr;
            grid-template-rows: repeat(4, min-content);
            justify-content: start;
            column-gap: 40px;
            margin-bottom: 40px;

            .coach__image {
                display: block;
                object-fit: cover;
                border-radius: 20px;
                grid-column: 1;
                grid-row: 1 / 5;
            }

            .coach__fio {
                font-size: 30px;
                margin: 20px 0;
            }

            .coach__specialization {
                font-size: 20px;
                line-height: 1.5;
            }

            .coach__age,
            .coach__experience {
                font-size: 20px;
                margin-bottom: 10px
            }

            .coach__link-container {
                grid-column: 1;
                margin-top: 20px;
                height: fit-content;
                display: flex;
                column-gap: 20px;
                justify-self: center;
            }
        }

        &__additional-info-container {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            flex: 1;
            row-gap: 10px;

            .coach__contacts-container {
                padding: 22px;
                border-radius: 20px;
                background-color: #e2e2e2;
                margin-bottom: 30px;
                display: flex;
                flex-direction: column;
                row-gap: 20px;
            }

            .coach__tel,
            .coach__email,
            .coach__address {
                font-size: 20px;
            }

            .coach__specialization-container {
                padding: 22px;
                border-radius: 20px;
                background-color: #e2e2e2;
                margin-bottom: 30px;
            }

            .coach__about-container {
                margin: 0 0 40px 22px;
            }

            .coach__about {
                font-size: 20px;
                border-bottom: 1px solid $color-gray-lighter;
                padding-bottom: 10px;
                line-height: 1.6;
            }
        }

        &__contacts-title,
        &__about-title {
            font-size: 24px;
            margin-bottom: 20px;
            font-weight: 600;
        }

        strong {
            font-weight: 500;
        }
    }
</style>
