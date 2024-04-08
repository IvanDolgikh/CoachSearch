<template>
    <div class="user">
        <div class="user__container"
            v-if="data && !isEditable">
            <!-- <router-link class="user__edit-profile"
                :to="{ name: 'edit-mode', params: { data: data.phoneNumber } }">Редактировать профиль</router-link> -->
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

            <!-- <router-view></router-view> -->

        </div>

        <EditProfile v-if="isEditable"
            :userData="data"
            @close-modal="isEditable = !isEditable" />
    </div>
</template>

<script setup
    lang="ts">

    import EditProfile from "./EditProfile.vue";

    import { ref, onMounted } from "vue";
    import { getData, baseUrl } from "@api/api.js";
    import { usePreloaderStore } from '../../store/preloaderStore'

    import IconVk from "@icons-svg/icon-vk.svg";
    import IconTg from "@icons-svg/icon-tg.svg";

    const preloaderStore = usePreloaderStore();

    const isEditable = ref<boolean>(false)

    const url: string = `${baseUrl}api/customer/profile`;

    interface IData {
        avatarUrl: string;
        vkLink: string;
        telegramLink: string;
        fullName: string;
        phoneNumber: string;
        email: string;
        info: string;
    }

    // const data = ref<IData | null>(null);

    const data = ref<IData>();

    onMounted(async (): Promise<void> => {
        preloaderStore.loading = true
        const result = await getData(url);
        data.value = result;
        preloaderStore.loading = false
    });
</script>

<style lang="scss"
    scoped>
    @import "@variables";

    .user {
        &__container {
            position: relative;
            max-width: 1440px;
            padding: 0 80px;
            margin: 7% auto 10% auto;
        }

        &__edit-profile {
            display: block;
            background-color: transparent;
            padding: 10px 15px;
            border: 1px solid $color-gray-lighter;
            border-radius: 8px;
            color: $color-base-text;
            margin: 0 0 60px auto;
            width: fit-content;
            cursor: pointer;
        }

        &__base-info-container {
            text-align: center;
            display: grid;
            grid-template-columns: min-content 1fr;
            grid-template-rows: min-content 1fr;
            column-gap: 40px;
            margin-bottom: 40px;
        }

        &__image {
            display: block;
            object-fit: cover;
            border-radius: 20px;
            grid-column: 1;
            grid-row: 1 / 3;
        }

        &__fio {
            font-size: 30px;
            text-align: start;
            margin: 20px 0 40px 0;
        }

        &__link-container {
            grid-column: 2;
            height: fit-content;
            display: flex;
            column-gap: 20px;
            justify-self: start;
        }

        &__additional-info-container {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            flex: 1;
            row-gap: 10px;
        }

        &__contacts-container {
            background-color: aqua;
            padding: 22px;
            border-radius: 20px;
            background-color: #e2e2e2;
            margin-bottom: 30px;
        }

        &__contacts-title,
        &__about-title {
            font-size: 24px;
            margin-bottom: 20px;
            font-weight: 600;
        }

        &__tel,
        &__email {
            font-size: 20px;

            strong {
                font-weight: 500;
            }
        }

        &__tel {
            margin-bottom: 20px;
        }

        &__about-container {
            margin-left: 22px;
        }

        &__about {
            font-size: 20px;
            border-bottom: 1px solid $color-gray-lighter;
            padding-bottom: 10px;
            line-height: 1.6;
        }
    }
</style>
