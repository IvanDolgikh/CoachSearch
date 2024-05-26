<template>
    <footer class="main-footer">
        <div class="main-footer__container">

            <Logo class="main-footer__logo-link" />

            <a class="main-footer__feedback-link"
                href="mailto:dolgikh2302@mail.ru">
                <IconEmail class="main-footer__feedback-icon" />
                <span>Обратная связь</span>
            </a>

            <div class="main-footer__copyright">
                <IconCopyright class="main-footer__copyright-icon" />
                <span>CoachSearch 2024</span>
            </div>
        </div>
    </footer>
</template>

<script setup
    lang="ts">

    import Logo from "../Common/Logo.vue";

    import IconCopyright from "@icons-svg/icon-copyright.svg";
    import IconEmail from "@icons-svg/icon-email.svg";
</script>

<style lang="scss"
    scoped>

    .main-footer {
        background-color: $color-dark;

        &__container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            row-gap: 20px;
            align-items: center;
            max-width: $max-width-ds;
            padding: 30px 100px 14px 100px;
            margin: 0 auto;
            width: 100%;

            @include vp-1199 {
                padding: 30px 60px 14px 60px;
            }

            @include vp-767 {
                padding: 20px 20px 10px 20px;
            }
        }

        &__logo-link {
            align-self: center;
            grid-column: 1;
        }

        &__feedback-link {
            display: flex;
            border: 1px solid $color-gray-lighter;
            border-radius: 6px;
            padding: 4px 14px;
            align-items: center;
            column-gap: 12px;
            grid-column: 2;
            width: fit-content;
            height: fit-content;
            margin-left: auto;
            transition: border 0.2s;
            font-size: 16px;
            color: $color-base-white;
            font-weight: 200;

            @include vp-1199 {
                font-size: 14px;
                padding: 0 10px;
            }

            @include vp-767 {
                font-size: 10px;
                padding: 0 8px;
            }

            &:hover,
            &:focus-visible {
                outline: none;
                border-color: $color-accent;
                transition: border 0.2s;

                .main-footer__feedback-icon {
                    fill: $color-accent;
                    transition: fill 0.2s;
                }
            }

            &:active {
                border-color: $color-accent-middle;

                .main-footer__feedback-icon {
                    fill: $color-accent-middle;
                }
            }
        }

        &__feedback-icon {
            width: 30px;
            height: 40px;
            fill: $color-base-white;
            transition: fill 0.2s;

            @include vp-1199 {
                width: 24px;
                height: 34px;
            }

            @include vp-767 {
                width: 20px;
                height: 30px;
            }
        }

        &__copyright {
            display: flex;
            align-items: center;
            column-gap: 8px;
            width: fit-content;
            margin: 0 auto;
            grid-row: 2;
            grid-column: 1 / 3;

            span {
                display: block;
                font-size: 16px;
                color: $color-base-white;
                font-weight: 200;

                @include vp-1199 {
                    font-size: 14px;
                }

                @include vp-767 {
                    font-size: 10px;
                }
            }
        }

        &__copyright-icon {
            width: 14px;
            height: 14px;
            fill: $color-base-white;

            @include vp-1199 {
                width: 12px;
                height: 12px;
            }

            @include vp-767 {
                width: 10px;
                height: 10px;
            }
        }
    }
</style>
