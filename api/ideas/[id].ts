/**
 * GET /api/ideas/:id
 * Notion 페이지 ID로 단일 아이디어를 조회합니다
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { notion } from '../_lib/notionClient';
import { parseNotionPage } from '../_lib/parseNotionPage';

/** CORS 헤더를 설정합니다 */
function setCorsHeaders(res: VercelResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

/** 요청에서 id 파라미터를 추출합니다 */
function extractId(query: VercelRequest['query']): string | null {
  const id = query.id;

  if (typeof id === 'string' && id.length > 0) {
    return id;
  }

  return null;
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

  const id = extractId(req.query);

  if (!id) {
    res.status(400).json({ error: '아이디어 ID가 필요합니다' });
    return;
  }

  try {
    const page = await notion.pages.retrieve({ page_id: id });

    // PageObjectResponse 타입 가드
    if (!('properties' in page)) {
      res.status(404).json({ error: '아이디어를 찾을 수 없습니다' });
      return;
    }

    const idea = parseNotionPage(page as PageObjectResponse);

    res.status(200).json(idea);
  } catch (error) {
    console.error(`아이디어 조회 실패 (id: ${id}):`, error);

    // Notion API 404 에러 처리
    if (
      error instanceof Object &&
      'status' in error &&
      (error as { status: number }).status === 404
    ) {
      res.status(404).json({ error: '아이디어를 찾을 수 없습니다' });
      return;
    }

    const message =
      error instanceof Error
        ? error.message
        : '알 수 없는 오류가 발생했습니다';

    res.status(500).json({ error: message });
  }
}
