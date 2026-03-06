/**
 * Notion API 클라이언트 싱글톤
 * 환경 변수 검증 포함
 */
import { Client } from '@notionhq/client';

/** 환경 변수 검증 후 Notion 클라이언트를 반환합니다 */
function createNotionClient(): Client {
  const apiKey = process.env.NOTION_API_KEY;

  if (!apiKey) {
    throw new Error('NOTION_API_KEY 환경 변수가 설정되지 않았습니다');
  }

  return new Client({ auth: apiKey });
}

/** Notion 데이터베이스 ID를 반환합니다 */
export function getDatabaseId(): string {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error('NOTION_DATABASE_ID 환경 변수가 설정되지 않았습니다');
  }

  return databaseId;
}

export const notion = createNotionClient();
