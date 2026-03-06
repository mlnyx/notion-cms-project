/**
 * GET /api/ideas
 * Notion 데이터베이스에서 아이디어 목록을 조회합니다
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Client } from '@notionhq/client';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

type Props = PageObjectResponse['properties'][string];

function getTitleText(p: Props): string {
  return p.type === 'title' ? p.title.map((t) => t.plain_text).join('') : '';
}

function getRichText(p: Props): string {
  return p.type === 'rich_text' ? p.rich_text.map((t) => t.plain_text).join('') : '';
}

function getMultiSelect(p: Props): string[] {
  return p.type === 'multi_select' ? p.multi_select.map((i) => i.name) : [];
}

function getSelect(p: Props, fallback: string): string {
  return p.type === 'select' && p.select ? p.select.name : fallback;
}

function getDate(p: Props): string {
  return p.type === 'date' && p.date ? p.date.start : '';
}

function parsePage(page: PageObjectResponse) {
  const p = page.properties;
  return {
    id: page.id,
    title: p['Title'] ? getTitleText(p['Title']) : '',
    problem: p['Problem'] ? getRichText(p['Problem']) : '',
    realCase: p['Real Case'] ? getRichText(p['Real Case']) : '',
    aiApproach: p['AI Approach'] ? getRichText(p['AI Approach']) : '',
    target: p['Target'] ? getMultiSelect(p['Target']) : [],
    category: p['Category'] ? getMultiSelect(p['Category']) : [],
    businessPotential: p['Business Potential'] ? getSelect(p['Business Potential'], '중') : '중',
    technicalDifficulty: p['Technical Difficulty'] ? getSelect(p['Technical Difficulty'], '중') : '중',
    createdAt: p['Created Date'] ? getDate(p['Created Date']) : '',
  };
}

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
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      sorts: [{ property: 'Created Date', direction: 'descending' }],
    });

    const pages = response.results.filter(
      (page): page is PageObjectResponse => 'properties' in page,
    );

    res.status(200).json(pages.map(parsePage));
  } catch (error) {
    console.error('아이디어 목록 조회 실패:', error);
    const message = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다';
    res.status(500).json({ error: message });
  }
}
