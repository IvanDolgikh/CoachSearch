<template>
    <footer class="main-footer">
        <div class="main-footer__container">
            <router-link class="main-footer__logo-link"
                to="/">
                <img width="60"
                    height="60"
                    src="../../assets/images/svg/icon-logo.svg"
                    alt="Логотп CoachSearch" />
            </router-link>

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
    import IconCopyright from "@icons-svg/icon-copyright.svg";
    import IconEmail from "@icons-svg/icon-email.svg";
</script>

<style lang="scss">
@import "@variables";

.main-footer {
    background-color: #050505;

    &__container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        row-gap: 20px;
        align-items: center;
        max-width: $max-width-ds;
        padding: 30px 100px 14px 100px;
        margin: 0 auto;
        width: 100%;
    }

    &__logo-link {
        align-self: center;
        grid-column: 1;
    }

    &__feedback-link {
        display: flex;
        border: 1px solid $color-gray-lighter;
        border-radius: 6px;
        padding: 5px 15px;
        align-items: center;
        column-gap: 12px;
        grid-column: 2;
        width: fit-content;
        height: fit-content;
        margin-left: auto;

        span {
            display: block;
            color: $color-base-white;
            font-weight: 200;
        }
    }

    &__feedback-icon {
        width: 30px;
        height: 40px;
        fill: $color-base-white;
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
            color: $color-base-white;
            font-weight: 200;
        }
    }

    &__copyright-icon {
        width: 15px;
        height: 15px;
        fill: $color-base-white;
    }
}
</style>
