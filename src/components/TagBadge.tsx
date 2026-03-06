import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type {
  Target,
  Category,
  BusinessPotential,
  TechnicalDifficulty,
} from '@/types/idea';

/** TagBadge에서 지원하는 태그 타입 */
type TagType = 'target' | 'category' | 'potential' | 'difficulty';

/** 각 타입별 허용되는 값 매핑 */
type TagValueMap = {
  target: Target;
  category: Category;
  potential: BusinessPotential;
  difficulty: TechnicalDifficulty;
};

/** TagBadge 컴포넌트 Props */
interface TagBadgeProps<T extends TagType = TagType> {
  /** 태그 종류 */
  type: T;
  /** 태그 값 */
  value: TagValueMap[T];
  /** 추가 className */
  className?: string;
}

/** 대상 사용자별 색상 매핑 */
const TARGET_COLORS: Record<Target, string> = {
  '의사': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  '환자': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  '스태프': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  '기공사': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  '학생': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
};

/** 카테고리별 색상 매핑 */
const CATEGORY_COLORS: Record<Category, string> = {
  '진단': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  '상담': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  '운영': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  '교육': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  '행정': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
};

/** 사업성 평가별 색상 매핑 */
const POTENTIAL_COLORS: Record<BusinessPotential, string> = {
  '상': 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
  '중': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  '하': 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200',
};

/** 기술 난이도별 색상 매핑 */
const DIFFICULTY_COLORS: Record<TechnicalDifficulty, string> = {
  '상': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  '중': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  '하': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
};

/** 타입별 라벨 접두사 */
const TYPE_LABELS: Record<TagType, string> = {
  target: '대상',
  category: '분야',
  potential: '사업성',
  difficulty: '난이도',
};

/**
 * 태그 타입과 값에 따라 적절한 색상 클래스를 반환합니다
 */
function getColorClass(type: TagType, value: string): string {
  switch (type) {
    case 'target':
      return TARGET_COLORS[value as Target] ?? '';
    case 'category':
      return CATEGORY_COLORS[value as Category] ?? '';
    case 'potential':
      return POTENTIAL_COLORS[value as BusinessPotential] ?? '';
    case 'difficulty':
      return DIFFICULTY_COLORS[value as TechnicalDifficulty] ?? '';
    default:
      return '';
  }
}

/**
 * 태그 타입과 값에 따라 색상이 다르게 적용되는 배지 컴포넌트
 *
 * @example
 * <TagBadge type="target" value="의사" />
 * <TagBadge type="category" value="진단" />
 * <TagBadge type="potential" value="상" />
 * <TagBadge type="difficulty" value="하" />
 */
export function TagBadge<T extends TagType>({
  type,
  value,
  className,
}: TagBadgeProps<T>) {
  const colorClass = getColorClass(type, value);

  /** 사업성/난이도는 라벨 접두사를 표시하여 구분 */
  const showLabel = type === 'potential' || type === 'difficulty';
  const displayText = showLabel
    ? `${TYPE_LABELS[type]} ${value}`
    : value;

  return (
    <Badge
      variant="outline"
      className={cn(
        'border-transparent text-xs sm:text-sm',
        colorClass,
        className,
      )}
    >
      {displayText}
    </Badge>
  );
}
