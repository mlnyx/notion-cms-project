# 프로젝트 메모리

## 프로젝트 실제 구조
- CLAUDE.md에 Next.js라고 되어 있지만, **실제로는 Vite + React 19 + TanStack Router 프로젝트**
- 빌드: `tsc -b && vite build`
- API: Vercel Serverless Functions (`api/` 디렉토리)

## 기술 스택
- Vite 7, React 19, TanStack Router/Query, Zustand
- Tailwind CSS 4, shadcn/ui
- TypeScript ~5.9
- Vercel Serverless Functions (api/ 디렉토리)

## Notion SDK 주의사항
- **v5에서 `databases.query` 제거됨** → `dataSources.query`로 변경됨
- v4 (`@notionhq/client@4`)를 사용하면 `databases.query` 사용 가능
- 현재 프로젝트는 v4.0.2 사용 중
- 상세 내용: [notion-sdk.md](./notion-sdk.md)

## API 구조 (`api/` 디렉토리)
- `api/_lib/notionClient.ts` - Notion 클라이언트 싱글톤
- `api/_lib/parseNotionPage.ts` - Notion 페이지 → Idea 타입 변환
- `api/_types/idea.ts` - Serverless Functions용 타입 정의 (src/types/idea.ts 복사본)
- `api/ideas/index.ts` - GET /api/ideas (목록 조회)
- `api/ideas/[id].ts` - GET /api/ideas/:id (단일 조회)
- `api/tsconfig.json` - 별도 tsconfig (moduleResolution: node, baseUrl: ..)

## 환경 변수
- `NOTION_API_KEY` - Notion Integration 토큰
- `NOTION_DATABASE_ID` - Notion 데이터베이스 ID

## Windows 환경 이슈
- Prettier PostToolUse hook에서 Windows 경로 파싱 실패 (jq가 백슬래시 제거)
- 파일 자체는 정상 생성되므로 무시 가능
