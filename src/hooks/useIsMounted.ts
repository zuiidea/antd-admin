import { useCallback, useEffect, useRef } from 'react';

// Simple hook that returns a stable function to check mounted state
export default function useIsMounted(): () => boolean {
  const ref = useRef(true);
  useEffect(() => {
    ref.current = true;
    return () => {
      ref.current = false;
    };
  }, []);
  return useCallback(() => ref.current, []);
}
