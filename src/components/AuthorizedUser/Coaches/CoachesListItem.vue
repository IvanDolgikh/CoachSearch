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
        <strong>Специализация:</strong> {{ specializations }}
      </p>

      <p class="coach__gym">
        <strong>Место:</strong> {{ coach.address }}
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

  import { useErrorsStore } from "../../../store/errorsStore";

  const errorsStore = useErrorsStore()

  interface IСoach {
    coachId: string;
    address: string;
    avatarUrl: string;
    fullName: string;
    isLiked: boolean;
    likesCount: number;
    specializations: string[];
    gender: string;
    age: number;
    workExperience: string;
  }

  const props = defineProps<{
    coach: IСoach;
  }>();

  const specializations = computed<string>(() => {
    if (props.coach.specializations) {
      return props.coach.specializations.join(', ')
    }
    return ''
  });

  const urlLike: string = `${baseUrl}api/coach/like/${props.coach.coachId}`;

  const countLike = ref<number>(0);
  countLike.value = props.coach.likesCount;
  const isLiked = ref<boolean>(false);
  isLiked.value = props.coach.isLiked;

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
</script>

<style lang="scss"
  scoped>
  .coach {

    &__item {
      display: grid;
      grid-template-rows: auto 1fr;
      padding: 22px 24px;
      background-color: $color-base-white;
      max-width: 360px;
      border-radius: 14px;
      box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.2);
      width: 100%;
      min-height: 500px;
      height: auto;

      @include vp-1199 {
        padding: 18px 22px;
        max-width: 320px
      }

      @include vp-767 {
        padding: 14px 18px;
        min-height: 450px;
      }
    }

    &__info {
      display: grid;
      grid-template-rows: min-content min-content min-content;
      row-gap: 14px;
    }

    &__fio {
      font-size: 22px;
      font-weight: 500;
      margin-bottom: 10px;
      line-height: 1.4;

      @include vp-1199 {
        font-size: 20px;
      }

      @include vp-767 {
        font-size: 18px;
      }
    }

    &__specialization,
    &__gym {
      font-size: 18px;
      line-height: 1.4;

      @include vp-1199 {
        font-size: 16px;
      }

      @include vp-767 {
        font-size: 14px;
      }

      strong {
        font-weight: 500;
      }
    }

    &__image {
      display: block;
      object-fit: cover;
      border-radius: 10px;
      width: 100%;
      height: 250px;
      margin-bottom: 22px;

      @include vp-1199 {
        height: 210px;
      }
    }

    &__button-container {
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    &__icon-right-arrow {
      width: 16px;
      height: 16px;
      fill: #898989;

      @include vp-1199 {
        width: 14px;
        height: 14px;
      }
    }

    &__button-more {
      display: flex;
      align-items: center;
      margin-top: auto;
      background-color: transparent;
      border: none;
      font-size: 16px;
      font-weight: 400;
      color: $color-base-text;
      padding: 0;
      cursor: pointer;


      @include vp-1199 {
        font-size: 14px;
      }

      @include vp-767 {
        font-size: 12px;
      }

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
        font-size: 18px;
      }

      @include vp-1199 {
        span {
          font-size: 16px;
        }
      }

      @include vp-767 {
        span {
          font-size: 14px;
        }
      }

    }

    &__like-icon {
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
</style>
