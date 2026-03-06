import { Link } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TagBadge } from '@/components/TagBadge';
import type { Idea } from '@/types/idea';

interface IdeaCardProps {
  idea: Idea;
}

export function IdeaCard({ idea }: IdeaCardProps) {
  return (
    <Link to="/ideas/$id" params={{ id: idea.id }} className="block">
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">{idea.title}</CardTitle>
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
          <div className="flex gap-1.5">
            <TagBadge type="potential" value={idea.businessPotential} />
            <TagBadge type="difficulty" value={idea.technicalDifficulty} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
