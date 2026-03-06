import { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFilterStore } from '@/stores/useFilterStore';
import type {
  Target,
  Category,
  BusinessPotential,
  TechnicalDifficulty,
  IdeaStatus,
} from '@/types/idea';

/** 모든 대상 옵션 */
const ALL_TARGETS: Target[] = ['의사', '환자', '스태프', '기공사', '학생'];

/** 모든 카테고리 옵션 */
const ALL_CATEGORIES: Category[] = ['진단', '상담', '운영', '교육', '행정'];

/** 모든 사업성 옵션 */
const ALL_POTENTIALS: BusinessPotential[] = ['상', '중', '하'];

/** 모든 난이도 옵션 */
const ALL_DIFFICULTIES: TechnicalDifficulty[] = ['상', '중', '하'];

/** 모든 상태 옵션 */
const ALL_STATUSES: IdeaStatus[] = ['아이디어', '검토중', '개발중', '완료', '보류'];

/** 필터 그룹 컴포넌트 */
function FilterGroup<T extends string>({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: T[];
  selected: T[];
  onToggle: (value: T) => void;
}) {
  return (
    <div className="space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => {
          const isActive = selected.includes(option);
          return (
            <Badge
              key={option}
              variant={isActive ? 'default' : 'outline'}
              className="cursor-pointer select-none transition-colors"
              onClick={() => onToggle(option)}
            >
              {option}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}

export function FilterPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    selectedTargets,
    selectedCategories,
    selectedPotentials,
    selectedDifficulties,
    selectedStatuses,
    toggleTarget,
    toggleCategory,
    togglePotential,
    toggleDifficulty,
    toggleStatus,
    resetFilters,
    getActiveFilterCount,
  } = useFilterStore();

  const activeCount = getActiveFilterCount();

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      {/* 모바일 토글 헤더 */}
      <div className="flex items-center justify-between sm:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 text-sm font-medium"
        >
          필터
          {activeCount > 0 && (
            <Badge variant="secondary" className="ml-1 text-xs">
              {activeCount}
            </Badge>
          )}
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <X className="mr-1 h-3 w-3" />
            초기화
          </Button>
        )}
      </div>

      {/* 데스크톱 헤더 */}
      <div className="mb-3 hidden items-center justify-between sm:flex">
        <span className="text-sm font-medium">
          필터
          {activeCount > 0 && (
            <Badge variant="secondary" className="ml-2 text-xs">
              {activeCount}
            </Badge>
          )}
        </span>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <X className="mr-1 h-3 w-3" />
            초기화
          </Button>
        )}
      </div>

      {/* 필터 그룹 (모바일: 토글, 데스크톱: 항상 표시) */}
      <div className={`space-y-3 ${isOpen ? 'mt-3' : 'hidden sm:block'}`}>
        <FilterGroup
          label="대상"
          options={ALL_TARGETS}
          selected={selectedTargets}
          onToggle={toggleTarget}
        />
        <FilterGroup
          label="영역"
          options={ALL_CATEGORIES}
          selected={selectedCategories}
          onToggle={toggleCategory}
        />
        <FilterGroup
          label="사업성"
          options={ALL_POTENTIALS}
          selected={selectedPotentials}
          onToggle={togglePotential}
        />
        <FilterGroup
          label="난이도"
          options={ALL_DIFFICULTIES}
          selected={selectedDifficulties}
          onToggle={toggleDifficulty}
        />
        <FilterGroup
          label="상태"
          options={ALL_STATUSES}
          selected={selectedStatuses}
          onToggle={toggleStatus}
        />
      </div>
    </div>
  );
}
