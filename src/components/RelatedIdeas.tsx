import { useMemo } from 'react';
import { IdeaCard } from '@/components/IdeaCard';
import type { Idea } from '@/types/idea';

interface RelatedIdeasProps {
  currentIdea: Idea;
  allIdeas: Idea[];
}

/** 관련 아이디어 추천 (동일 카테고리/대상 태그 기반, 최대 3개) */
export function RelatedIdeas({ currentIdea, allIdeas }: RelatedIdeasProps) {
  const relatedIdeas = useMemo(() => {
    const scored = allIdeas
      .filter((idea) => idea.id !== currentIdea.id)
      .map((idea) => {
        let score = 0;
        // 공유 카테고리 수
        for (const cat of idea.category) {
          if (currentIdea.category.includes(cat)) score += 1;
        }
        // 공유 대상 수
        for (const tgt of idea.target) {
          if (currentIdea.target.includes(tgt)) score += 1;
        }
        return { idea, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    return scored.map(({ idea }) => idea);
  }, [currentIdea, allIdeas]);

  if (relatedIdeas.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">관련 아이디어</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {relatedIdeas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>
    </div>
  );
}
