# 컴포넌트 패턴 가이드

## 컴포넌트 구조

```
src/components/
├── ui/              # shadcn/ui 기본 컴포넌트
├── IdeaCard.tsx     # 아이디어 카드
├── IdeaDetail.tsx   # 아이디어 상세
└── TagBadge.tsx     # 태그 배지
```

## 컴포넌트 작성 규칙

### 함수형 컴포넌트 사용

```typescript
interface IdeaCardProps {
  idea: Idea;
}

export function IdeaCard({ idea }: IdeaCardProps) {
  return (
    // ...
  );
}
```

### Props 타입 정의

- Props는 컴포넌트 파일 내에서 인터페이스로 정의
- 공유되는 타입은 `types/` 디렉토리로 분리

### 스타일링

- Tailwind CSS 클래스 사용
- shadcn/ui 컴포넌트 활용
- 반응형 필수 (`sm:`, `md:`, `lg:` 브레이크포인트)

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* ... */}
</div>
```

## shadcn/ui 컴포넌트 추가

```bash
npx shadcn@latest add [컴포넌트명]
```

자주 사용하는 컴포넌트:
- `card` - 카드 레이아웃
- `badge` - 태그/배지
- `button` - 버튼
- `input` - 입력 필드
