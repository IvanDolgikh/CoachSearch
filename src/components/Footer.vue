<template>
<div class="footer">
    <div class="footer__container">
        <a class="footer__logo-link" href="#">
            <img src="../assets/images/svg/logo.svg" width="220" height="60" alt="Логотип Coach Search">
        </a>

        <ul class="footer__list">
            <li><a href="">Москва</a></li>
            <li><a href="">Екатеринбург</a></li>
            <li><a href="">Челябинск</a></li>
            <li><a href="">Воронеж</a></li>
            <li><a href="">Краснодар</a></li>
            <li><a href="">Санкт-Петербург</a></li>
            <li><a href="">Омск</a></li>
            <li><a href="">Тюмень</a></li>
        </ul>

        <div class="footer__description">
            <p>Ты&nbsp;фитнес тренер? Разместись в&nbsp;этом каталоге и&nbsp;получай заявки от&nbsp;клиентов на дистанционное ведение.</p>
            <a href="#">Создать профиль</a>
        </div>
    </div>
</div>
</template>


<script setup>
</script>


<style lang="scss">
    .footer {

        &__container {
            display: flex;
            max-width: 1440px;
            column-gap: 100px;
            padding: 0 100px 30px 100px;
            margin: 0 auto;
            width: 100%;
            justify-content: space-between;
            align-items: flex-end;
        }

        &__logo-link {
            align-self: center;
        }

        &__list {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px 30px;

            a {
                color: #adadad;
                font-size: 18px;
            }
        }

        &__description {
            p {
                width: 390px;
                margin-bottom: 20px;
                color: #adadad;
                font-size: 20px;
            }

            a {
                display: block;
                background-color: transparent;
                border: 2px solid #ececec;
                color: #adadad;
                font-size: 18px;
                border-radius: 8px;
                padding: 10px 15px;
                width: fit-content;
            }
        }
    }
</style>
