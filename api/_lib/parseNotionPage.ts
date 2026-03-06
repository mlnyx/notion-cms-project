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
 * 속성 이름으로 프로퍼티를 찾습니다 (앞뒤 공백 허용)
 */
function findProp(
  props: PageObjectResponse['properties'],
  name: string,
): PageObjectResponse['properties'][string] | undefined {
  if (props[name]) return props[name];
  // 공백이 포함된 키를 탐색
  const key = Object.keys(props).find((k) => k.trim() === name);
  return key ? props[key] : undefined;
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
    title: findProp(props, 'Title') ? getTitleText(findProp(props, 'Title')!) : '',
    problem: findProp(props, 'Problem') ? getRichText(findProp(props, 'Problem')!) : '',
    realCase: findProp(props, 'Real Case') ? getRichText(findProp(props, 'Real Case')!) : '',
    aiApproach: findProp(props, 'AI Approach') ? getRichText(findProp(props, 'AI Approach')!) : '',
    target: findProp(props, 'Target') ? getMultiSelect<Target>(findProp(props, 'Target')!) : [],
    category: findProp(props, 'Category') ? getMultiSelect<Category>(findProp(props, 'Category')!) : [],
    businessPotential: findProp(props, 'Business Potential') ? getSelect<BusinessPotential>(findProp(props, 'Business Potential')!, '중') : '중',
    technicalDifficulty: findProp(props, 'Technical Difficulty') ? getSelect<TechnicalDifficulty>(findProp(props, 'Technical Difficulty')!, '중') : '중',
    createdAt: findProp(props, 'Created Date') ? getDate(findProp(props, 'Created Date')!) : '',
  };
}
