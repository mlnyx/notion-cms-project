import { createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router'
import { MainLayout } from '@/components/layout'
import { HomePage, AboutPage, NotFoundPage } from '@/pages'

// 루트 라우트 정의
const rootRoute = createRootRoute({
  component: () => (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
  notFoundComponent: NotFoundPage,
})

// 홈 라우트
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

// About 라우트
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
})

// 라우트 트리 구성
const routeTree = rootRoute.addChildren([indexRoute, aboutRoute])

// 라우터 생성
export const router = createRouter({ routeTree })

// 타입 안전성을 위한 라우터 타입 선언
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
