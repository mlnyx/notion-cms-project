/**
 * GET /api/votes
 * 모든 아이디어의 투표 수를 일괄 반환합니다
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'GET') { res.status(405).json({ error: '허용되지 않는 메서드입니다' }); return; }

  try {
    const keys = await kv.keys('votes:*');
    if (keys.length === 0) {
      res.status(200).json({});
      return;
    }

    const values = await kv.mget<number[]>(...keys);
    const result: Record<string, number> = {};
    keys.forEach((key, i) => {
      const id = key.replace('votes:', '');
      result[id] = values[i] ?? 0;
    });

    res.setHeader('Cache-Control', 'public, s-maxage=30');
    res.status(200).json(result);
  } catch (error) {
    console.error('투표 수 일괄 조회 실패:', error);
    const message = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다';
    res.status(500).json({ error: message });
  }
}
