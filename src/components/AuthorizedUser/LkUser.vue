<template>
    <div class="user">
        <div class="user__container">

            <div class="user__image-container">
                <img class="user__image" src="../../assets/images/mok/rain.jpg" width="200" height="200" alt="Фото юзера">
                <a class="user__social-link" href="https://vk.com/puska222">
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="38" height="38"><path fill="#1976d2" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"/><path fill="#fff" d="M35.937,18.041c0.046-0.151,0.068-0.291,0.062-0.416C35.984,17.263,35.735,17,35.149,17h-2.618 c-0.661,0-0.966,0.4-1.144,0.801c0,0-1.632,3.359-3.513,5.574c-0.61,0.641-0.92,0.625-1.25,0.625C26.447,24,26,23.786,26,23.199 v-5.185C26,17.32,25.827,17,25.268,17h-4.649C20.212,17,20,17.32,20,17.641c0,0.667,0.898,0.827,1,2.696v3.623 C21,24.84,20.847,25,20.517,25c-0.89,0-2.642-3-3.815-6.932C16.448,17.294,16.194,17,15.533,17h-2.643 C12.127,17,12,17.374,12,17.774c0,0.721,0.6,4.619,3.875,9.101C18.25,30.125,21.379,32,24.149,32c1.678,0,1.85-0.427,1.85-1.094 v-2.972C26,27.133,26.183,27,26.717,27c0.381,0,1.158,0.25,2.658,2c1.73,2.018,2.044,3,3.036,3h2.618 c0.608,0,0.957-0.255,0.971-0.75c0.003-0.126-0.015-0.267-0.056-0.424c-0.194-0.576-1.084-1.984-2.194-3.326 c-0.615-0.743-1.222-1.479-1.501-1.879C32.062,25.36,31.991,25.176,32,25c0.009-0.185,0.105-0.361,0.249-0.607 C32.223,24.393,35.607,19.642,35.937,18.041z"/></svg>
                </a>
                <a class="user__social-link" href="https://t.me/beenfussy">
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="38" height="38"><path fill="#29b6f6" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"/><path fill="#fff" d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z"/><path fill="#b0bec5" d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z"/><path fill="#cfd8dc" d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z"/></svg>
                </a>
            </div>
            
            <div class="user__info-container">
                <p class="user__fio">Долгих Иван Алексеевич</p>
                <p class="user__tel">Тел: <strong>8 944 912 33 44</strong></p>
                <p class="user__email">Эл почта: <strong>sobaka@mail.ru</strong></p>
                <p class="user__about-title">О себе:</p>
                <p class="user__about" >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>

        </div>
    </div>
</template>


<script setup>

</script>


<style lang="scss">
    .user {
        &__container {
            display: flex;
            column-gap: 60px;
            max-width: 1440px;
            padding: 0 80px;
            margin: 7% auto 10% auto;
        }

        &__image-container {
            text-align: center;

            .user__image {
                display: block;
                object-fit: cover;
                border-radius: 50%;
                margin-bottom: 25px;
            }

            .user__social-link {
                display: inline-block;

                &:last-child {
                    margin-left: 15px;
                }
            }
        }

        &__info-container {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            flex: 1;
            row-gap: 10px;

            p {
                color: rgb(216, 216, 216);
            }

            .user__fio {
                font-size: 30px;
                margin-bottom: 14px;
            }

            .user__tel,
            .user__email,
            .user__about-title {
                font-size: 20px;   

                strong {
                    font-weight: 600;
                }
            }

            .user__email {
                margin-bottom: 20px;
            }

            .user__about {
                width: 80%;
                color: rgb(216, 216, 216);
                font-size: 16px;
                border-bottom: 1px solid rgb(216, 216, 216);
                padding-bottom: 10px;
            }
        }
    }
</style>