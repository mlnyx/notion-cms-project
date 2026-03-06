# Notion SDK 버전 관련 메모

## v5 Breaking Change
- `databases.query()` 메서드 제거됨
- 대체: `dataSources.query()` (data_source_id 사용)
- `databases`에는 `retrieve`, `create`, `update`만 남음

## v4 사용 결정
- `@notionhq/client@4`를 사용하여 `databases.query()` 유지
- PRD/api.md 문서가 모두 `databases.query` 기반으로 작성됨
- v5로 마이그레이션 시 `dataSources.query`로 변경 필요

## PageObjectResponse 타입 가드
```typescript
// PartialPageObjectResponse 필터링
const pages = response.results.filter(
  (page): page is PageObjectResponse => 'properties' in page,
);
```
