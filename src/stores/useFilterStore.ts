import { create } from 'zustand';
import type {
  Target,
  Category,
  BusinessPotential,
  TechnicalDifficulty,
  IdeaStatus,
} from '@/types/idea';

/** 정렬 옵션 */
export type SortOption = 'latest' | 'potential-desc' | 'difficulty-asc' | 'popular';

/** 필터 스토어 상태 */
interface FilterState {
  selectedTargets: Target[];
  selectedCategories: Category[];
  selectedPotentials: BusinessPotential[];
  selectedDifficulties: TechnicalDifficulty[];
  selectedStatuses: IdeaStatus[];
  selectedKeywords: string[];
  searchQuery: string;
  sortBy: SortOption;
}

/** 필터 스토어 액션 */
interface FilterActions {
  toggleTarget: (value: Target) => void;
  toggleCategory: (value: Category) => void;
  togglePotential: (value: BusinessPotential) => void;
  toggleDifficulty: (value: TechnicalDifficulty) => void;
  toggleStatus: (value: IdeaStatus) => void;
  toggleKeyword: (value: string) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: SortOption) => void;
  resetFilters: () => void;
  /** URL에서 복원 시 일괄 설정 */
  setFilters: (state: Partial<FilterState>) => void;
  /** 활성화된 필터 총 개수 */
  getActiveFilterCount: () => number;
}

const initialState: FilterState = {
  selectedTargets: [],
  selectedCategories: [],
  selectedPotentials: [],
  selectedDifficulties: [],
  selectedStatuses: [],
  selectedKeywords: [],
  searchQuery: '',
  sortBy: 'latest',
};

/** 배열에서 값 토글 (있으면 제거, 없으면 추가) */
function toggleArray<T>(arr: T[], value: T): T[] {
  return arr.includes(value)
    ? arr.filter((v) => v !== value)
    : [...arr, value];
}

export const useFilterStore = create<FilterState & FilterActions>((set, get) => ({
  ...initialState,

  toggleTarget: (value) =>
    set((s) => ({ selectedTargets: toggleArray(s.selectedTargets, value) })),

  toggleCategory: (value) =>
    set((s) => ({ selectedCategories: toggleArray(s.selectedCategories, value) })),

  togglePotential: (value) =>
    set((s) => ({ selectedPotentials: toggleArray(s.selectedPotentials, value) })),

  toggleDifficulty: (value) =>
    set((s) => ({ selectedDifficulties: toggleArray(s.selectedDifficulties, value) })),

  toggleStatus: (value) =>
    set((s) => ({ selectedStatuses: toggleArray(s.selectedStatuses, value) })),

  toggleKeyword: (value) =>
    set((s) => ({ selectedKeywords: toggleArray(s.selectedKeywords, value) })),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setSortBy: (sort) => set({ sortBy: sort }),

  resetFilters: () => set(initialState),

  setFilters: (state) => set(state),

  getActiveFilterCount: () => {
    const s = get();
    return (
      s.selectedTargets.length +
      s.selectedCategories.length +
      s.selectedPotentials.length +
      s.selectedDifficulties.length +
      s.selectedStatuses.length +
      s.selectedKeywords.length
    );
  },
}));
