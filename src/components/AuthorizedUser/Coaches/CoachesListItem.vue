<template>
  <li class="coach__item">
    <img class="coach__image"
      v-if="coach.avatarUrl"
      :src="coach.avatarUrl"
      width="150"
      height="150"
      alt="" />
    <img class="coach__image"
      v-else
      src="../../../assets/images/mok/unknown.jpg"
      width="150"
      height="150"
      alt="" />
    <div class="coach__info">
      <p class="coach__fio">{{ coach.fullName }}</p>
      <p class="coach__specialization">
        Специализация: <strong>{{ specializations }}</strong>
      </p>

      <p class="coach__gym">
        Место: <strong>{{ coach.address }}</strong>
      </p>
      <div class="coach__button-container">
        <router-link :to="{ name: 'coach', params: { coachId: coach.coachId } }"
          class="coach__button-more">
          <span>Подробнее</span>
          <IconRightArrow class="coach__icon-right-arrow" />
        </router-link>

        <div class="coach__like-container">
          <button class="coach__like-button coach_button_liked"
            @click="addLike()">
            <IconHeart class="coach__like-icon"
              :class="{ coach_button_liked: isLiked }" />
          </button>

          <span class="coach__like-amout">{{ countLike }}</span>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup
  lang="ts">
  import { ref, computed } from "vue";
  import { baseUrl } from "@api/api.js";

  import IconRightArrow from "@icons-svg/icon-right-arrow.svg";
  import IconHeart from "@icons-svg/icon-heart.svg";

  interface IСoach {
    coachId: string;
    address: string;
    avatarUrl: string;
    fullName: string;
    isLiked: boolean;
    likesCount: number;
    specializations: string[];
  }

  const props = defineProps<{
    coach: IСoach;
  }>();

  const specializations = computed(() => {
    if (props.coach.specializations) {
      return props.coach.specializations.join(', ')
    }
  });

  const urlLike: string = `${baseUrl}api/coach/like/${props.coach.coachId}`;

  const countLike = ref<number>(0);
  countLike.value = props.coach.likesCount;
  const isLiked = ref<boolean>(false);
  isLiked.value = props.coach.isLiked;

  const addLike = async (): Promise<void> => {
    isLiked.value = !isLiked.value;

    if (isLiked.value === true) {
      ++countLike.value;
    } else {
      --countLike.value;
    }
    fetch(urlLike, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      }
    });
  };
</script>

<style lang="scss"
  scoped>
  .coach {
    @import "@variables";

    &__item {
      display: grid;
      grid-template-columns: min-content 1fr;
      column-gap: 30px;
      padding: 24px 28px 24px 28px;
      background-color: $color-base-white;
      max-width: 627px;
      border-radius: 14px;
      box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.2);
      width: 100%;
      height: auto;
    }

    &__info {
      display: flex;
      flex-direction: column;
      row-gap: 18px;
    }

    &__fio {
      font-size: 30px;
      border-bottom: 2px solid $color-gray-lighter;
      padding-bottom: 6px;
      margin-bottom: 16px;
    }

    &__specialization,
    &__gym {
      font-size: 20px;

      strong {
        font-weight: 500;
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

    &__icon-right-arrow {
      width: 18px;
      height: 18px;
      fill: #898989;
    }

    &__button-more {
      display: flex;
      align-items: center;
      background-color: transparent;
      border: none;
      font-size: 18px;
      font-weight: 500;
      color: $color-base-text;
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
      }
    }

    &__like-icon {
      fill: $color-gray-lighter;
    }

    &_button_liked {
      fill: rgb(255, 104, 104);
    }
  }
</style>
