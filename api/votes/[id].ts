/**
 * GET/POST /api/votes/:id
 * 아이디어별 투표 수 조회 및 투표
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';

function kvKey(id: string): string {
  return `votes:${id}`;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const id = typeof req.query.id === 'string' ? req.query.id : null;
  if (!id) { res.status(400).json({ error: '아이디어 ID가 필요합니다' }); return; }

  try {
    if (req.method === 'GET') {
      const count = (await kv.get<number>(kvKey(id))) ?? 0;
      res.status(200).json({ id, count });
      return;
    }

    if (req.method === 'POST') {
      const count = await kv.incr(kvKey(id));
      res.status(200).json({ id, count });
      return;
    }

    res.status(405).json({ error: '허용되지 않는 메서드입니다' });
  } catch (error) {
    console.error(`투표 처리 실패 (id: ${id}):`, error);
    const message = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다';
    res.status(500).json({ error: message });
  }
}
