<template>
<div class="coaches">
    <div class="coaches__container">
        <img class="coaches__promo-image" src="../../assets/images/promo-image.png" height="250" width="250" alt="Логотип CoachSearch.">
        <ul class="coaches__list">
            <li class="coaches__item">

                <img class="coaches__image" src="../../assets/images/mok/rain.jpg" width="150" height="150" alt="">
                <div class="coaches__info">
                    <p class="coaches__fio">Долгих Иван Алексеевич</p>
                    <p class="coaches__specialization">Специализация: <strong>Фитнес</strong></p>
                    <p class="coaches__gym">Место: <strong>Спортивный клуб "Антей"</strong></p>
                    <div class="coaches__button-container">
                        <router-link :to="{ name: 'coach'}" class="coaches__button-more">
                            <span>Подробнее</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#d8d8d8">
                                <polygon points="7.293 4.707 14.586 12 7.293 19.293 8.707 20.707 17.414 12 8.707 3.293 7.293 4.707"/>
                            </svg>
                        </router-link>

                        <div class="coaches__like-container">
                            <button class="coaches__like-button">
                                <svg fill="#ffffff" height="22" width="22" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 471.701 471.701">
                                    <g>
                                        <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
                                            c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
                                            l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
                                            C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
                                            s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
                                            c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
                                            C444.801,187.101,434.001,213.101,414.401,232.701z" />
                                    </g>
                                </svg>
                            </button>

                            <span class="coaches__like-amout">16</span>
                        </div>

                    </div>

                </div>

            </li>
        </ul>
    </div>
    <router-view></router-view>
</div>
</template>

<script setup>

</script>

<style lang="scss">
.coaches {

    &__container {
        max-width: 1440px;
        margin: 0 auto 10% auto;
        padding: 0 80px;
    }

    &__promo-image {
        display: block;
        margin: 5% auto 5% auto;
    }

    &__list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px 20px;
        width: fit-content;
        margin: 0 auto;
    }

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
}
</style>
