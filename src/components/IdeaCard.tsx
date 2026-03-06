import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TagBadge } from '@/components/TagBadge';
import type { Idea, IdeaStatus } from '@/types/idea';

/** Status별 색상 맵 */
const STATUS_COLORS: Record<IdeaStatus, string> = {
  '아이디어': 'bg-gray-100 text-gray-700',
  '검토중': 'bg-yellow-100 text-yellow-700',
  '개발중': 'bg-blue-100 text-blue-700',
  '완료': 'bg-green-100 text-green-700',
  '보류': 'bg-red-100 text-red-700',
};

interface IdeaCardProps {
  idea: Idea;
}

export function IdeaCard({ idea }: IdeaCardProps) {
  const { data: voteCount = 0 } = useQuery({
    queryKey: ['votes', idea.id],
    queryFn: async () => {
      const res = await fetch(`/api/votes/${idea.id}`);
      if (!res.ok) return 0;
      const data = await res.json();
      return data.count ?? 0;
    },
  });

  return (
    <Link to="/ideas/$id" params={{ id: idea.id }} className="block">
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg">{idea.title}</CardTitle>
            {idea.status && (
              <Badge className={`shrink-0 border-transparent text-xs ${STATUS_COLORS[idea.status] ?? ''}`}>
                {idea.status}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {idea.problem}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {idea.target.map((t) => (
              <TagBadge key={t} type="target" value={t} />
            ))}
            {idea.category.map((c) => (
              <TagBadge key={c} type="category" value={c} />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              <TagBadge type="potential" value={idea.businessPotential} />
              <TagBadge type="difficulty" value={idea.technicalDifficulty} />
            </div>
            {voteCount > 0 && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Heart className="h-3 w-3 fill-red-400 text-red-400" />
                {voteCount}
              </span>
            )}
          </div>
          {idea.keywords && idea.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {idea.keywords.map((kw) => (
                <Badge key={kw} variant="outline" className="text-xs text-muted-foreground">
                  {kw}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
