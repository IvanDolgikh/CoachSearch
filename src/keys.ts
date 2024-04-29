import type { InjectionKey, Ref } from 'vue'

interface IData {
    coachId: string;
    address: string;
    avatarUrl: string;
    fullName: string;
    isLiked: boolean;
    likesCount: number;
    specializations: string[];
  }

export const keysForFilters = Symbol() as InjectionKey<Ref<IData[] | undefined>>
