# Development Guidelines

## 프로젝트 개요

- **프로젝트명**: 치과 AI 아이디어 로그북
- **목적**: Notion을 CMS로 활용한 치과 AI 아이디어 공개 저장소

### 실제 기술 스택

| 구분 | 기술 |
|------|------|
| 빌드 도구 | Vite 7 |
| 프레임워크 | React 19 |
| 언어 | TypeScript 5.9 |
| 라우팅 | TanStack React Router |
| 서버 상태 | TanStack React Query |
| 클라이언트 상태 | Zustand |
| 폼 처리 | React Hook Form + Zod |
| 스타일링 | Tailwind CSS 4 + shadcn/ui |
| 아이콘 | Lucide React |

> **주의**: PRD.md에는 Next.js 15로 명시되어 있으나, 실제 구현은 Vite + React SPA 구조임

---

## 프로젝트 아키텍처

### 디렉토리 구조

```
src/
├── app/                 # 앱 진입점 및 라우터 설정
│   ├── App.tsx          # 앱 루트 컴포넌트
│   ├── main.tsx         # 엔트리 포인트
│   └── router.tsx       # TanStack Router 설정
├── pages/               # 페이지 컴포넌트
│   ├── index.ts         # 페이지 배럴 익스포트
│   └── [PageName]Page.tsx
├── components/
│   ├── ui/              # shadcn/ui 기본 컴포넌트 (수정 금지)
│   ├── layout/          # 레이아웃 컴포넌트
│   │   ├── index.ts     # 배럴 익스포트
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MainLayout.tsx
│   └── forms/           # 폼 컴포넌트
│       └── index.ts
├── stores/              # Zustand 스토어
│   └── use[Name]Store.ts
├── schemas/             # Zod 유효성 검사 스키마
│   └── [domain].ts
├── types/               # TypeScript 타입 정의
│   └── index.ts
└── lib/                 # 유틸리티 및 설정
    ├── utils.ts         # cn() 등 공통 유틸
    └── queryClient.ts   # React Query 클라이언트
```

### 파일 배치 규칙

| 파일 유형 | 위치 | 명명 규칙 |
|----------|------|----------|
| 페이지 컴포넌트 | `src/pages/` | `[Name]Page.tsx` |
| 레이아웃 컴포넌트 | `src/components/layout/` | `[Name].tsx` |
| 폼 컴포넌트 | `src/components/forms/` | `[Name]Form.tsx` |
| 공통 UI 컴포넌트 | `src/components/` | `[Name].tsx` |
| shadcn/ui 컴포넌트 | `src/components/ui/` | 소문자 `[name].tsx` |
| Zustand 스토어 | `src/stores/` | `use[Name]Store.ts` |
| Zod 스키마 | `src/schemas/` | `[domain].ts` |
| 타입 정의 | `src/types/` | `index.ts` 또는 `[domain].ts` |

---

## 코드 표준

### TypeScript 규칙

- **`any` 타입 사용 절대 금지** - 명시적 타입 정의 필수
- 인터페이스는 `I` 접두사 없이 PascalCase 사용
- Props 타입은 컴포넌트 파일 내에서 정의
- 공유 타입은 `src/types/`에 정의

```typescript
// 올바른 예시
interface CardProps {
  title: string;
  onClick: () => void;
}

// 잘못된 예시
interface ICardProps { ... }  // I 접두사 금지
const data: any = ...         // any 금지
```

### 네이밍 컨벤션

| 대상 | 규칙 | 예시 |
|------|------|------|
| 변수/함수 | camelCase | `fetchIdeas`, `ideaList` |
| 컴포넌트 | PascalCase | `IdeaCard`, `MainLayout` |
| 스토어 훅 | use + PascalCase + Store | `useAuthStore` |
| 상수 | UPPER_SNAKE_CASE | `API_ENDPOINT` |
| 타입/인터페이스 | PascalCase | `User`, `ApiResponse` |
| 파일명 (컴포넌트) | PascalCase | `IdeaCard.tsx` |
| 파일명 (유틸) | camelCase | `queryClient.ts` |

### 포맷팅

- 들여쓰기: 2칸 스페이스
- 세미콜론: 사용하지 않음 (Prettier 설정 따름)
- 따옴표: 작은따옴표 (`'`)
- 주석: 한국어로 작성

---

## 기능 구현 표준

### 새 라우트 추가

`src/app/router.tsx` 수정:

```typescript
// 1. 페이지 import 추가
import { NewPage } from '@/pages'

// 2. 라우트 정의
const newRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/new-path',
  component: NewPage,
})

// 3. routeTree에 추가
const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  newRoute,  // 추가
])
```

동시 수정 필요 파일:
- `src/pages/NewPage.tsx` - 페이지 컴포넌트 생성
- `src/pages/index.ts` - 배럴 익스포트 추가

### 컴포넌트 작성 패턴

```typescript
import type { ReactNode } from 'react'

interface ComponentNameProps {
  children?: ReactNode
  // props 정의
}

export function ComponentName({ children }: ComponentNameProps) {
  return (
    <div className="...">
      {children}
    </div>
  )
}
```

