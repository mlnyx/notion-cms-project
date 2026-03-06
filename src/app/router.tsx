import { createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { MainLayout } from '@/components/layout';
import { HomePage, NotFoundPage, IdeaDetailPage, DashboardPage } from '@/pages';

/** 홈 페이지 URL 검색 파라미터 타입 */
export interface HomeSearchParams {
  target?: string;
  category?: string;
  potential?: string;
  difficulty?: string;
  q?: string;
  sort?: string;
}

// 루트 라우트 정의
const rootRoute = createRootRoute({
  component: () => (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
  notFoundComponent: NotFoundPage,
});

// 홈 라우트
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
  validateSearch: (search: Record<string, unknown>): HomeSearchParams => ({
    target: typeof search.target === 'string' ? search.target : undefined,
    category: typeof search.category === 'string' ? search.category : undefined,
    potential: typeof search.potential === 'string' ? search.potential : undefined,
    difficulty: typeof search.difficulty === 'string' ? search.difficulty : undefined,
    q: typeof search.q === 'string' ? search.q : undefined,
    sort: typeof search.sort === 'string' ? search.sort : undefined,
  }),
});

// 아이디어 상세 라우트
const ideaDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ideas/$id',
  component: function IdeaDetailWrapper() {
    const { id } = ideaDetailRoute.useParams();
    return <IdeaDetailPage id={id} />;
  },
});

// 대시보드 라우트
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
});

// 라우트 트리 구성
const routeTree = rootRoute.addChildren([indexRoute, ideaDetailRoute, dashboardRoute]);

// 라우터 생성
export const router = createRouter({ routeTree });

// 타입 안전성을 위한 라우터 타입 선언
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
