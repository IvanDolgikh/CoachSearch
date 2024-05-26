<template>
    <div class="user">
        <div class="user__logo-container">
            <Logo class="user__logo" />
        </div>
        <div class="user__container"
            v-if="data && !isEditable">
            <button class="user__edit-profile"
                @click="isEditable = !isEditable">Редактировать профиль</button>

            <div class="user__base-info-container">
                <img class="user__image"
                    v-if="data.avatarUrl"
                    :src="data.avatarUrl"
                    width="250"
                    height="250"
                    alt="Фото юзера" />
                <img class="user__image"
                    v-else
                    src="../../assets/images/mok/unknown.jpg"
                    width="250"
                    height="250"
                    alt="" />
                <p class="user__fio">{{ data.fullName }}</p>
                <div class="user__link-container">
                    <a class="user__social-link"
                        :href="data.vkLink">
                        <IconVk class="user__social-icon" />
                    </a>
                    <a class="user__social-link"
                        :href="data.telegramLink">
                        <IconTg class="user__social-icon" />
                    </a>
                </div>
            </div>

            <div class="user__additional-info-container">
                <div class="user__contacts-container">
                    <p class="user__contacts-title">Контактная информация</p>
                    <p class="user__tel">
                        Телефон: <strong>{{ data.phoneNumber }}</strong>
                    </p>
                    <p class="user__email">
                        Эл почта: <strong>{{ data.email }}</strong>
                    </p>
                </div>

                <div class="user__about-container">
                    <p class="user__about-title">О себе</p>
                    <p class="user__about">{{ data.info }}</p>
                </div>
            </div>

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

    import { ref, onMounted } from "vue";
    import { getData, baseUrl } from "@api/api.js";
    import { usePreloaderStore } from '../../store/preloaderStore'
    import { useErrorsStore } from "../../store/errorsStore";

    import IconVk from "@icons-svg/icon-vk.svg";
    import IconTg from "@icons-svg/icon-tg.svg";

    const preloaderStore = usePreloaderStore();
    const errorsStore = useErrorsStore()

    const isEditable = ref<boolean>(false)

    const url: string = `${baseUrl}api/customer/profile`;

    interface IData {
        customerId: string
        avatarUrl: string;
        vkLink: string;
        telegramLink: string;
        fullName: string;
        phoneNumber: string;
        email: string;
        info: string;
    }

    const data = ref<IData>();

    const getUserProfileData = async (): Promise<void> => {
        try {
            const result: IData = await getData(url)
            data.value = result;
        } catch (error: any) {
            errorsStore.showAndHideGettingDataError()
        }
    }

    const updateData = (newData: IData): IData => data.value = newData

    onMounted(async (): Promise<void> => {
        preloaderStore.loading = true
        await getUserProfileData()
        preloaderStore.loading = false
    });
</script>

<style lang="scss"
    scoped>

    .user {
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
            text-align: center;
            display: grid;
            grid-template-columns: min-content 1fr;
            grid-template-rows: min-content 1fr;
            column-gap: 40px;
            margin-bottom: 40px;

            @include vp-1199 {
                margin-bottom: 30px;
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
            }
        }

        &__fio {
            font-size: 30px;
            text-align: start;
            margin: 20px 0 40px 0;

            @include vp-1199 {
                font-size: 26px;
                margin: 14px 0 30px 0;
            }

            @include vp-767 {
                font-size: 22px;
                text-align: center;
                margin: 0 0 12px 0;
            }
        }

        &__link-container {
            grid-column: 2;
            height: fit-content;
            display: flex;
            column-gap: 20px;
            justify-self: start;

            @include vp-1199 {
                column-gap: 14px;
            }

            @include vp-767 {
                margin: 0 auto;
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

        &__additional-info-container {
            display: flex;
            flex-direction: column;
            row-gap: 30px;

            @include vp-1199 {
                row-gap: 20px;
            }
        }

        &__contacts-container {
            padding: 22px;
            border-radius: 20px;
            background-color: #e2e2e2;
            display: flex;
            flex-direction: column;
            row-gap: 18px;

            @include vp-1199 {
                padding: 18px;
                row-gap: 16px;
            }

            @include vp-767 {
                row-gap: 12px;
            }
        }

        &__contacts-title,
        &__about-title {
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

        &__tel,
        &__email {
            font-size: 18px;

            @include vp-1199 {
                font-size: 16px;
            }

            @include vp-767 {
                font-size: 14px;
            }

            strong {
                font-weight: 500;
            }
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
            line-height: 1.6;

            @include vp-1199 {
                font-size: 16px;
            }

            @include vp-767 {
                font-size: 14px;
            }
        }
    }
</style>
