import { useQuery } from '@tanstack/react-query';
import { fetchIdeas, fetchIdeaById } from '@/lib/api';

/** 아이디어 목록 조회 훅 */
export function useIdeas() {
  return useQuery({
    queryKey: ['ideas'],
    queryFn: fetchIdeas,
  });
}

/** 단일 아이디어 조회 훅 */
export function useIdeaById(id: string) {
  return useQuery({
    queryKey: ['ideas', id],
    queryFn: () => fetchIdeaById(id),
    enabled: !!id,
  });
}
