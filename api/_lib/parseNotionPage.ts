/**
 * Notion 페이지를 Idea 타입으로 파싱하는 유틸리티
 * Vercel Serverless Functions에서 공유하여 사용
 */
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type {
  Idea,
  Target,
  Category,
  BusinessPotential,
  TechnicalDifficulty,
} from '../_types/idea';

/** Notion 페이지 프로퍼티에서 타이틀 텍스트를 추출합니다 */
function getTitleText(property: PageObjectResponse['properties'][string]): string {
  if (property.type === 'title') {
    return property.title.map((t) => t.plain_text).join('') || '';
  }
  return '';
}

/** Notion 페이지 프로퍼티에서 리치텍스트를 추출합니다 */
function getRichText(property: PageObjectResponse['properties'][string]): string {
  if (property.type === 'rich_text') {
    return property.rich_text.map((t) => t.plain_text).join('') || '';
  }
  return '';
}

/** Notion 페이지 프로퍼티에서 멀티셀렉트 값을 추출합니다 */
function getMultiSelect<T extends string>(
  property: PageObjectResponse['properties'][string],
): T[] {
  if (property.type === 'multi_select') {
    return property.multi_select.map((item) => item.name as T);
  }
  return [];
}

/** Notion 페이지 프로퍼티에서 셀렉트 값을 추출합니다 */
function getSelect<T extends string>(
  property: PageObjectResponse['properties'][string],
  fallback: T,
): T {
  if (property.type === 'select' && property.select) {
    return property.select.name as T;
  }
  return fallback;
}

/** Notion 페이지 프로퍼티에서 날짜를 추출합니다 */
function getDate(property: PageObjectResponse['properties'][string]): string {
  if (property.type === 'date' && property.date) {
    return property.date.start;
  }
  return '';
}

/**
 * Notion 페이지 객체를 Idea 타입으로 변환합니다
 * @param page - Notion 페이지 객체
 * @returns 파싱된 Idea 객체
 */
export function parseNotionPage(page: PageObjectResponse): Idea {
  const props = page.properties;

  return {
    id: page.id,
    title: getTitleText(props['Title']),
    problem: getRichText(props['Problem']),
    realCase: getRichText(props['Real Case']),
    aiApproach: getRichText(props['AI Approach']),
    target: getMultiSelect<Target>(props['Target']),
    category: getMultiSelect<Category>(props['Category']),
    businessPotential: getSelect<BusinessPotential>(props['Business Potential'], '중'),
    technicalDifficulty: getSelect<TechnicalDifficulty>(props['Technical Difficulty'], '중'),
    createdAt: getDate(props['Created Date']),
  };
}
