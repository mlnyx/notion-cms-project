import { useMemo } from 'react';
import { useIdeas } from '@/hooks/useIdeas';
import { StatCard } from '@/components/StatCard';
import { MatrixView } from '@/components/MatrixView';
import { SEOHead } from '@/components/SEOHead';
import type { Idea } from '@/types/idea';

/** 배열에서 각 값의 빈도를 계산합니다 */
function countBy<T extends string>(items: T[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const item of items) {
    map.set(item, (map.get(item) ?? 0) + 1);
  }
  return map;
}

/** CSS 바 차트를 렌더링하는 컴포넌트 */
function BarChart({
  title,
  data,
  maxValue,
}: {
  title: string;
  data: Map<string, number>;
  maxValue: number;
}) {
  const entries = [...data.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="space-y-2">
        {entries.map(([label, count]) => (
          <div key={label} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>{label}</span>
              <span className="text-muted-foreground">{count}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${maxValue > 0 ? (count / maxValue) * 100 : 0}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardPage() {
  const { data: ideas, isLoading, error } = useIdeas();

  const stats = useMemo(() => {
    if (!ideas || ideas.length === 0) return null;

    const targetCounts = countBy(ideas.flatMap((i: Idea) => i.target));
    const categoryCounts = countBy(ideas.flatMap((i: Idea) => i.category));
    const potentialCounts = countBy(ideas.map((i: Idea) => i.businessPotential));
    const difficultyCounts = countBy(ideas.map((i: Idea) => i.technicalDifficulty));

    const maxTarget = Math.max(...targetCounts.values(), 0);
    const maxCategory = Math.max(...categoryCounts.values(), 0);
    const maxPotential = Math.max(...potentialCounts.values(), 0);
    const maxDifficulty = Math.max(...difficultyCounts.values(), 0);

    return {
      total: ideas.length,
      targetCounts,
      categoryCounts,
      potentialCounts,
      difficultyCounts,
      maxTarget,
      maxCategory,
      maxPotential,
      maxDifficulty,
    };
  }, [ideas]);

  return (
    <div className="container mx-auto px-4 py-8">
      <SEOHead
        title="대시보드"
        description="치과 AI 아이디어 통계 및 분포 현황"
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">대시보드</h1>
        <p className="mt-2 text-muted-foreground">
          아이디어 통계 및 분포 현황
        </p>
      </div>

      {isLoading && (
        <p className="text-center text-muted-foreground">불러오는 중...</p>
      )}
      {error && (
        <p className="text-center text-destructive">오류: {error.message}</p>
      )}

      {stats && (
        <div className="space-y-8">
          {/* 주요 수치 */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard title="총 아이디어" value={stats.total} />
            <StatCard
              title="카테고리"
              value={stats.categoryCounts.size}
              description="활성 카테고리 수"
            />
            <StatCard
              title="대상 그룹"
              value={stats.targetCounts.size}
              description="활성 대상 수"
            />
            <StatCard
              title="사업성 높음"
              value={stats.potentialCounts.get('상') ?? 0}
              description="사업성 '상' 아이디어"
            />
          </div>

          {/* 분포 차트 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <BarChart
                title="대상별 분포"
                data={stats.targetCounts}
                maxValue={stats.maxTarget}
              />
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <BarChart
                title="카테고리별 분포"
                data={stats.categoryCounts}
                maxValue={stats.maxCategory}
              />
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <BarChart
                title="사업성 분포"
                data={stats.potentialCounts}
                maxValue={stats.maxPotential}
              />
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <BarChart
                title="난이도 분포"
                data={stats.difficultyCounts}
                maxValue={stats.maxDifficulty}
              />
            </div>
          </div>

          {/* 사업성-난이도 매트릭스 */}
          <div className="rounded-lg border border-border bg-card p-4">
            <MatrixView ideas={ideas!} />
          </div>
        </div>
      )}
    </div>
  );
}
