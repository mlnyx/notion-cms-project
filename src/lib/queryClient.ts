import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 기본 stale time: 5분
      staleTime: 5 * 60 * 1000,
      // 기본 캐시 time: 10분
      gcTime: 10 * 60 * 1000,
      // 실패 시 재시도 횟수
      retry: 1,
      // 창 포커스 시 자동 refetch 비활성화
      refetchOnWindowFocus: false,
    },
  },
})
