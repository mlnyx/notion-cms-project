/**
 * GET /api/ideas/:id
 * Notion 페이지 ID로 단일 아이디어를 조회합니다
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
    status: p['Status'] ? getSelect(p['Status'], '아이디어') : '아이디어',
    references: p['References']?.type === 'url' && p['References'].url ? [p['References'].url] : [],
    keywords: p['Keywords'] ? getMultiSelect(p['Keywords']) : [],
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

  const id = typeof req.query.id === 'string' ? req.query.id : null;
  if (!id) { res.status(400).json({ error: '아이디어 ID가 필요합니다' }); return; }

  try {
    const page = await notion.pages.retrieve({ page_id: id });

    if (!('properties' in page)) {
      res.status(404).json({ error: '아이디어를 찾을 수 없습니다' });
      return;
    }

    res.status(200).json(parsePage(page as PageObjectResponse));
  } catch (error) {
    console.error(`아이디어 조회 실패 (id: ${id}):`, error);

    if (error instanceof Object && 'status' in error && (error as { status: number }).status === 404) {
      res.status(404).json({ error: '아이디어를 찾을 수 없습니다' });
      return;
    }

    const message = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다';
    res.status(500).json({ error: message });
  }
}
