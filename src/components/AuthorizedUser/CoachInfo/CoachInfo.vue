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
                <p class="coach__specialization"><span>Специализация:</span> <strong>{{ specializations }}</strong></p>
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
                dataTrainers.reviews.length }}</span>
                    </div>
                </div>
            </div>


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


            <div class="coach__map">
                <Map />
            </div>

            <CoachInfoCommentForm class="coach__comments"
                id="comments"
                :coachId="coachId"
                :reviews="dataTrainers.reviews" />
        </div>
        <ErrorGetData v-if="errorsStore.errorGettingData" />

        <Transition name="error-like">
            <ErrorLike v-if="errorsStore.errorLeaveLike" />
        </Transition>
    </div>
</template>

<script setup
    lang="ts">
    import ErrorGetData from "../../Common/ErrorGetData.vue";
    import ErrorLike from "../../Common/ErrorLike.vue"
    import Map from '../../Lib/Map.vue';
    import CoachInfoCommentForm from './Comment/CoachInfoCommentForm.vue'
    import Logo from '../../Common/Logo.vue'

    import { ref, computed, onMounted } from 'vue'
    import { useRoute } from 'vue-router';
    import { useCoordsStore } from '../../../store/coordsStore'
    import { usePreloaderStore } from '../../../store/preloaderStore'
    import { useErrorsStore } from "../../../store/errorsStore";
    import { getData, baseUrl } from '@api/api.js'
    import { initMap } from '@api/apiMap.js'

    import IconVk from "@icons-svg/icon-vk.svg"
    import IconTg from "@icons-svg/icon-tg.svg"
    import IconHeart from "@icons-svg/icon-heart.svg"
    import IconComment from "@icons-svg/icon-comment.svg"

    const coordsStore = useCoordsStore();
    const preloaderStore = usePreloaderStore();
    const errorsStore = useErrorsStore();

    const route = useRoute();

    const APIKEY: string = 'b9792c26-9b3a-42d8-a4f6-5160e8801ffc';

    const getCoords = async (): Promise<void> => {
        try {
            const urlAddress: string = `https://geocode-maps.yandex.ru/1.x/?apikey=${APIKEY}&format=json&geocode=${coordsStore.address}`;

            const response: any = await fetch(urlAddress)
            if (response.ok) {
                const data: any = await response.json()
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

        try {

            const response: any = await fetch(urlLike, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                }
            });

            if (response.ok) {

                isLiked.value = !isLiked.value
                isLiked.value === true ? ++countLike.value : --countLike.value

            } else {
                throw Error
            }

        } catch (error: any) {
            errorsStore.showAndHideLeaveLikeError()
        }
    };

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
        specializations: string[],
        address: string,
    }

    const dataTrainers = ref<IDataTrainers>()

    const specializations = computed<string>(() => {
        if (dataTrainers.value?.specializations) {
            return dataTrainers.value.specializations.join(', ')
        }
        return ''
    });

    const getCoachInfo = async (): Promise<void> => {
        try {
            const result = await getData(`${url}/${coachId.value}`)
            dataTrainers.value = result
            coordsStore.address = result.address
            countLike.value = result.likesCount
            isLiked.value = result.isLiked
            getCoords()
        } catch (error: any) {
            errorsStore.showAndHideGettingDataError()
        }
    }

    onMounted(async (): Promise<void> => {
        preloaderStore.loading = true
        await getCoachInfo()
        preloaderStore.loading = false
    })


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
            grid-row: 1 / 4;

            @include vp-1199 {
                width: 180px;
                height: 180px;
            }

            @include vp-767 {
                width: 120px;
                height: 120px;
                margin: 0 auto 20px auto;
                order: 1;

            }
        }

        &__fio {
            font-size: 30px;
            text-align: start;
            margin: 20px 0;

            @include vp-1199 {
                font-size: 26px;
                margin: 14px 0 16px 0;
                grid-column: 2 / 4;
            }

            @include vp-767 {
                font-size: 22px;
                text-align: center;
                margin: 0 0 14px 0;
                order: 2;
            }
        }

        &__specialization {
            font-size: 18px;

            @include vp-1199 {
                font-size: 16px;
                grid-row: 2;
                grid-column: 2 / 4;
            }

            @include vp-767 {
                font-size: 14px;
                order: 3;
                text-align: center;
                margin-bottom: 12px;

                span {
                    display: none;
                }
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
                margin: 0 auto;
                order: 3;
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
            margin: 0 0 40px 22px;

            @include vp-1199 {
                margin: 0 0 30px 18px;
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

        &__about-title {
            margin-bottom: 18px;

            @include vp-1199 {
                margin-bottom: 14px;
            }

            @include vp-767 {
                margin-bottom: 12px;
            }
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

        &__map {
            min-width: auto;
            width: 100%;
            display: block;
            border-radius: 10px;
            margin-bottom: 50px;

            @include vp-1199 {
                margin-bottom: 40px;
            }

            @include vp-767 {
                margin-bottom: 30px;
            }
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
                font-size: 18px;
                color: $color-base-text;
                font-weight: 400;
            }

            @include vp-1199 {
                grid-row: 4;

                span {
                    font-size: 16px;
                }
            }

            @include vp-767 {
                order: 0;

                span {
                    font-size: 14px;
                }
            }
        }

        &__like-container,
        &__comment-container {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            column-gap: 6px;

            @include vp-767 {
                column-gap: 4px;
            }
        }

        &__like-icon,
        &__comment-icon {
            stroke: $color-gray-lighter;
            fill: $color-gray-lighter;
            width: 18px;
            height: 18px;
            transition: fill 0.2s;

            @include vp-1199 {
                width: 16px;
                height: 16px;
            }

            @include vp-1199 {
                width: 14px;
                height: 14px;
            }
        }


        &_button_liked {
            fill: rgb(255, 104, 104);
            transition: fill 0.2s;
        }
    }

    .error-like-enter-active,
    .error-like-leave-active {
        transition: opacity 0.2s ease;
    }

    .error-like-enter-from,
    .error-like-leave-to {
        opacity: 0;
    }
</style>
