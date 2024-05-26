<template>
    <div class="comments">
        <div class="comments__container">
            <form class="comments__form"
                v-if="accessToComments"
                @submit.prevent="acceptData()">
                <p class="comments__title">Оставить комментарий</p>

                <label>
                    <textarea id=""
                        cols="20"
                        rows="4"
                        v-model.lazy="data.reviewText"></textarea>
                </label>

                <button>Отправить</button>
            </form>
            <ul class="comments__list">
                <CoachInfoCommentItem v-for="value in props.reviews"
                    :commentInfo="value" />
            </ul>
        </div>
    </div>
</template>

<script setup
    lang="ts">
    import CoachInfoCommentItem from './CoachInfoCommentItem.vue'

    import { reactive, defineProps } from 'vue'
    import { baseUrl } from '@api/api.js'

    import { usePreloaderStore } from '../../../../store/preloaderStore'

    const preloaderStore = usePreloaderStore();

    const accessToComments: boolean = localStorage.getItem('role') === 'Customer'

    interface IReviews {
        reviewId: string
        customerAvatarUrl: string,
        customerFullName: string,
        dateCreated: string,
        text: string,
    }

    interface IData {
        coachId: string,
        reviewText: string
    }

    const props = defineProps<{
        coachId: string
        reviews: IReviews[]
    }>()

    const data: IData = reactive({
        coachId: props.coachId,
        reviewText: ''
    })

    const url: string = `${baseUrl}api/coach/review/${props.coachId}`

    const acceptData = async (): Promise<void> => {
        preloaderStore.loading = true
        try {
            const response: any = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                const result: IReviews = await response.json()
                props.reviews.push(result)
                data.reviewText = ''
            } else {
                throw Error
            }
        } catch (error: any) {
            preloaderStore.loading = false
            throw error
        }
        preloaderStore.loading = false
    }
</script>

<style lang="scss"
    scoped>

    .comments {
        &__title {
            font-size: 24px;
            font-weight: 400;
            margin-bottom: 20px;

            @include vp-1199 {
                font-size: 22px;
                margin-bottom: 18px;
            }

            @include vp-767 {
                font-size: 20px;
                margin-bottom: 16px;
            }
        }

        &__form {
            margin-bottom: 50px;

            @include vp-1199 {
                margin-bottom: 40px;
            }

            @include vp-767 {
                margin-bottom: 30px;
            }
        }

        &__list {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;

            @include vp-1199 {
                gap: 16px
            }

            @include vp-767 {
                gap: 12px
            }
        }


        textarea {
            background-color: transparent;
            resize: none;
            font-size: 18px;
            color: $color-base-text;
            margin-bottom: 15px;
            width: 100%;
            border-radius: 5px;
            padding: 5px 10px;

            @include vp-1199 {
                font-size: 16px;
            }

            @include vp-767 {
                font-size: 14px;
            }

            &:hover,
            &:focus-visible {
                outline: none;
                border-color: $color-accent-middle;
                transition: border 0.2s;
            }

            &:active {
                border-color: $color-accent-lighter;
            }
        }

        button {
            display: block;
            background-color: transparent;
            border-radius: 10px;
            border: 1px solid $color-gray-lighter;
            font-size: 16px;
            font-family: "Montserrat", sans-serif;
            font-weight: 400;
            padding: 8px 24px;
            cursor: pointer;
            transition: background-color 0.2s;

            &:hover,
            &:focus-visible {
                outline: none;
                background-color: $color-base-text;
                color: $color-base-white;
                transition: background-color 0.2s color 0.2s;
            }

            &:active {
                background-color: $color-gray-lighter;
                color: $color-base-white;
            }

            @include vp-1199 {
                font-size: 14px;
                padding: 6px 22px;
            }

            @include vp-767 {
                font-size: 12px;
                padding: 6px 18px;
            }
        }

    }
</style>
