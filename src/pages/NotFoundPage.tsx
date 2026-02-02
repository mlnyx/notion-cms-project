import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-xl text-muted-foreground">페이지를 찾을 수 없습니다</p>
      <Button asChild className="mt-8">
        <Link to="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  )
}
