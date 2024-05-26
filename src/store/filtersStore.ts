import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useFiltersStore = defineStore('filters', () => {

    interface IData {
        coachId: string;
        address: string;
        avatarUrl: string;
        fullName: string;
        isLiked: boolean;
        likesCount: number;
        specializations: string[];
        gender: string;
        age: number;
        workExperience: string;
    }

    // Модалка с фильтрами
    const isOpenModal = ref<boolean>(false)

    // Поиск
    const inputSearchText = ref<string>('')
    const isSearching = ref<boolean>(false)

    // Для selectButton
    type TOptionSpecialization = {
        name: string
    }

    let valueSpecialization = ref<TOptionSpecialization[]>([])

    const optionSpecialization = reactive<TOptionSpecialization[]>([
        { name: 'Йога' },
        { name: 'Табата' },
        { name: 'Велотренировки' },
        { name: 'Pilates' },
        { name: 'Кинезис' },
        { name: 'TRX' },
        { name: 'Танцевальные направления' },
        { name: 'Единоборства' },
        { name: 'Функциональные тренировки' },
        { name: 'Силовые тренировки' },
        { name: 'Растяжка' }
    ])

    // Для radioButton
    const valueGender = ref<string>('')

    // Для sliderAge
    const valueAge = ref<number[]>([18, 80]);

    // Для sliderExperience
    const valueAmountExperience = ref<number[]>([0, 50]);

    // Для best
    const valueBest = ref<string>('')

    const filteredCoaches = ref<IData[]>([])

    return { valueSpecialization,
             optionSpecialization,
             valueGender,
             inputSearchText,
             isSearching,
             valueAge,
             valueAmountExperience,
             valueBest,
             isOpenModal,
             filteredCoaches,
            }
})