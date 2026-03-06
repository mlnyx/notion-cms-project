import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useFilterStore } from '@/stores/useFilterStore';

/** 디바운스 검색바 컴포넌트 (300ms) */
export function SearchBar() {
  const { searchQuery, setSearchQuery } = useFilterStore();
  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, setSearchQuery]);

  // 외부에서 searchQuery가 초기화되면 input도 동기화
  useEffect(() => {
    if (searchQuery === '' && inputValue !== '') {
      setInputValue('');
    }
  }, [searchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="아이디어 검색..."
        className="pl-9"
      />
    </div>
  );
}
