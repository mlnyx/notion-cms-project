# Notion API 사용 가이드

## 환경 변수

```env
NOTION_API_KEY=secret_xxxxx
NOTION_DATABASE_ID=xxxxx
```

## API 클라이언트 위치

`src/lib/notion.ts`에서 Notion API 클라이언트 관리

## 기본 함수 패턴

```typescript
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// 아이디어 목록 조회
export async function fetchIdeas(): Promise<Idea[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    sorts: [{ property: 'Created Date', direction: 'descending' }],
  });

  return response.results.map(parseIdeaFromPage);
}

// 단일 아이디어 조회
export async function fetchIdeaById(id: string): Promise<Idea | null> {
  const page = await notion.pages.retrieve({ page_id: id });
  return parseIdeaFromPage(page);
}
```

## 데이터베이스 필드 매핑

| Notion 필드 | 타입 | TypeScript 속성 |
|------------|------|-----------------|
| Title | Title | `title` |
| Problem | Text | `problem` |
| Real Case | Text | `realCase` |
| AI Approach | Text | `aiApproach` |
| Target | Multi-select | `target` |
| Category | Multi-select | `category` |
| Business Potential | Select | `businessPotential` |
| Technical Difficulty | Select | `technicalDifficulty` |
| Created Date | Date | `createdAt` |

## 에러 처리

```typescript
try {
  const ideas = await fetchIdeas();
} catch (error) {
  console.error('Notion API 오류:', error);
  // 적절한 에러 처리
}
```

## 캐싱 전략

Next.js의 `revalidate` 옵션 활용:

```typescript
export const revalidate = 60; // 60초마다 재검증
```