**규칙**:
- 함수 선언식 사용 (`export function`)
- Props 인터페이스는 컴포넌트 바로 위에 정의
- `type` import 사용 (`import type { ... }`)

### Zustand 스토어 패턴

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
  // 상태 타입
  data: Data | null
  // 액션 타입
  setData: (data: Data) => void
  reset: () => void
}

export const useDataStore = create<StoreState>()(
  persist(
    (set) => ({
      data: null,
      setData: (data) => set({ data }),
      reset: () => set({ data: null }),
    }),
    { name: 'data-storage' }
  )
)
```

**규칙**:
- 영속성 필요 시 `persist` 미들웨어 사용
- 스토어명은 `use[Name]Store` 형식

### 폼 처리 패턴

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// 1. 스키마 정의 (src/schemas/에 분리 권장)
const formSchema = z.object({
  email: z.string().email('유효한 이메일을 입력하세요'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
})

type FormData = z.infer<typeof formSchema>

// 2. 폼 훅 사용
const form = useForm<FormData>({
  resolver: zodResolver(formSchema),
  defaultValues: { email: '', password: '' },
})
```

### API 호출 패턴 (React Query)

```typescript
import { useQuery, useMutation } from '@tanstack/react-query'

// 조회
const { data, isLoading, error } = useQuery({
  queryKey: ['ideas'],
  queryFn: fetchIdeas,
})

// 변경
const mutation = useMutation({
  mutationFn: createIdea,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['ideas'] })
  },
})
```

---

## 주요 파일 상호작용 규칙

### 새 페이지 추가 시

| 순서 | 파일 | 작업 |
|------|------|------|
| 1 | `src/pages/[Name]Page.tsx` | 페이지 컴포넌트 생성 |
| 2 | `src/pages/index.ts` | `export { [Name]Page } from './[Name]Page'` 추가 |
| 3 | `src/app/router.tsx` | 라우트 정의 및 routeTree에 추가 |

### 새 레이아웃 컴포넌트 추가 시

| 순서 | 파일 | 작업 |
|------|------|------|
| 1 | `src/components/layout/[Name].tsx` | 컴포넌트 생성 |
| 2 | `src/components/layout/index.ts` | 배럴 익스포트 추가 |

### 새 폼 컴포넌트 추가 시

| 순서 | 파일 | 작업 |
|------|------|------|
| 1 | `src/schemas/[domain].ts` | Zod 스키마 정의 |
| 2 | `src/components/forms/[Name]Form.tsx` | 폼 컴포넌트 생성 |
| 3 | `src/components/forms/index.ts` | 배럴 익스포트 추가 |

### shadcn/ui 컴포넌트 추가 시

```bash
npx shadcn@latest add [component-name]
```

> `src/components/ui/` 내 shadcn/ui 컴포넌트는 직접 수정 금지

---

## AI 의사결정 기준

### 컴포넌트 위치 결정

```
페이지 전체 화면인가?
├── YES → src/pages/
└── NO → 여러 페이지에서 재사용되는가?
    ├── YES → 레이아웃 관련인가?
    │   ├── YES → src/components/layout/
    │   └── NO → 폼 관련인가?
    │       ├── YES → src/components/forms/
    │       └── NO → src/components/
    └── NO → 해당 페이지 파일 내에 정의
```

### 상태 관리 방식 선택

```
서버에서 가져온 데이터인가?
├── YES → TanStack Query 사용
└── NO → 여러 컴포넌트에서 공유하는가?
    ├── YES → 영속성이 필요한가?
    │   ├── YES → Zustand + persist
    │   └── NO → Zustand
    └── NO → useState 또는 useReducer
```

---

## 금지 사항

### 절대 금지

- **`any` 타입 사용**
- **인라인 스타일 사용** - Tailwind CSS 클래스 사용
- **직접 DOM 조작** - React 방식 사용
- **`src/components/ui/` 내 파일 직접 수정** - shadcn/ui 컴포넌트
- **console.log 커밋** - 디버깅 후 제거

### 지양

- 컴포넌트 내 비즈니스 로직 - 커스텀 훅으로 분리
- 중첩 삼항 연산자 - 가독성 저하
- 매직 넘버/스트링 - 상수로 추출
- 과도한 props drilling - Zustand 또는 Context 사용

---

## 명령어

```bash
# 개발
npm run dev          # 개발 서버 (Vite)
npm run build        # 프로덕션 빌드
npm run lint         # ESLint 검사
npm run preview      # 빌드 결과 미리보기

# UI 컴포넌트 추가
npx shadcn@latest add [component]
```

---

## 환경 변수

```env
NOTION_API_KEY=secret_xxxxx      # Notion Integration 토큰
NOTION_DATABASE_ID=xxxxx         # Notion 데이터베이스 ID
```

> `.env` 파일은 `.gitignore`에 포함되어 있음. 커밋 금지.
