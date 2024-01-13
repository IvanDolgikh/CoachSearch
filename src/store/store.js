import { defineStore } from 'pinia'
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'


export const useBlocksStore = defineStore('blocks', () => {
  const isAuthorizedUser = ref(false)

  function logIn() {
    isAuthorizedUser.value = !isAuthorizedUser.value;
  }

  const router = useRouter()

  router.beforeEach((to, from, next) => {
    if (to.path === '/authorization') {
      // Изменяем переменную в localStorage
      localStorage.setItem('isAuthorizedUser', 'false');
      isAuthorizedUser.value = false; // обновляем переменную в хранилище сразу
    }
    next();
  });
  

  // Локальное хранилище
  const isAuthorizedUserInLocalStorage = localStorage.getItem('isAuthorizedUser')

  if (isAuthorizedUserInLocalStorage) {
    isAuthorizedUser.value = JSON.parse(isAuthorizedUserInLocalStorage)
  }

  watch(() => localStorage.getItem('isAuthorizedUser'), (newVal) => {
    isAuthorizedUser.value = JSON.parse(newVal)
  })

  return { isAuthorizedUser, logIn }
})

