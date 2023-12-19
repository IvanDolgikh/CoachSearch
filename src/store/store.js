import { defineStore } from 'pinia'
import { ref, reactive, watch } from 'vue'


export const useBlocksStore = defineStore('blocks', () => {
  const isAuthorizedUser = ref(false)

  function logIn() {
    isAuthorizedUser.value = !isAuthorizedUser.value;
  }

  const users = reactive(
    [
      {
        id: 1,
        login: 'user1',
        password: 'user1',
        isCoach: false,
      },

      {
        id: 2,
        login: 'user2',
        password: 'user2',
        isCoach: false,
      },

    ]
  )

  const coaches = reactive(
    [
      {
        id: 1,
        login: 'coach1',
        password: 'coach1',
        isCoach: true,
      },

      {
        id: 2,
        login: 'coach2',
        password: 'coach2',
        isCoach: true,
      },

    ]
  )
  
  // Локальное хранилище
  
  // const isAuthorizedUserInLocalStorage = localStorage.getItem('isAuthorizedUser')

  // if (isAuthorizedUserInLocalStorage) {
  //   isAuthorizedUser.value = JSON.parse(isAuthorizedUserInLocalStorage)
  // }

  // watch(isAuthorizedUser, (newVal) => {
  //   localStorage.setItem('isAuthorizedUser', JSON.stringify(newVal))
  // })

  return { isAuthorizedUser, logIn, users, coaches }
})

