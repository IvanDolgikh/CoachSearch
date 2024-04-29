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
            <p class="users-comment__date">Дата публикации: {{ commentInfo.dateCreated.slice(0, 10) }}</p>
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
    width: 100%;

    &__container {
        display: grid;
        grid-template-columns: min-content 1fr;
        column-gap: 20px;
        box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        padding: 10px;
    }

    &__image {
        grid-column: 1;
        border-radius: 8px;
        grid-row: 1 / 3;
    }

    &__name {
        grid-column: 2;
        font-size: 22px;
        word-break: break-word;
        margin-bottom: 8px;
    }

    &__text {
        grid-column: 2;
        font-size: 18px;
        word-break: break-word;
        margin-right: 20%;
    }

    .users-comment {
        &__date {
            grid-column: 2;
            margin-top: 10px;
            font-size: 14px;
            color: #898989;
            text-align: end;
        }
    }

}
</style>