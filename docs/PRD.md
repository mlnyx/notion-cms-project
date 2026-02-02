# 치과 AI 아이디어 로그북 (Public Lab Notebook)

## 프로젝트 개요

### 프로젝트명
치과 AI 아이디어 로그북 (Public Lab Notebook)

### 목적
치과 진료·운영 현장에서 발생하는 실제 문제를 AI 관점에서 구조화하여 기록하고, 연구·창업·과제 기획에 바로 활용 가능한 공개 아이디어 저장소 구축

### CMS 선택 이유
- Notion API를 활용해 개발 지식 없이도 아이디어 추가·수정 가능
- 연구 노트·기획 문서로의 재사용 용이
- 협업 및 버전 관리 편의성

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| Frontend | Next.js 15, TypeScript |
| CMS | Notion API |
| Styling | Tailwind CSS, shadcn/ui |
| Icons | Lucide React |
| 배포 | Vercel |

---

## 주요 기능

### 1. AI 아이디어 리스트 공개
- 최신순으로 치과 AI 아이디어 카드 형태 노출
- 제목, 타겟, 사업성, 난이도 요약 표시

### 2. 아이디어 상세 페이지
- 문제 상황 → 실제 사례 → AI 접근 방식 → 사업성/난이도 구조화 표시
- 체계적인 정보 전달을 위한 섹션 분리

### 3. 태그 기반 분류
- **대상별**: 의사 / 환자 / 스태프 / 기공사 / 학생
- **영역별**: 진단 / 상담 / 운영 / 교육 / 행정

---

## Notion 데이터베이스 구조

| 필드명 | 타입 | 설명 |
|--------|------|------|
| Title | Title | 아이디어 제목 |
| Problem | Text | 치과 현장에서 발생하는 구체적인 문제 |
| Real Case | Text | 실제 관찰 사례 또는 경험 기반 설명 |
| AI Approach | Text | 적용 가능한 AI/LLM/비전 접근 방식 |
| Target | Multi-select | 의사 / 환자 / 스태프 / 기공사 / 학생 |
| Category | Multi-select | 진단 / 상담 / 운영 / 교육 / 행정 |
| Business Potential | Select | 상 / 중 / 하 |
| Technical Difficulty | Select | 상 / 중 / 하 |
| Created Date | Date | 아이디어 기록일 |

---

## 화면 구성

### 메인 페이지 (`/`)
- 아이디어 카드 리스트
  - 제목
  - 타겟 태그
  - 사업성 배지
  - 난이도 배지
- 최신순 정렬
- 카드 클릭 시 상세 페이지 이동

### 아이디어 상세 페이지 (`/ideas/[id]`)
- **문제 정의**: Problem 필드 내용
- **실제 사례**: Real Case 필드 내용
- **AI 접근 방식**: AI Approach 필드 내용
- **평가 정보**: 사업성, 난이도, 대상, 카테고리 태그

---

## MVP 범위

### 포함
- [x] Notion DB와 연동된 아이디어 리스트 조회
- [x] 아이디어 상세 페이지 렌더링
- [x] 태그 기반 기본 분류 표시

### 선택 (추후 확장)
- [ ] 태그 기반 필터링 기능
- [ ] 검색 기능
- [ ] 페이지네이션

---

## 구현 단계

### Phase 1: Notion DB 생성 및 API 연동
1. Notion Integration 생성
2. Database ID 연결
3. 환경 변수 설정 (`NOTION_API_KEY`, `NOTION_DATABASE_ID`)

### Phase 2: Next.js 페이지 구성
1. 프로젝트 초기 설정 (Next.js 15, TypeScript)
2. Notion API 클라이언트 구성
3. 메인 리스트 페이지 개발
4. 상세 페이지 개발

### Phase 3: 기본 UI 적용 및 배포
1. Tailwind CSS 설정
2. shadcn/ui 컴포넌트 적용
3. 반응형 레이아웃 구현
4. Vercel 배포

---

## 프로젝트 구조 (예상)

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # 메인 리스트 페이지
│   └── ideas/
│       └── [id]/
│           └── page.tsx      # 상세 페이지
├── components/
│   ├── ui/                   # shadcn/ui 컴포넌트
│   ├── IdeaCard.tsx          # 아이디어 카드 컴포넌트
│   ├── IdeaDetail.tsx        # 아이디어 상세 컴포넌트
│   └── TagBadge.tsx          # 태그 배지 컴포넌트
├── lib/
│   ├── notion.ts             # Notion API 클라이언트
│   └── utils.ts              # 유틸리티 함수
└── types/
    └── idea.ts               # 타입 정의
```

---

## 환경 변수

```env
NOTION_API_KEY=secret_xxxxx
NOTION_DATABASE_ID=xxxxx
```

---

## 참고 자료

- [Notion API 공식 문서](https://developers.notion.com/)
- [Next.js 15 문서](https://nextjs.org/docs)
- [shadcn/ui 문서](https://ui.shadcn.com/)
