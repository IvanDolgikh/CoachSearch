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
    let valueGender = ref<string>('')

    // Для sliderAge
    const valueAge = ref<number[]>([18, 80]);

    // Для sliderExperience
    const valueAmountExperience = ref<number[]>([0, 50]);

    // Для best
    const valueBest = ref<string>('')

    const filteredCoaches = ref<IData[]>()

    // Фильтрация для специализации
    // const filterSpecializations = (data: IData[] | undefined) => {
    //     const listSpecializations: string[] = valueSpecialization.value.map(item => item.name)
    //     console.log(data)
    //     if(listSpecializations.length === 0) {
    //         return data
    //     }
    //     else if (data) {
    //         // return listSpecializations.includes(item.specializations)
    //         return data.filter(item => item.specializations.some(spec => listSpecializations.includes(spec)))
    //     }
    // }

    // const acceptFilters = (data: IData[] | undefined) => {
    //     filterSpecializations(data)
    //     console.log(data)
    //     isOpenModal.value = !isOpenModal.value
    // }

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
            //  acceptFilters,
            //  filterSpecializations 
            }
})