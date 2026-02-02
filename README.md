# 치과 AI 아이디어 로그북

치과 진료·운영 현장에서 발생하는 실제 문제를 AI 관점에서 구조화하여 기록하는 공개 아이디어 저장소입니다.

## 주요 기능

- **아이디어 리스트**: 최신순 카드 형태로 아이디어 노출
- **상세 페이지**: 문제 상황 → 실제 사례 → AI 접근 방식 구조화 표시
- **태그 분류**: 대상별(의사/환자/스태프), 영역별(진단/상담/운영) 분류

## 기술 스택

| 구분 | 기술 |
|------|------|
| Frontend | React 19, TypeScript, Vite |
| CMS | Notion API |
| Styling | Tailwind CSS v4, shadcn/ui |
| 상태관리 | Zustand, TanStack Query |
| 라우팅 | TanStack Router |

## 시작하기

### 설치

```bash
npm install
```

### 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
VITE_NOTION_API_KEY=secret_xxxxx
VITE_NOTION_DATABASE_ID=xxxxx
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 빌드

```bash
npm run build
```

## 프로젝트 구조

```
src/
├── app/                    # 앱 진입점
├── components/
│   ├── ui/                 # shadcn/ui 컴포넌트
│   ├── layout/             # 레이아웃 컴포넌트
│   └── ideas/              # 아이디어 관련 컴포넌트
├── pages/                  # 페이지 컴포넌트
├── hooks/                  # 커스텀 훅
├── stores/                 # Zustand 스토어
├── lib/                    # 유틸리티
└── types/                  # TypeScript 타입
```

## 문서

- [PRD (기획 문서)](./docs/PRD.md)

## 라이선스

MIT
