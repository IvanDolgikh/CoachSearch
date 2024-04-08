<template>
    <div class="main">
        <div class="main__container">
            <h1 class="visually-hidden">
                Coach Search, найди подходящего тренера
            </h1>
            <section class="promo">
                <div class="promo__container">
                    <p class="promo__title">Подбери нужного себе тренера</p>
                    <p class="promo__description">
                        Тренер&nbsp;&mdash; это специалист
                        по&nbsp;общефизической подготовке, который работает
                        с&nbsp;посетителями тренажерных и&nbsp;спортивных залов.
                    </p>
                    <router-link class="promo__link-authorization"
                        to="/authorization">
                        <IconArrowRight class="promo__icon-arrow-right" />
                    </router-link>
                </div>
            </section>

            <section class="fitness">
                <div class="fitness__container">
                    <div class="fitness__title-container">
                        <h2>Фитнес</h2>
                    </div>

                    <div class="fitness__description-container">
                        <p>
                            Вид физических нагрузок, которые направлены
                            на&nbsp;поддержание общей физической формы. Кроме
                            физических нагрузок, фитнес предполагает здоровое
                            питание. Всё это подбирается
                            индивидуально&nbsp;&mdash; в&nbsp;зависимости
                            от&nbsp;возраста, состояния здоровья, строения
                            и&nbsp;особенностей фигуры.
                        </p>
                    </div>
                </div>
            </section>

            <section class="facts">
                <div class="facts__container">
                    <h2 class="facts__title">Немного мотивирующих фактов</h2>
                    <ul class="facts__list">
                        <li class="facts__item">
                            <p class="facts__count">01</p>
                            <p class="facts__description">
                                Занятия спортом помогают отвлечься
                                от&nbsp;проблем и&nbsp;снизить уровень стресса.
                            </p>
                        </li>
                        <li class="facts__item">
                            <p class="facts__count">02</p>
                            <p class="facts__description">
                                В&nbsp;ответ на&nbsp;физические нагрузки
                                в&nbsp;организме вырабатываются эндорфины,
                                поэтому после тренировки вы&nbsp;чувствуете себя
                                лучше.
                            </p>
                        </li>
                        <li class="facts__item">
                            <p class="facts__count">03</p>
                            <p class="facts__description">
                                Тренировки помогают вывести из&nbsp;организма
                                токсины, что делает кожу более упругой
                                и&nbsp;красивой.
                            </p>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup
    lang="ts">
    import IconArrowRight from "@icons-svg/icon-arrow-right.svg";
</script>

<style lang="scss">
@import "@variables";

.promo {
    background-color: #0d0e10;
    background-image: url("../../assets/images/decorations/promo.jpg");
    background-repeat: no-repeat;
    background-size: cover;

    &__container {
        padding: 0 100px 100px 100px;
        max-width: $max-width-ds;
        margin: 0 auto 80px auto;
        min-height: calc(100vh - 104px);
    }

    &__title {
        font-size: 80px;
        font-weight: 200;
        color: #9d9d9d;
        padding-top: 10%;
        margin: 0 24% 6% 0;
    }

    &__description {
        font-size: 18px;
        color: #9d9d9d;
        margin: 0 54% 8% 0;
        line-height: 1.7;
    }

    &__image {
        display: block;
        object-fit: cover;
        border-radius: 20px;
        width: auto;
        height: 400px;
    }

    &__link-authorization {
        display: block;
        padding: 30px;
        width: fit-content;
        border: 2px solid $color-base-white;
        border-radius: 50%;
        margin-left: 30%;

        svg {
            fill: $color-base-white;
        }
    }

    &__icon-arrow-right {
        width: 36px;
        height: 36px;
        fill: $color-base-white;
    }
}

.fitness {
    &__container {
        padding: 0 100px;
        margin-bottom: 80px;
    }

    &__title-container {
        h2 {
            font-size: 190px;
            text-transform: uppercase;
            letter-spacing: 20px;
            font-weight: 100;
            color: #404040;
            margin-bottom: 40px;
        }
    }

    &__description-container {
        background-color: #d2d2d2;
        margin-left: 12%;
        padding: 30px;
        box-shadow: 5px 5px 27px 1px rgba(0, 0, 0, 0.2);

        p {
            font-size: 24px;
            line-height: 1.8;
        }
    }
}

.facts {
    &__container {
        padding: 50px 100px 120px 100px;
        background-color: #d2d2d2;
    }

    &__title {
        font-weight: 300;
        font-size: 46px;
        text-align: center;
        margin-bottom: 40px;
    }

    &__list {
        display: flex;
        flex-direction: column;
        column-gap: 30px;
        padding: 0 100px;
    }

    &__item {
        display: grid;
        grid-template-columns: 1fr 3fr;
        align-items: center;
        column-gap: 70px;
        border-bottom: 1px solid #929292;
    }

    &__count {
        font-size: 190px;
        font-weight: 500;
        color: #e4e4e4;
    }

    &__description {
        font-size: 24px;
        line-height: 1.6;
    }
}

// .main {
//     &__image {
//         display: block;
//         margin: 5% auto 5% auto;
//     }

//     &__search-contrainer {
//         width: fit-content;
//         margin: 0 auto 10% auto;
//         display: grid;
//         grid-template-columns: repeat(3, min-content);
//         grid-template-rows: repeat(3, min-content);
//     }

//     &__search-image-1 {
//         display: block;
//         grid-row: 1;
//         grid-column: 1;
//         margin-right: -40px;
//         margin-bottom: -20px;
//     }

//     &__search-image-2 {
//         display: block;
//         grid-row: 1;
//         grid-column: 3;
//         margin-left: -40px;
//         margin-bottom: -20px;
//     }

//     &__search-image-3 {
//         display: block;
//         grid-row: 3;
//         grid-column: 2;
//     }

//     &__search-button {
//         background-color: transparent;
//         border-radius: 50%;
//         border: none;
//         cursor: pointer;
//         grid-row: 2;
//         grid-column: 2;
//     }
// }</style>
