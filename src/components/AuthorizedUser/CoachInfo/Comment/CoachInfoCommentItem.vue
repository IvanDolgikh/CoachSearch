<template>
    <li class="users-comment">
        <div class="users-comment__container">
            <img class="users-comment__image"
                v-if="commentInfo.customerAvatarUrl"
                :src="commentInfo.customerAvatarUrl"
                width="70"
                height="70"
                alt="">
            <img class="users-comment__image"
                v-else
                src="../../../../assets/images/mok/unknown.jpg"
                width="70"
                height="70"
                alt="">
            <p class="users-comment__name">{{ commentInfo.customerFullName }}</p>
            <p class="users-comment__text">{{ commentInfo.text }}</p>
            <p class="users-comment__date">{{ commentInfo.dateCreated.slice(0, 10) }}</p>
        </div>
    </li>
</template>

<script setup
    lang="ts">
    import { defineProps } from 'vue';

    interface IcommentInfo {
        reviewId: string
        customerAvatarUrl: string,
        customerFullName: string,
        dateCreated: string,
        text: string,
    }

    defineProps<{
        commentInfo: IcommentInfo
    }>()
</script>

<style lang="scss">
.users-comment {
    width: 70%;

    @include vp-1199 {
        width: 80%;
    }

    @include vp-1199 {
        width: 100%;
    }

    &__container {
        display: grid;
        grid-template-columns: min-content 1fr;
        grid-template-rows: min-content 1fr min-content;
        column-gap: 20px;
        box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.2);
        background-color: #f7f7f7;
        border-radius: 10px;
        padding: 10px;

        @include vp-767 {
            column-gap: 12px;
            padding: 8px;
        }
    }

    &__image {
        object-fit: cover;
        grid-column: 1;
        border-radius: 8px;
        grid-row: 1 / 3;

        @include vp-1199 {
            width: 60px;
            height: 60px;
        }

        @include vp-767 {
            width: 50px;
            height: 50px;
        }
    }

    &__name {
        grid-column: 2;
        font-size: 20px;
        font-weight: 500;
        word-break: break-word;
        margin-bottom: 10px;

        @include vp-1199 {
            font-size: 18px;
            margin-bottom: 8px;
        }

        @include vp-767 {
            font-size: 16px;
            margin-bottom: 6px;
        }
    }

    &__text {
        grid-column: 2;
        font-size: 18px;
        font-weight: 400;
        word-break: break-word;
        margin: 0 20% 10px 0;

        @include vp-1199 {
            font-size: 16px;
            margin: 0 16% 8px 0;
        }

        @include vp-767 {
            font-size: 14px;
            margin: 0 16% 8px 0;
        }
    }

    &__date {
        grid-column: 2;
        font-size: 14px;
        font-weight: 400;
        color: #898989;
        text-align: end;

        @include vp-767 {
            font-size: 12px;
        }
    }


}
</style>