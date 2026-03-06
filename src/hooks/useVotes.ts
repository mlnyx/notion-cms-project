import { useQuery } from '@tanstack/react-query';

/** 전체 아이디어 투표 수 맵 { [ideaId]: count } */
export function useVotes() {
  return useQuery({
    queryKey: ['votes'],
    queryFn: async (): Promise<Record<string, number>> => {
      const res = await fetch('/api/votes');
      if (!res.ok) return {};
      return res.json();
    },
  });
}
