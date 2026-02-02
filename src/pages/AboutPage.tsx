import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold">소개</h1>
        <div className="mt-6 space-y-4 text-muted-foreground">
          <p>
            이 프로젝트는 React 기반 SPA 개발을 위한 Starter Kit입니다.
            최신 기술 스택을 사용하여 빠르게 프로젝트를 시작할 수 있습니다.
          </p>
          <h2 className="text-xl font-semibold text-foreground">주요 기술 스택</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong>Vite</strong> - 빠른 개발 서버 및 빌드 도구
            </li>
            <li>
              <strong>React 19</strong> - 최신 React 버전
            </li>
            <li>
              <strong>TypeScript</strong> - 타입 안전성
            </li>
            <li>
              <strong>Tailwind CSS</strong> - 유틸리티 우선 CSS 프레임워크
            </li>
            <li>
              <strong>shadcn/ui</strong> - 재사용 가능한 UI 컴포넌트
            </li>
            <li>
              <strong>TanStack Router</strong> - 타입 안전한 라우팅
            </li>
            <li>
              <strong>TanStack Query</strong> - 서버 상태 관리
            </li>
            <li>
              <strong>Zustand</strong> - 클라이언트 상태 관리
            </li>
            <li>
              <strong>React Hook Form + Zod</strong> - 폼 처리 및 유효성 검사
            </li>
          </ul>
        </div>
        <div className="mt-8">
          <Button asChild>
            <Link to="/">홈으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
