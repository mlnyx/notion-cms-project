import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoteButtonProps {
  ideaId: string;
}

async function fetchVoteCount(id: string): Promise<number> {
  const res = await fetch(`/api/votes/${id}`);
  if (!res.ok) return 0;
  const data = await res.json();
  return data.count ?? 0;
}

async function postVote(id: string): Promise<number> {
  const res = await fetch(`/api/votes/${id}`, { method: 'POST' });
  if (!res.ok) throw new Error('투표 실패');
  const data = await res.json();
  return data.count ?? 0;
}

function hasVoted(id: string): boolean {
  try {
    return localStorage.getItem(`voted:${id}`) === '1';
  } catch {
    return false;
  }
}

function markVoted(id: string): void {
  try {
    localStorage.setItem(`voted:${id}`, '1');
  } catch {
    // localStorage 사용 불가 시 무시
  }
}

export function VoteButton({ ideaId }: VoteButtonProps) {
  const [voted, setVoted] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setVoted(hasVoted(ideaId));
  }, [ideaId]);

  const { data: count = 0 } = useQuery({
    queryKey: ['votes', ideaId],
    queryFn: () => fetchVoteCount(ideaId),
  });

  const mutation = useMutation({
    mutationFn: () => postVote(ideaId),
    onSuccess: (newCount) => {
      queryClient.setQueryData(['votes', ideaId], newCount);
      markVoted(ideaId);
      setVoted(true);
    },
  });

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-1.5"
      disabled={voted || mutation.isPending}
      onClick={() => mutation.mutate()}
    >
      <Heart
        className={`h-4 w-4 ${voted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
      />
      <span className="text-sm">{count}</span>
    </Button>
  );
}
