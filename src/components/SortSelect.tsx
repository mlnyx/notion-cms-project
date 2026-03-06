import { ArrowUpDown } from 'lucide-react';
import { useFilterStore, type SortOption } from '@/stores/useFilterStore';

/** 정렬 옵션 목록 */
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'latest', label: '최신순' },
  { value: 'potential-desc', label: '사업성 높은순' },
  { value: 'difficulty-asc', label: '난이도 낮은순' },
];

/** 정렬 선택 컴포넌트 */
export function SortSelect() {
  const { sortBy, setSortBy } = useFilterStore();

  return (
    <div className="relative flex items-center">
      <ArrowUpDown className="absolute left-3 h-4 w-4 text-muted-foreground" />
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as SortOption)}
        className="h-9 w-full appearance-none rounded-md border border-input bg-background pl-9 pr-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
