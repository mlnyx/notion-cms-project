# 코드 스타일 가이드

## TypeScript 규칙

- `any` 타입 사용 금지 - 명시적 타입 정의 필수
- 인터페이스는 `I` 접두사 없이 PascalCase 사용
- 타입 정의는 `types/` 디렉토리에 관리

## 네이밍 컨벤션

- **변수/함수**: camelCase (`fetchIdeas`, `ideaList`)
- **컴포넌트**: PascalCase (`IdeaCard`, `TagBadge`)
- **파일명**: 컴포넌트는 PascalCase, 유틸리티는 camelCase
- **상수**: UPPER_SNAKE_CASE (`API_ENDPOINT`)

## 들여쓰기 및 포맷

- 들여쓰기: 2칸 스페이스
- 세미콜론: 사용
- 따옴표: 작은따옴표 (`'`) 우선
- 후행 쉼표: 사용

## 주석

- 주석은 한국어로 작성
- 복잡한 로직에만 주석 추가
- JSDoc 스타일 권장

```typescript
/**
 * Notion에서 아이디어 목록을 가져옵니다
 * @returns 아이디어 배열
 */
async function fetchIdeas(): Promise<Idea[]> {
  // ...
}
```
