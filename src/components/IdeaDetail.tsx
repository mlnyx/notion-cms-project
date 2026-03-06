import { TagBadge } from '@/components/TagBadge';
import type { Idea } from '@/types/idea';

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
        <h1 className="text-2xl font-bold sm:text-3xl">{idea.title}</h1>
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
    </div>
  );
}
