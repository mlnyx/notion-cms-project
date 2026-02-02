import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { LoginForm } from '@/components/forms'
import { useAuthStore } from '@/stores/useAuthStore'

export function HomePage() {
  const { isAuthenticated, user, logout } = useAuthStore()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">React Starter Kit</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Vite + React 19 + TypeScript + Tailwind CSS + shadcn/ui
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link to="/about">소개 페이지</Link>
          </Button>
        </div>

        <div className="mt-8 w-full max-w-md">
          {isAuthenticated ? (
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <p className="mb-4 text-lg">
                안녕하세요, <span className="font-semibold">{user?.name}</span>님!
              </p>
              <Button variant="outline" onClick={logout}>
                로그아웃
              </Button>
            </div>
          ) : (
            <LoginForm />
          )}
        </div>

        <div className="mt-8 grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
          <FeatureCard
            title="TanStack Router"
            description="타입 안전한 라우팅 솔루션"
          />
          <FeatureCard
            title="Zustand + TanStack Query"
            description="클라이언트 & 서버 상태 관리"
          />
          <FeatureCard
            title="React Hook Form + Zod"
            description="폼 처리 및 유효성 검사"
          />
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
