import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  /** 페이지 타이틀 */
  title: string;
  /** 페이지 설명 */
  description: string;
  /** OG 이미지 URL (선택) */
  ogImage?: string;
}

/** 페이지별 SEO 메타태그를 설정하는 컴포넌트 */
export function SEOHead({ title, description, ogImage }: SEOHeadProps) {
  const fullTitle = `${title} | 치과 AI 아이디어 로그북`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={ogImage} />}
    </Helmet>
  );
}
