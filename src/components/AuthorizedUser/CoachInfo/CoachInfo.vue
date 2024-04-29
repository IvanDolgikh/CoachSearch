<template>
    <div class="coach">
        <div class="coach__logo-container">
            <Logo class="coach__logo" />
        </div>
        <div class="coach__container"
            v-if="dataTrainers">

            <div class="coach__base-info-container">
                <img class="coach__image"
                    v-if="dataTrainers.avatarUrl"
                    :src="dataTrainers.avatarUrl"
                    width="250"
                    height="250"
                    alt="Фото Тренера">
                <img class="coach__image"
                    v-else
                    src="../../../assets/images/mok/unknown.jpg"
                    width="250"
                    height="250"
                    alt="">
                <p class="coach__fio">{{ dataTrainers.fullName }}</p>
                <p class="coach__specialization">Специализация: <strong>{{ dataTrainers.specialization }}</strong></p>
                <div class="coach__link-container">
                    <a class="coach__social-link"
                        :href="dataTrainers.vkLink">
                        <IconVk class="coach__social-icon" />
                    </a>
                    <a class="coach__social-link"
                        :href="dataTrainers.telegramLink">
                        <IconTg class="coach__social-icon" />
                    </a>
                </div>
                <div class="coach__rating-container">
                    <div class="coach__like-container">
                        <button class="coach__like-button"
                            @click="addLike()">
                            <IconHeart class="coach__like-icon"
                                :class="{ 'coach_button_liked': isLiked }" />
                        </button>
                        <span class="coach__like-amout">{{ countLike }}</span>
                    </div>
                    <div class="coach__comment-container">
                        <a class="coach__comment-button"
                            href="#comments">
                            <IconComment class="coach__comment-icon" />
                        </a>
                        <span class="coach__comment-amout">{{ !dataTrainers.reviews ? 0 :
                JSON.parse(JSON.stringify(dataTrainers.reviews)).length }}</span>
                    </div>
                </div>
            </div>

            <div class="coach__additional-info-container">
                <div class="coach__contacts-container">
                    <p class="coach__contacts-title">Контактная информация</p>
                    <p class="coach__tel">Телефон: <strong>{{ dataTrainers.phoneNumber }}</strong></p>
                    <p class="coach__email">Эл почта: <strong>{{ dataTrainers.email }}</strong></p>
                    <p class="coach__address">Место проведения тренировок: <strong>{{ dataTrainers.address }}</strong>
                    </p>
                </div>

                <div class="coach__about-container">
                    <p class="coach__about-title">О себе</p>
                    <p class="coach__about">{{ dataTrainers.info }}</p>
                </div>

            </div>
            <Map class="coach__map" />

            <CoachInfoCommentForm class="coach__comments"
                id="comments"
                :coachId="coachId"
                :reviews="dataTrainers.reviews" />

        </div>
    </div>
</template>

