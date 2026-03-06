/**
 * 치과 AI 아이디어 로그북 - 타입 정의 (Serverless Functions용)
 * src/types/idea.ts와 동일한 타입을 Vercel Serverless Functions에서 사용
 */

/** 대상 사용자 */
export type Target = '의사' | '환자' | '스태프' | '기공사' | '학생';

/** 아이디어 카테고리 */
export type Category = '진단' | '상담' | '운영' | '교육' | '행정';

/** 사업성 평가 (상/중/하) */
export type BusinessPotential = '상' | '중' | '하';

/** 기술 난이도 (상/중/하) */
export type TechnicalDifficulty = '상' | '중' | '하';

/** 치과 AI 아이디어 */
export interface Idea {
  /** Notion 페이지 ID */
  id: string;
  /** 아이디어 제목 */
  title: string;
  /** 해결하려는 문제 */
  problem: string;
  /** 실제 사례 */
  realCase: string;
  /** AI 접근 방식 */
  aiApproach: string;
  /** 대상 사용자 (복수 선택 가능) */
  target: Target[];
  /** 카테고리 (복수 선택 가능) */
  category: Category[];
  /** 사업성 평가 */
  businessPotential: BusinessPotential;
  /** 기술 난이도 */
  technicalDifficulty: TechnicalDifficulty;
  /** 생성일 (ISO 8601 형식) */
  createdAt: string;
}
