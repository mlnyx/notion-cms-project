import { useMemo, useEffect, useRef } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useIdeas } from '@/hooks/useIdeas';
import { IdeaCard } from '@/components/IdeaCard';
import { FilterPanel } from '@/components/FilterPanel';
import { SearchBar } from '@/components/SearchBar';
import { SortSelect } from '@/components/SortSelect';
import { SEOHead } from '@/components/SEOHead';
import { useFilterStore, type SortOption } from '@/stores/useFilterStore';
import type {
  Idea,
  Target,
  Category,
  BusinessPotential,
  TechnicalDifficulty,
} from '@/types/idea';

/** 사업성/난이도 값을 숫자로 변환 */
const LEVEL_MAP: Record<BusinessPotential | TechnicalDifficulty, number> = {
  '상': 3,
  '중': 2,
  '하': 1,
};

/** 콤마 구분 문자열을 배열로 변환 */
function splitParam<T extends string>(value: string | undefined): T[] {
  if (!value) return [];
  return value.split(',').filter(Boolean) as T[];
}

/** 배열을 콤마 구분 문자열로 변환 (빈 배열이면 undefined) */
function joinParam(arr: string[]): string | undefined {
  return arr.length > 0 ? arr.join(',') : undefined;
}

const VALID_SORTS: SortOption[] = ['latest', 'potential-desc', 'difficulty-asc'];

export function HomePage() {
  const { data: ideas, isLoading, error } = useIdeas();
  const navigate = useNavigate({ from: '/' });
  const search = useSearch({ from: '/' });
  const isInitialized = useRef(false);

  const {
    selectedTargets,
    selectedCategories,
    selectedPotentials,
    selectedDifficulties,
    searchQuery,
    sortBy,
    setFilters,
  } = useFilterStore();

  // URL -> 스토어 초기 동기화 (마운트 시 1회)
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const hasParams = search.target || search.category || search.potential || search.difficulty || search.q || search.sort;
    if (!hasParams) return;

    setFilters({
      selectedTargets: splitParam<Target>(search.target),
      selectedCategories: splitParam<Category>(search.category),
      selectedPotentials: splitParam<BusinessPotential>(search.potential),
      selectedDifficulties: splitParam<TechnicalDifficulty>(search.difficulty),
      searchQuery: search.q ?? '',
      sortBy: VALID_SORTS.includes(search.sort as SortOption)
        ? (search.sort as SortOption)
        : 'latest',
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 스토어 -> URL 동기화
  useEffect(() => {
    if (!isInitialized.current) return;

    navigate({
      search: {
        target: joinParam(selectedTargets),
        category: joinParam(selectedCategories),
        potential: joinParam(selectedPotentials),
        difficulty: joinParam(selectedDifficulties),
        q: searchQuery || undefined,
        sort: sortBy !== 'latest' ? sortBy : undefined,
      },
      replace: true,
    });
  }, [selectedTargets, selectedCategories, selectedPotentials, selectedDifficulties, searchQuery, sortBy, navigate]);

  /** 필터링 + 검색 + 정렬 적용 */
  const filteredIdeas = useMemo(() => {
    if (!ideas) return [];

    let result = ideas.filter((idea: Idea) => {
      // 대상 필터
      if (selectedTargets.length > 0 && !idea.target.some((t) => selectedTargets.includes(t))) {
        return false;
      }
      // 영역 필터
      if (selectedCategories.length > 0 && !idea.category.some((c) => selectedCategories.includes(c))) {
        return false;
      }
      // 사업성 필터
      if (selectedPotentials.length > 0 && !selectedPotentials.includes(idea.businessPotential)) {
        return false;
      }
      // 난이도 필터
      if (selectedDifficulties.length > 0 && !selectedDifficulties.includes(idea.technicalDifficulty)) {
        return false;
      }
      // 검색어 필터
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchTitle = idea.title.toLowerCase().includes(query);
        const matchProblem = idea.problem.toLowerCase().includes(query);
        if (!matchTitle && !matchProblem) return false;
      }
      return true;
    });

    // 정렬
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'potential-desc':
          return LEVEL_MAP[b.businessPotential] - LEVEL_MAP[a.businessPotential];
        case 'difficulty-asc':
          return LEVEL_MAP[a.technicalDifficulty] - LEVEL_MAP[b.technicalDifficulty];
        case 'latest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return result;
  }, [ideas, selectedTargets, selectedCategories, selectedPotentials, selectedDifficulties, searchQuery, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      <SEOHead
        title="홈"
        description="치과 현장의 문제를 AI로 해결하는 아이디어 모음"
      />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          치과 AI 아이디어 로그북
        </h1>
        <p className="mt-2 text-muted-foreground">
          치과 현장의 문제를 AI로 해결하는 아이디어 모음
        </p>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <SearchBar />
          </div>
          <div className="w-full sm:w-48">
            <SortSelect />
          </div>
        </div>
        <FilterPanel />
      </div>

      {isLoading && (
        <p className="text-center text-muted-foreground">불러오는 중...</p>
      )}
      {error && (
        <p className="text-center text-destructive">오류: {error.message}</p>
      )}
      {!isLoading && !error && filteredIdeas.length === 0 && (
        <p className="text-center text-muted-foreground">
          {ideas && ideas.length > 0
            ? '조건에 맞는 아이디어가 없습니다'
            : '등록된 아이디어가 없습니다'}
        </p>
      )}
      {filteredIdeas.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      )}
    </div>
  );
}
