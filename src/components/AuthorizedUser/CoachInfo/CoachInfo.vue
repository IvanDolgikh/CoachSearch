<template>
<div class="coach">
    <div class="coach__container">

        <img class="coach__promo-image" src="../../../assets/images/promo-image.png" height="250" width="250" alt="Логотип CoachSearch.">

        <div class="coach__info-container">

            <div class="coach__image-container">
                <img class="coach__image" v-if="dataTrainers.avatarUrl" :src="dataTrainers.avatarUrl" width="200" height="200" alt="Фото тренера">
                <img class="coach__image" v-else src="../../../assets/images/mok/unknown.jpg" width="200" height="200" alt="">
                <a class="coach__social-link" :href="dataTrainers.vkLink">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="38" height="38">
                        <path fill="#1976d2" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z" />
                        <path fill="#fff" d="M35.937,18.041c0.046-0.151,0.068-0.291,0.062-0.416C35.984,17.263,35.735,17,35.149,17h-2.618 c-0.661,0-0.966,0.4-1.144,0.801c0,0-1.632,3.359-3.513,5.574c-0.61,0.641-0.92,0.625-1.25,0.625C26.447,24,26,23.786,26,23.199 v-5.185C26,17.32,25.827,17,25.268,17h-4.649C20.212,17,20,17.32,20,17.641c0,0.667,0.898,0.827,1,2.696v3.623 C21,24.84,20.847,25,20.517,25c-0.89,0-2.642-3-3.815-6.932C16.448,17.294,16.194,17,15.533,17h-2.643 C12.127,17,12,17.374,12,17.774c0,0.721,0.6,4.619,3.875,9.101C18.25,30.125,21.379,32,24.149,32c1.678,0,1.85-0.427,1.85-1.094 v-2.972C26,27.133,26.183,27,26.717,27c0.381,0,1.158,0.25,2.658,2c1.73,2.018,2.044,3,3.036,3h2.618 c0.608,0,0.957-0.255,0.971-0.75c0.003-0.126-0.015-0.267-0.056-0.424c-0.194-0.576-1.084-1.984-2.194-3.326 c-0.615-0.743-1.222-1.479-1.501-1.879C32.062,25.36,31.991,25.176,32,25c0.009-0.185,0.105-0.361,0.249-0.607 C32.223,24.393,35.607,19.642,35.937,18.041z" /></svg>
                </a>
                <a class="coach__social-link" :href="dataTrainers.telegramLink">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="38" height="38">
                        <path fill="#29b6f6" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z" />
                        <path fill="#fff" d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z" />
                        <path fill="#b0bec5" d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z" />
                        <path fill="#cfd8dc" d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z" /></svg>
                </a>
            </div>

            <div class="coach__info info">
                <div class="info__rating-container">
                    <p class="info__fio">{{ dataTrainers.fullName }}</p>

                    <div class="info__like-container">
                        <button class="info__like-button coach_button_liked" @click="addLike(dataTrainers.trainerId)">
                            <svg class="info__like-icon" :class="{'info_button_liked': isLiked}" xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512">
                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" /></svg>
                        </button>

                        <span class="info__like-amout">{{ countLike }}</span>
                    </div>

                    <div class="info__comment-container" м->
                        <button class="info__comment-button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="22" height="22" stroke="#ffffff" fill="#ffffff">
                                <path d="M 25 4.0625 C 12.414063 4.0625 2.0625 12.925781 2.0625 24 C 2.0625 30.425781 5.625 36.09375 11 39.71875 C 10.992188 39.933594 11 40.265625 10.71875 41.3125 C 10.371094 42.605469 9.683594 44.4375 8.25 46.46875 L 7.21875 47.90625 L 9 47.9375 C 15.175781 47.964844 18.753906 43.90625 19.3125 43.25 C 21.136719 43.65625 23.035156 43.9375 25 43.9375 C 37.582031 43.9375 47.9375 35.074219 47.9375 24 C 47.9375 12.925781 37.582031 4.0625 25 4.0625 Z M 25 5.9375 C 36.714844 5.9375 46.0625 14.089844 46.0625 24 C 46.0625 33.910156 36.714844 42.0625 25 42.0625 C 22.996094 42.0625 21.050781 41.820313 19.21875 41.375 L 18.65625 41.25 L 18.28125 41.71875 C 18.28125 41.71875 15.390625 44.976563 10.78125 45.75 C 11.613281 44.257813 12.246094 42.871094 12.53125 41.8125 C 12.929688 40.332031 12.9375 39.3125 12.9375 39.3125 L 12.9375 38.8125 L 12.5 38.53125 C 7.273438 35.21875 3.9375 29.941406 3.9375 24 C 3.9375 14.089844 13.28125 5.9375 25 5.9375 Z" /></svg>
                        </button>

                        <span class="info__comment-amout">{{ !dataTrainers.reviews ? 0 : JSON.parse(JSON.stringify(dataTrainers.reviews)).length }}</span>
                    </div>

                </div>
                <p class="info__tel">Тел: <strong>{{ dataTrainers.phoneNumber }}</strong></p>
                <p class="info__email">Эл почта: <strong>{{ dataTrainers.email }}</strong></p>
                <p class="info__about-title">О себе:</p>
                <p class="info__about">{{ dataTrainers.info }}</p>
                <p class="info__specialization">Специализация: <strong>{{ dataTrainers.specialization }}</strong></p>

                <div class="info__place">
                    <svg width="28" height="28" viewBox="0 0 68 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M63.6141 33.807C63.6141 50.2691 33.807 78.5176 33.807 78.5176C33.807 78.5176 4 50.2691 4 33.807C4 17.3451 17.3451 4 33.807 4C50.2691 4 63.6141 17.3451 63.6141 33.807Z" fill="white" stroke-width="7" />
                        <path d="M33.7259 37.5328C35.7837 37.5328 37.4518 35.8647 37.4518 33.8069C37.4518 31.7492 35.7837 30.0811 33.7259 30.0811C31.6681 30.0811 30 31.7492 30 33.8069C30 35.8647 31.6681 37.5328 33.7259 37.5328Z" fill="white" stroke="black" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p>{{ dataTrainers.address }}</p>
                </div>

            </div>
            <Map class="info__map"></Map>
            <!-- слева пропс справа значение -->
            <CoachComment class="info__comments" :trainerId="trainerId" :reviews = "dataTrainers.reviews"></CoachComment>
        </div>
    </div>
