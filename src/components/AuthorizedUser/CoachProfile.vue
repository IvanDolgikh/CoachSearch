<template>
    <div class="coach">
        <div class="coach__container"
            v-if="data && !isEditable">
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
                <p class="coach__specialization">
                    Специализация: <strong>{{ data.specialization }}</strong>
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
            </div>
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
    import { getData, baseUrl } from "@api/api.ts";
    import { usePreloaderStore } from '../../store/preloaderStore'

    import IconVk from "@icons-svg/icon-vk.svg";
    import IconTg from "@icons-svg/icon-tg.svg";

    const preloaderStore = usePreloaderStore();

    const isEditable = ref<boolean>(false)

    const url: string = `${baseUrl}api/trainer/profile`;

    interface Idata {
        avatarUrl: string;
        vkLink: string;
        telegramLink: string;
        fullName: string;
        phoneNumber: string;
        email: string;
        specialization: string;
        address: string;
        info: string;
    }

    // const data = ref<Idata | null>(null);

    const data = ref<Idata>();

    onMounted(async (): Promise<void> => {
        preloaderStore.loading = true
        const result = await getData(url);
        data.value = result;
        preloaderStore.loading = false
    });
</script>

<style lang="scss"
    scoped>
    .coach {
        @import "@variables";

        &__container {
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
            cursor: pointer;
        }

        &__base-info-container {
            text-align: center;
            display: grid;
            grid-template-columns: min-content 1fr;
            grid-template-rows: min-content min-content 1fr;
            column-gap: 40px;
            margin-bottom: 40px;

            .coach__image {
                display: block;
                object-fit: cover;
                border-radius: 20px;
                grid-column: 1;
                grid-row: 1 / 4;
            }

            .coach__fio {
                font-size: 30px;
                text-align: start;
                margin: 20px 0;
            }

            .coach__specialization {
                text-align: start;
                font-size: 20px;
                margin-bottom: 40px;
            }

            .coach__link-container {
                grid-column: 2;
                height: fit-content;
                display: flex;
                column-gap: 20px;
                justify-self: start;
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
                margin-left: 22px;
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
