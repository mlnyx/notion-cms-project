/**
 * GET /api/feed
 * RSS 2.0 피드를 제공합니다
 * 최신 아이디어를 RSS XML 형식으로 반환
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { notion, getDatabaseId } from './_lib/notionClient';
import { parseNotionPage } from './_lib/parseNotionPage';
import type { Idea } from './_types/idea';

/** 특수 문자를 XML 이스케이프 처리합니다 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Idea를 RSS <item> XML로 변환합니다 */
function ideaToRssItem(idea: Idea, siteUrl: string): string {
  const link = `${siteUrl}/ideas/${idea.id}`;
  const pubDate = idea.createdAt
    ? new Date(idea.createdAt).toUTCString()
    : new Date().toUTCString();

  return `    <item>
      <title>${escapeXml(idea.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid>${escapeXml(link)}</guid>
      <description>${escapeXml(idea.problem)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== 'GET') {
    res.status(405).json({ error: '허용되지 않는 메서드입니다' });
    return;
  }

  try {
    const databaseId = getDatabaseId();
    const siteUrl = process.env.SITE_URL || 'https://dental-ai-lab.vercel.app';

    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [{ property: 'Created Date', direction: 'descending' }],
    });

    const pages = response.results.filter(
      (page): page is PageObjectResponse => 'properties' in page,
    );

    const ideas = pages.map(parseNotionPage);
    const items = ideas.map((idea) => ideaToRssItem(idea, siteUrl)).join('\n');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>치과 AI 아이디어 로그북</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>치과 현장의 문제를 AI로 해결하는 아이디어 모음</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600');
    res.status(200).send(rss);
  } catch (error) {
    console.error('RSS 피드 생성 실패:', error);

    const message =
      error instanceof Error
        ? error.message
        : '알 수 없는 오류가 발생했습니다';

    res.status(500).json({ error: message });
  }
}
