import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { TagBadge } from '@/components/TagBadge';
import type { Idea, IdeaStatus } from '@/types/idea';

const STATUS_COLORS: Record<IdeaStatus, string> = {
  '아이디어': 'bg-gray-100 text-gray-700',
  '검토중': 'bg-yellow-100 text-yellow-700',
  '개발중': 'bg-blue-100 text-blue-700',
  '완료': 'bg-green-100 text-green-700',
  '보류': 'bg-red-100 text-red-700',
};

interface IdeaDetailProps {
  idea: Idea;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="rounded-lg border border-border bg-card p-4 text-sm leading-relaxed whitespace-pre-wrap">
        {children}
      </div>
    </div>
  );
}

export function IdeaDetail({ idea }: IdeaDetailProps) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold sm:text-3xl">{idea.title}</h1>
          {idea.status && (
            <Badge className={`shrink-0 border-transparent ${STATUS_COLORS[idea.status] ?? ''}`}>
              {idea.status}
            </Badge>
          )}
        </div>
        {idea.createdAt && (
          <p className="mt-1 text-sm text-muted-foreground">{idea.createdAt}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {idea.target.map((t) => (
          <TagBadge key={t} type="target" value={t} />
        ))}
        {idea.category.map((c) => (
          <TagBadge key={c} type="category" value={c} />
        ))}
        <TagBadge type="potential" value={idea.businessPotential} />
        <TagBadge type="difficulty" value={idea.technicalDifficulty} />
      </div>

      {idea.problem && <Section title="문제 정의">{idea.problem}</Section>}
      {idea.realCase && <Section title="실제 사례">{idea.realCase}</Section>}
      {idea.aiApproach && <Section title="AI 접근 방식">{idea.aiApproach}</Section>}

      {idea.references && idea.references.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">참고 링크</h2>
          <ul className="space-y-1">
            {idea.references.map((url) => (
              <li key={url}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  {url}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {idea.keywords && idea.keywords.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">키워드</h2>
          <div className="flex flex-wrap gap-1.5">
            {idea.keywords.map((kw) => (
              <Badge key={kw} variant="outline">{kw}</Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
