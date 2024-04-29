import { createRouter, createWebHistory } from "vue-router";

const TheMain = () => import("../components/Layouts/TheMain.vue");
const TheRegistration = () => import("../components/Layouts/TheRegistration.vue");
const TheAuthorization = () => import("../components/Layouts/TheAuthorization.vue");
const AuthorizedUser = () => import("../components/AuthorizedUser/AuthorizedUser.vue");
const UserProfile = () => import("../components/AuthorizedUser/UserProfile.vue");
const CoachProfile = () => import("../components/AuthorizedUser/CoachProfile.vue");
const EditMode = () => import("../components/AuthorizedUser/EditProfile.vue");
const Coaches = () => import("../components/AuthorizedUser/Coaches/CoachesList.vue");
const Coach = () => import("../components/AuthorizedUser/CoachInfo/CoachInfo.vue");

export const router = createRouter({
  history: createWebHistory("/CoachSearch/"),
  routes: [
    {
      path: "/",
      name: "main",
      component: TheMain, // Компонент, который будет отображаться по умолчанию
    },
    {
      path: "/authorized-user",
      name: "authorized-user",
      component: AuthorizedUser,
      children: [
        {
          path: "", // Пустой путь для /authorized-user
          component: TheMain, // Компонент по умолчанию для /authorized-user
        },
        {
          path: "user-profile",
          name: "user-profile",
          component: UserProfile,
        },
        {
          path: "coach-profile",
          name: "coach-profile",
          component: CoachProfile,
        },
        {
          path: "edit-mode",
          name: "edit-mode",
          component: EditMode,
        },
        {
          path: "coaches",
          name: "coaches",
          component: Coaches,
        },
        {
          path: "coach/:coachId",
          name: "coach",
          component: Coach,
        },
        {
          path: "gyms-list",
          name: "gyms-list",
          component: () => import("../components/AuthorizedUser/GymsList.vue"),
        },
      ],
    },

    {
      path: "/authorization",
      name: "authorization",
      component: TheAuthorization,
    },
    {
      path: "/registration",
      name: "registration",
      component: TheRegistration,
    },
  ],
});
