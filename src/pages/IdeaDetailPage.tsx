import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IdeaDetail } from '@/components/IdeaDetail';
import { RelatedIdeas } from '@/components/RelatedIdeas';
import { SEOHead } from '@/components/SEOHead';
import { ShareButton } from '@/components/ShareButton';
import { VoteButton } from '@/components/VoteButton';
import { GiscusComments } from '@/components/GiscusComments';
import { useIdeaById, useIdeas } from '@/hooks/useIdeas';

interface IdeaDetailPageProps {
  id: string;
}

export function IdeaDetailPage({ id }: IdeaDetailPageProps) {
  const { data: idea, isLoading, error } = useIdeaById(id);
  const { data: allIdeas } = useIdeas();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      {idea && (
        <SEOHead
          title={idea.title}
          description={idea.problem}
        />
      )}

      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/">
            <ArrowLeft className="mr-1 h-4 w-4" />
            목록으로
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          {idea && <VoteButton ideaId={idea.id} />}
          {idea && (
            <ShareButton
              title={idea.title}
              text={idea.problem}
            />
          )}
        </div>
      </div>

      {isLoading && <p className="text-muted-foreground">불러오는 중...</p>}
      {error && <p className="text-destructive">오류: {error.message}</p>}
      {idea && <IdeaDetail idea={idea} />}

      {idea && allIdeas && (
        <div className="mt-10 border-t border-border pt-8">
          <RelatedIdeas currentIdea={idea} allIdeas={allIdeas} />
        </div>
      )}

      {idea && (
        <div className="mt-10 border-t border-border pt-8">
          <h2 className="mb-4 text-lg font-semibold">댓글</h2>
          <GiscusComments
            repo="mlnyx/notion-cms-project"
            repoId="R_kgDORGiy6w"
            category="General"
            categoryId="DIC_kwDORGiy684C30yY"
          />
        </div>
      )}
    </div>
  );
}
