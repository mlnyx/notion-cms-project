import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShareButtonProps {
  /** 공유 제목 */
  title: string;
  /** 공유 텍스트 */
  text: string;
  /** 공유 URL (미지정 시 현재 페이지 URL) */
  url?: string;
}

/** Web Share API 또는 클립보드 복사로 공유하는 버튼 */
export function ShareButton({ title, text, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = url ?? window.location.href;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
      } catch {
        // 사용자가 공유를 취소한 경우 무시
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleShare}>
      {copied ? (
        <>
          <Check className="mr-1 h-4 w-4" />
          복사됨
        </>
      ) : (
        <>
          <Share2 className="mr-1 h-4 w-4" />
          공유
        </>
      )}
    </Button>
  );
}
