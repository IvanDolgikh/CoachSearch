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

                    <h2 class="fitness__title">Фитнес</h2>

                    <p class="fitness__description">
                        Вид физических нагрузок, которые направлены
                        на&nbsp;поддержание общей физической формы. Кроме
                        физических нагрузок, фитнес предполагает здоровое
                        питание. Всё это подбирается
                        индивидуально&nbsp;&mdash; в&nbsp;зависимости
                        от&nbsp;возраста, состояния здоровья, строения
                        и&nbsp;особенностей фигуры.
                    </p>

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
                                от&nbsp;проблем и&nbsp;снизить уровень стресса, а&nbsp;также улучшить ментальное
                                состояние
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
.promo {
    background-color: #0d0e10;
    background-image: url("../../assets/images/decorations/promo.jpg");
    background-repeat: no-repeat;
    background-size: cover;

    @include vp-1199 {
        background-position: center top;
    }

    @include vp-767 {
        background-position: 60%;
    }

    &__container {
        padding: 0 100px 100px 100px;
        max-width: $max-width-ds;
        margin: 0 auto 80px auto;
        min-height: calc(100vh - 100px);

        @include vp-1199 {
            padding: 0 60px 60px 60px;
            margin-bottom: 60px;
            min-height: calc(100vh - 72px);
        }

        @include vp-767 {
            padding: 0 20px 20px 20px;
            margin-bottom: 40px;
            min-height: calc(100vh - 64px);
        }
    }

    &__title {
        font-size: 60px;
        font-weight: 200;
        color: #9d9d9d;
        padding-top: 7%;
        margin: 0 40% 7% 0;

        @include vp-1199 {
            font-size: 40px;
            margin-right: 30%;
        }

        @include vp-767 {
            font-size: 34px;
            font-weight: 300;
            margin: 0 20% 10% 0;
            padding-top: 12%;
        }
    }

    &__description {
        font-size: 22px;
        color: #9d9d9d;
        margin: 0 40% 6% 0;
        line-height: 1.7;

        @include vp-1199 {
            font-size: 18px;
            margin-right: 30%;
        }

        @include vp-767 {
            font-size: 14px;
            margin: 0 30% 12% 0;
        }
    }

    &__link-authorization {
        display: block;
        padding: 30px;
        width: fit-content;
        border: 2px solid $color-base-white;
        border-radius: 50%;
        margin-left: 30%;
        transition: border 0.2s;

        svg {
            fill: $color-base-white;
            transition: fill 0.2s, transform 0.2s;
        }

        &:hover,
        &:focus-visible {
            outline: none;
            border-color: $color-accent;
            transition: border 0.2s;

            svg {
                fill: $color-accent;
                transform: translateX(6px);
                transition: fill 0.2s, transform 0.2s;
            }
        }

        &:active {
            border-color: $color-accent-middle;

            svg {
                fill: $color-accent-middle;
                transform: translateX(6px);
                transition: fill 0.2s, transform 0.2s;
            }
        }

        @include vp-1199 {
            padding: 20px;
        }

        @include vp-767 {
            border-width: 1px;
            padding: 16px;
            margin-left: 20%;
        }
    }

    &__icon-arrow-right {
        width: 36px;
        height: 36px;
        fill: $color-base-white;

        @include vp-1199 {
            width: 30px;
            height: 30px;
        }

        @include vp-767 {
            width: 28px;
            height: 28px;
        }
    }
}

.fitness {
    &__container {
        padding: 0 100px;
        margin-bottom: 80px;

        @include vp-1199 {
            padding: 0 60px;
        }

        @include vp-767 {
            padding: 0 20px;
            margin-bottom: 60px;
        }
    }

    &__title {
        font-size: 120px;
        text-transform: uppercase;
        letter-spacing: 20px;
        font-weight: 100;
        color: #404040;
        margin-bottom: 40px;

        @include vp-1199 {
            font-size: 110px;
            margin-bottom: 30px;
        }

        @include vp-767 {
            font-size: 34px;
            font-weight: 200;
            padding-bottom: 14px;
            position: relative;
            text-align: center;
            width: fit-content;
            margin: 0 auto 30px auto;

            &::after {
                content: "";
                position: absolute;
                width: 50%;
                height: 1px;
                bottom: 0;
                left: 0;
                right: 0;
                margin: 0 auto;
                background-color: $color-gray-lighter;
            }
        }
    }

    &__description {
        margin-left: 12%;
        font-size: 22px;
        line-height: 1.8;

        @include vp-1199 {
            font-size: 18px;
        }

        @include vp-767 {
            margin: 0;
            font-size: 14px;
            background-color: transparent;
            box-shadow: none;
        }
    }
}

.facts {
    &__container {
        padding: 50px 100px 120px 100px;
        background-color: #d2d2d2;

        @include vp-1199 {
            padding: 50px 0 120px 0;
        }

        @include vp-767 {
            padding: 30px 0 80px 0;
        }

    }

    &__title {
        font-weight: 300;
        font-size: 46px;
        text-align: center;
        margin-bottom: 40px;
        padding: 0 100px;

        @include vp-1199 {
            font-size: 36px;
            padding: 0 60px;
        }

        @include vp-767 {
            font-size: 28px;
            padding: 0 20px;
            margin-bottom: 44px;
        }
    }

    &__list {
        display: flex;
        flex-direction: column;
        row-gap: 30px;
    }

    &__item {
        position: relative;
        display: grid;
        grid-template-columns: min-content auto;
        align-items: center;
        column-gap: 70px;
        padding: 20px 0;
        border-bottom: 1px solid #929292;

        @include vp-1199 {
            display: flex;
            flex-direction: column;
            padding-bottom: 40px;
        }

        @include vp-767 {
            justify-content: center;
            border: none;
            padding: 0;
            min-height: 150px;
        }
    }

    &__count {
        font-size: 190px;
        font-weight: 500;
        color: #ff560030;
        min-width: 235px;

        @include vp-767 {
            position: absolute;
            top: 0;
            left: 2%;
            font-size: 150px;
            line-height: 1;
            color: #ff560030;
        }
    }

    &__description {
        font-size: 22px;
        line-height: 1.6;

        @include vp-1199 {
            text-align: center;
            font-size: 18px;
            padding: 0 100px;
        }

        @include vp-767 {
            text-align: left;
            font-size: 12px;
            padding: 0 20px 0 18%;
            display: flex;
            align-items: center;
        }
    }
}
</style>