<script setup
    lang="ts">
    import Map from '../../Lib/Map.vue';
    import CoachInfoCommentForm from './Comment/CoachInfoCommentForm.vue'
    import Logo from '../../Common/Logo.vue'

    import { ref, computed, onMounted } from 'vue'
    import { useRoute } from 'vue-router';
    import { useCoordsStore } from '../../../store/coordsStore'
    import { usePreloaderStore } from '../../../store/preloaderStore'
    import { getData, baseUrl } from '@api/api.js'
    import { initMap } from '@api/apiMap.js'

    import IconVk from "@icons-svg/icon-vk.svg"
    import IconTg from "@icons-svg/icon-tg.svg"
    import IconHeart from "@icons-svg/icon-heart.svg"
    import IconComment from "@icons-svg/icon-comment.svg"

    const coordsStore = useCoordsStore();
    const preloaderStore = usePreloaderStore();
    const route = useRoute();

    const APIKEY: string = 'b9792c26-9b3a-42d8-a4f6-5160e8801ffc';

    const getCoords = async (): Promise<void> => {
        try {
            const urlAddress: string = `https://geocode-maps.yandex.ru/1.x/?apikey=${APIKEY}&format=json&geocode=${coordsStore.address}`;

            const response = await fetch(urlAddress)
            if (response.ok) {
                const data = await response.json()
                const coordinates: string[] = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
                coordsStore.coords[0] = Number(coordinates[1])
                coordsStore.coords[1] = Number(coordinates[0])
                initMap(coordsStore.coords)
            }
        } catch (error) {
            console.log('Ошибка при получении координат:', error)
        }
    }

    const countLike = ref<number>(0)
    const isLiked = ref<boolean>(false)
    const coachId = computed<string>(() => route.params.coachId as string);

    const urlLike: string = `${baseUrl}api/coach/like/${coachId.value}`;

    const addLike = async (): Promise<void> => {
        isLiked.value = !isLiked.value

        if (isLiked.value === true) {
            ++countLike.value
        }
        else {
            --countLike.value
        }
        fetch(urlLike, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
    }

    const url: string = `${baseUrl}api/coach`

    interface IReviews {
        reviewId: string
        customerAvatarUrl: string,
        customerFullName: string,
        dateCreated: string,
        text: string,
    }

    interface IDataTrainers {
        avatarUrl: string,
        vkLink: string,
        telegramLink: string,
        fullName: string,
        coachId: string,
        reviews: IReviews[],
        phoneNumber: string,
        email: string,
        info: string,
        specialization: string,
        address: string,
    }

    // const dataTrainers = ref<IdataTrainers | null>(null)

    const dataTrainers = ref<IDataTrainers>()

    onMounted(async (): Promise<void> => {
        preloaderStore.loading = true
        const result = await getData(`${url}/${coachId.value}`)
        dataTrainers.value = result
        coordsStore.address = result.address
        countLike.value = result.likesCount
        isLiked.value = result.isLiked
        getCoords()
        preloaderStore.loading = false
    })


</script>

<style lang="scss"
    scoped>
    @import '@variables';

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

        &__container {
            max-width: 1440px;
            margin: 0 auto 10% auto;
            padding: 0 80px;
        }

        &__base-info-container {
            text-align: center;
            display: grid;
            grid-template-columns: min-content 1fr min-content;
            grid-template-rows: min-content min-content 1fr;
            column-gap: 40px;
            margin-bottom: 40px;
        }

        &__image {
            display: block;
            object-fit: cover;
            border-radius: 20px;
            grid-column: 1;
            grid-row: 1 / 4;
        }

        &__fio {
            font-size: 30px;
            text-align: start;
            margin: 20px 0;
        }

        &__specialization {
            text-align: start;
            font-size: 20px;
            margin-bottom: 40px;
            grid-column: 2;
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
            padding: 22px;
            border-radius: 20px;
            background-color: #e2e2e2;
            margin-bottom: 30px;
            display: flex;
            flex-direction: column;
            row-gap: 20px;
        }

        &__tel,
        &__email,
        &__address {
            font-size: 20px;
        }

        &__specialization-container {
            padding: 22px;
            border-radius: 20px;
            background-color: #e2e2e2;
            margin-bottom: 30px;
        }

        &__about-container {
            margin-left: 22px;
            margin: 0 0 50px 22px;
        }

        &__about {
            font-size: 20px;
            border-bottom: 1px solid $color-gray-lighter;
            padding-bottom: 10px;
            line-height: 1.6;
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

        &__info {
            display: flex;
            flex-direction: column;
            row-gap: 10px;
            width: 100%;
        }

        &__like-icon {
            fill: $color-gray-lighter;
        }

        &__comment-icon {
            stroke: $color-gray-lighter;
            fill: $color-gray-lighter;
        }

        &_button_liked {
            fill: rgb(255, 104, 104);
        }

        &__map {
            display: block;
            grid-column: 1 / 3;
            border-radius: 10px;
            margin-bottom: 50px;
        }

        &__comments {
            grid-column: 1 / 3;
        }

        &__rating-container {
            display: grid;
            grid-template-columns: 1fr auto auto;
            column-gap: 14px;
            grid-column: 3;
            grid-row: 1;

            button {
                display: flex;
                background-color: transparent;
                border: none;
                width: fit-content;
                padding: 0;
                cursor: pointer;
            }

            span {
                display: block;
                font-size: 20px;
                color: $color-base-text;
            }
        }

        &__like-container,
        &__comment-container {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            column-gap: 6px;
        }
    }
</style>
