import {createRouter, createWebHistory } from 'vue-router';

const Main = () => import('../components/Main.vue')
const Registration = () => import('../components/Registration.vue')
const Authorization = () => import('../components/Authorization.vue')
const AuthorizedUser = () => import('../components/AuthorizedUser/AuthorizedUser.vue')

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Main // Компонент, который будет отображаться по умолчанию
        },
        {
            path: '/authorized-user',
            component: AuthorizedUser,
            children: [
                {
                    path: '', // Пустой путь для /authorized-user
                    component: Main // Компонент по умолчанию для /authorized-user
                },
                {
                    path: 'lkuser',
                    name: 'lkuser',
                    component: () => import('../components/AuthorizedUser/LkUser.vue')
                },
                {
                    path: 'lkcoach',
                    name: 'lkcoach',
                    component: () => import('../components/AuthorizedUser/LkCoach.vue')
                },
                {
                    path: 'coaches',
                    name: 'coaches',
                    component: () => import('../components/AuthorizedUser/Coaches/Coaches.vue'),
                },
                {
                    path: 'coach/:trainerId',
                    name: 'coach',
                    component: () => import('../components/AuthorizedUser/CoachInfo/CoachInfo.vue'),
                },
                {
                    path: 'gyms',
                    name: 'gyms',
                    component: () => import('../components/AuthorizedUser/Gyms.vue')
                },
            ]
        },
        
        {
            path: '/authorization',
            component: Authorization
        },
        {
          path: '/registration',
          component: Registration
        },
    ]
})