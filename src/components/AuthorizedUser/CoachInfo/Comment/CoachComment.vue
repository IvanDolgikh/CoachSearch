<template>
<div class="comments">
    <div class="comments__container">
        <form class="comments__form" method="post" @submit.prevent="acceptData()">
            <p class="comments__title">Оставить комментарий</p>
            <div class="comments__input-container">
                <label>
                    <textarea id="" cols="30" rows="5" v-model.lazy="data.reviewText"></textarea>
                </label>
                <button>Отправить</button>
            </div>
        </form>
        <ul class="comments__list">
            <CoachCommentItem v-for="value in props.reviews" :commentInfo = "value"></CoachCommentItem>
        </ul>
    </div>
</div>
</template>

<script setup>
import CoachCommentItem from './UsersCommentItem.vue'
import { reactive, ref, defineProps } from 'vue'
import { baseUrl } from '@api/api.js'

const url = `${baseUrl}review/add`

const props = defineProps({
    trainerId: {
        type: String,
        required: true
    },
    reviews: {
        type: Array
    }
})


const data = reactive({
    trainerId: props.trainerId,
    reviewText: ''
})

const acceptData = async () => {

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            const result = await response.json()
            props.reviews.push(result)
            data.reviewText = ''
        } else {
            throw new Error('Something wrong')
        }
    } catch (error) {
        throw error
    }
}
</script>

<style lang="scss">
.comments {
    &__title {
        font-size: 30px;
        margin-bottom: 20px;
    }

    &__form {
        margin-bottom: 50px;
    }

    &__list {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 40px;
        gap: 20px;
    }

    &__input-container {
        textarea {
            background-color: transparent;
            resize: none;
            font-size: 20px;
            color: #ffffff;
            margin-bottom: 15px;
            width: 70%;
            border-radius: 5px;
            padding: 5px 10px;

            &:focus-visible {
                outline: none;
            }
        }

        button {
            display: block;
            background-color: transparent;
            border-radius: 10px;
            border: 1px solid rgb(216, 216, 216);
            font-family: "Montserrat", sans-serif;
            color: rgb(216, 216, 216);
            padding: 5px 15px;
            cursor: pointer;
        }
    }
}
</style>
