import type { Idea } from '@/types/idea';

const API_BASE = '/api';

/** 아이디어 목록 조회 */
export async function fetchIdeas(): Promise<Idea[]> {
  const res = await fetch(`${API_BASE}/ideas`);
  if (!res.ok) throw new Error('아이디어 목록을 불러오지 못했습니다');
  return res.json();
}

/** 단일 아이디어 조회 */
export async function fetchIdeaById(id: string): Promise<Idea> {
  const res = await fetch(`${API_BASE}/ideas/${id}`);
  if (!res.ok) throw new Error('아이디어를 찾을 수 없습니다');
  return res.json();
}
