/**
 * 치과 AI 아이디어 로그북 - 타입 정의
 * Notion 데이터베이스 스키마에 맞춘 타입
 */

/** 대상 사용자 */
export type Target = '의사' | '환자' | '스태프' | '기공사' | '학생';

/** 아이디어 카테고리 */
export type Category = '진단' | '상담' | '운영' | '교육' | '행정';

/** 사업성 평가 (상/중/하) */
export type BusinessPotential = '상' | '중' | '하';

/** 기술 난이도 (상/중/하) */
export type TechnicalDifficulty = '상' | '중' | '하';

/** 아이디어 상태 */
export type IdeaStatus = '아이디어' | '검토중' | '개발중' | '완료' | '보류';

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
  /** 아이디어 상태 */
  status?: IdeaStatus;
  /** 참고 링크 (URL 목록) */
  references?: string[];
  /** 키워드 */
  keywords?: string[];
}
