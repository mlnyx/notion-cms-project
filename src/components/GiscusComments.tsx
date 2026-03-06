import { useEffect, useRef } from 'react';

interface GiscusCommentsProps {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping?: string;
}

export function GiscusComments({
  repo,
  repoId,
  category,
  categoryId,
  mapping = 'pathname',
}: GiscusCommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', mapping);
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-lang', 'ko');
    script.crossOrigin = 'anonymous';
    script.async = true;

    // 다크모드 감지
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    script.setAttribute('data-theme', isDark ? 'dark' : 'light');

    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, [repo, repoId, category, categoryId, mapping]);

  return <div ref={containerRef} />;
}
