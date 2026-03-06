import { useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import type { Idea, BusinessPotential, TechnicalDifficulty } from '@/types/idea';

interface MatrixViewProps {
  ideas: Idea[];
}

const POTENTIALS: BusinessPotential[] = ['상', '중', '하'];
const DIFFICULTIES: TechnicalDifficulty[] = ['상', '중', '하'];

/** 사업성-난이도 매트릭스 뷰 (3x3 그리드) */
export function MatrixView({ ideas }: MatrixViewProps) {
  const matrix = useMemo(() => {
    const counts = new Map<string, number>();
    let max = 0;

    for (const idea of ideas) {
      const key = `${idea.businessPotential}-${idea.technicalDifficulty}`;
      const count = (counts.get(key) ?? 0) + 1;
      counts.set(key, count);
      if (count > max) max = count;
    }

    return { counts, max };
  }, [ideas]);

  /** 셀 개수에 따른 배경 투명도 */
  function getCellOpacity(count: number): string {
    if (count === 0) return 'bg-muted/30';
    const ratio = matrix.max > 0 ? count / matrix.max : 0;
    if (ratio > 0.66) return 'bg-primary/30';
    if (ratio > 0.33) return 'bg-primary/20';
    return 'bg-primary/10';
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">사업성-난이도 매트릭스</h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 text-xs text-muted-foreground" />
              {POTENTIALS.map((p) => (
                <th key={p} className="p-2 text-center text-xs font-medium">
                  사업성 {p}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DIFFICULTIES.map((d) => (
              <tr key={d}>
                <td className="p-2 text-right text-xs font-medium">
                  난이도 {d}
                </td>
                {POTENTIALS.map((p) => {
                  const key = `${p}-${d}`;
                  const count = matrix.counts.get(key) ?? 0;

                  return (
                    <td key={key} className="p-1">
                      <Link
                        to="/"
                        search={{ potential: p, difficulty: d }}
                        className={`flex h-16 items-center justify-center rounded-md border border-border text-sm font-semibold transition-colors hover:ring-2 hover:ring-ring ${getCellOpacity(count)}`}
                      >
                        {count}
                      </Link>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground">
        셀을 클릭하면 해당 조건의 아이디어 목록으로 이동합니다
      </p>
    </div>
  );
}
