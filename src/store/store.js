import { defineStore } from 'pinia'
import { ref, reactive, watch } from 'vue'


export const useBlocksStore = defineStore('blocks', () => {
  const isAuthorizedUser = ref(false)

  function logIn() {
    isAuthorizedUser.value = !isAuthorizedUser.value;
  }

  // Локальное хранилище
  
  const isAuthorizedUserInLocalStorage = localStorage.getItem('isAuthorizedUser')

  if (isAuthorizedUserInLocalStorage) {
    isAuthorizedUser.value = JSON.parse(isAuthorizedUserInLocalStorage)
  }

  watch(isAuthorizedUser, (newVal) => {
    localStorage.setItem('isAuthorizedUser', JSON.stringify(newVal))
  })

  return { isAuthorizedUser, logIn}
})

