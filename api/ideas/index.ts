/**
 * GET /api/ideas
 * Notion 데이터베이스에서 아이디어 목록을 조회합니다
 * Created Date 기준 내림차순 정렬
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { notion, getDatabaseId } from '../_lib/notionClient';
import { parseNotionPage } from '../_lib/parseNotionPage';

/** CORS 헤더를 설정합니다 */
function setCorsHeaders(res: VercelResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  setCorsHeaders(res);

  // CORS preflight 요청 처리
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // GET 메서드만 허용
  if (req.method !== 'GET') {
    res.status(405).json({ error: '허용되지 않는 메서드입니다' });
    return;
  }

  try {
    const databaseId = getDatabaseId();

    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'Created Date',
          direction: 'descending',
        },
      ],
    });

    // PageObjectResponse만 필터링 (PartialPageObjectResponse 제외)
    const pages = response.results.filter(
      (page): page is PageObjectResponse => 'properties' in page,
    );

    const ideas = pages.map(parseNotionPage);

    res.status(200).json(ideas);
  } catch (error) {
    console.error('아이디어 목록 조회 실패:', error);

    const message =
      error instanceof Error
        ? error.message
        : '알 수 없는 오류가 발생했습니다';

    res.status(500).json({ error: message });
  }
}