</div>
</template>

<script setup>
import Map from '../../Lib/Map.vue';
import CoachComment from './Comment/CoachComment.vue'

import { ref, computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router';
import { useCoordsStore } from '../../../store/coordsStore'
import { getData, baseUrl } from '@api/api.js'
import { initMap } from '@api/apiMap.js'

const a = reactive([1,2,3,4])

const coordsStore = useCoordsStore();
const route = useRoute();

const apiKey = 'b9792c26-9b3a-42d8-a4f6-5160e8801ffc';

const getCoords = async () => {
    try {
        const urlAddress = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${coordsStore.address}`;

        const response = await fetch(urlAddress)
        if (response.ok) {
            const data = await response.json()
            const coordinates = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
            coordsStore.coords[0] = Number(coordinates[1])
            coordsStore.coords[1] = Number(coordinates[0])
            initMap(coordsStore.coords)
        }
    } catch (error) {
        console.log('Ошибка при получении координат:', error)
    }
}


const urlLike = `${baseUrl}api/like`
const countLike = ref(0)
const isLiked = ref(false)
const trainerId = computed(() => route.params.trainerId);

const addLike = async (id) => {
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
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
            trainerId: id
        })
    })
}

const url = `${baseUrl}api/trainer`
const dataTrainers = ref([])

onMounted(async() => {
    const result = await getData(`${url}/${trainerId.value}`)
    dataTrainers.value = result
    coordsStore.address = result.address
    countLike.value = result.likesCount
    isLiked.value = result.isLiked
    getCoords()
})


</script>

<style lang="scss">
.coach {
    &__container {
        max-width: 1440px;
        margin: 0 auto 10% auto;
        padding: 0 80px;
    }

    &__info-container {
        display: grid;
        grid-template-columns: min-content 1fr;
        column-gap: 30px;
        background-color: rgb(41, 41, 41);
        padding: 20px 30px;
        border-radius: 14px;
        box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.2);
    }

    &__promo-image {
        display: block;
        margin: 5% auto 5% auto;
    }

    &__image-container {
        text-align: center;

        .coach__image {
            display: block;
            object-fit: cover;
            border-radius: 50%;
            margin-bottom: 25px;
        }

        .coach__social-link {
            display: inline-block;

            &:last-child {
                margin-left: 15px;
            }
        }
    }

    &__info {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        width: 100%;
    }

    p {
        color: rgb(216, 216, 216);
    }
}

.info {
    &__rating-container {
        display: grid;
        grid-template-columns: 1fr auto auto;
        column-gap: 14px;

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
            color: rgb(216, 216, 216);
        }
    }

    &__like-container,
    &__comment-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        column-gap: 6px;
    }

    &__fio {
        font-size: 30px;
        margin-bottom: 16px;
        width: fit-content;
    }

    &__tel,
    &__email,
    &__about-title,
    &__specialization {
        font-size: 20px;

        strong {
            font-weight: 600;
        }
    }

    &__email {
        margin-bottom: 20px;
    }

    &__specialization {
        margin-bottom: 10px;
    }

    &__about {
        font-size: 16px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgb(216, 216, 216);
        margin-bottom: 20px;
    }

    &__place {
        display: flex;
        align-items: center;
        column-gap: 8px;
        margin-bottom: 40px;

        svg {
            display: block;
        }

        p {
            font-size: 20px;
        }

    }

    &__like-icon {
        fill: #ffffff;
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
}
</style>
