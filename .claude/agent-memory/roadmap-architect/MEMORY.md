# Roadmap Architect 메모리

## 프로젝트 개요
- 치과 AI 아이디어 로그북 - Notion CMS 기반 공개 아이디어 저장소
- PRD: `docs/PRD.md`, 로드맵: `docs/ROADMAP.md`

## 기술 스택 (중요: PRD와 다름)
- PRD에는 Next.js 15로 기재되어 있으나, 실제는 **Vite 7 + React 19 + TanStack Router/Query + Zustand**
- API: Vercel Serverless Functions (`api/` 디렉토리, @vercel/node)
- Notion API: @notionhq/client v4
- TypeScript 5.9, Tailwind CSS 4, shadcn/ui

## 진행 상황 (2026-03-06 기준)
- Phase 1: 완료 (프로젝트 초기 설정)
- Phase 2: 80% 완료 (타입 정의, API 서버리스 함수, TagBadge 완료 / TanStack Query 훅 미완료)
- Phase 3~5: 대기

## 핵심 파일 위치
- 타입: `src/types/idea.ts`
- API: `api/ideas/index.ts`, `api/ideas/[id].ts`, `api/_lib/`
- 컴포넌트: `src/components/TagBadge.tsx`
- 라우터: `src/app/router.tsx`
- 페이지: `src/pages/` 디렉토리

## 작업 관리
- shrimp task manager로 작업 관리 중
- ROADMAP.md에는 shrimp 작업 ID를 포함하지 않음 (사용자 요청)
