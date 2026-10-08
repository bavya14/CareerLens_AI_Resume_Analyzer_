import { useCallback, useEffect, useState } from 'react';
import { getTheme, setTheme as persistTheme } from '@/services/storage';

export function useTheme() {
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => getTheme());

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      persistTheme(next);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
