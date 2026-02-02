import { Link } from '@tanstack/react-router'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useThemeStore } from '@/stores/useThemeStore'

export function Header() {
  const { theme, setTheme } = useThemeStore()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold">
            React Starter
          </Link>
          <Link
            to="/"
            className="text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground"
          >
            홈
          </Link>
          <Link
            to="/about"
            className="text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground"
          >
            소개
          </Link>
        </nav>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span className="sr-only">테마 변경</span>
        </Button>
      </div>
    </header>
  )
}
