import { useState, useEffect, useRef } from 'react';

export default function useComponentVisible(initState: boolean) {
  const [isVisible, setIsVisible] = useState(initState);
  const ref = useRef<HTMLElement>(null);
  const exaRef = useRef<HTMLElement | null>(null);

  const handleMousedown = (event: Event) => {
    exaRef.current = event.target as HTMLElement;
  };

  const handleMouseup = (event: Event) => {
    if (
      ref.current &&
      !ref.current.contains(exaRef.current) &&
      !ref.current.contains(event.target as HTMLElement)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleMousedown, true);
    document.addEventListener('mouseup', handleMouseup, true);
    return () => {
      document.removeEventListener('mousedown', handleMousedown, true);
      document.removeEventListener('mouseup', handleMouseup, true);
    };
  }, []);

  return { ref, isVisible, setIsVisible };
}
