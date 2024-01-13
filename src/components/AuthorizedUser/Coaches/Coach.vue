<template>
<li class="coach__item">

    <img class="coach__image" v-if="coach.avatarUrl" :src="coach.avatarUrl" width="150" height="150" alt="">
    <img class="coach__image" v-else src="../../../assets/images/mok/unknown.jpg" width="150" height="150" alt="">
    <div class="coach__info">
        <p class="coach__fio">{{ coach.fullName }}</p>
        <p class="coach__specialization">Специализация: <strong>{{ coach.specialization }}</strong></p>

        <p class="coach__gym">Место: <strong>{{ coach.address }}</strong></p>
        <div class="coach__button-container">
            <router-link :to="{ name: 'coach', params: { trainerId: coach.trainerId }}" class="coach__button-more">
                <span>Подробнее</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#d8d8d8">
                    <polygon points="7.293 4.707 14.586 12 7.293 19.293 8.707 20.707 17.414 12 8.707 3.293 7.293 4.707" />
                </svg>
            </router-link>

            <div class="coach__like-container">
 
                <button class="coach__like-button coach_button_liked" @click="addLike(coach.trainerId)">
                    <svg class="coach__like-icon" :class="{'coach_button_liked': isLiked}" xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512">
                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" /></svg>
                </button>

                <span class="coach__like-amout">{{ countLike }}</span>
            </div>

        </div>

    </div>

</li>
</template>

    
<script setup>
import { ref, computed } from 'vue' 
import { baseUrl } from '@api/api.js'

const urlLike = `${baseUrl}api/like`

const props = defineProps(['coach'])

const countLike = ref(0)
countLike.value = props.coach.likesCount
const isLiked = ref(false)
isLiked.value = props.coach.isLiked

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
</script>

    
<style lang="scss" scoped>

.coach {
    &__item {
        display: grid;
        grid-template-columns: min-content 1fr;
        column-gap: 30px;
        padding: 24px 28px 24px 28px;
        background-color: rgb(41, 41, 41);
        width: fit-content;
        max-width: 627px;
        border-radius: 14px;
        box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.2);
    }

    &__info {
        display: flex;
        flex-direction: column;
        row-gap: 10px;

        p {
            color: rgb(216, 216, 216);
        }
    }

    &__fio {
        font-size: 30px;
        border-bottom: 2px solid rgb(216, 216, 216);
        padding-bottom: 6px;
        margin-bottom: 16px;
    }

    &__specialization,
    &__gym {
        font-size: 20px;

        strong {
            font-weight: 600;
        }
    }

    &__image {
        display: block;
        object-fit: cover;
        border-radius: 50%;
    }

    &__button-container {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
    }

    &__button-more {
        display: flex;
        align-items: center;
        background-color: transparent;
        border: none;
        font-size: 18px;
        color: rgb(216, 216, 216);
        padding: 0;
        cursor: pointer;

        span {
            display: block;
            margin-right: 5px;
        }
    }

    &__like-container {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        column-gap: 6px;

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

    &__like-icon {
        fill: #ffffff;
    }

    &_button_liked {
        fill: rgb(255, 104, 104);
    }
}
</style>
