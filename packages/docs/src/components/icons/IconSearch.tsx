'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

interface IconSearchProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

export function IconSearch({ value, onChange, resultCount }: IconSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localValue, setLocalValue] = useState(value);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync external value changes (e.g. category reset clearing search)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const debouncedOnChange = useCallback(
    (val: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onChange(val);
      }, 200);
    },
    [onChange],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: 'var(--text-tertiary)' }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <input
        ref={inputRef}
        type="text"
        value={localValue}
        onChange={(e) => {
          setLocalValue(e.target.value);
          debouncedOnChange(e.target.value);
        }}
        placeholder="Search icons... (press / to focus)"
        className="search-input w-full rounded-xl border py-3.5 pl-11 pr-20 text-sm outline-none transition-all"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-xs"
        style={{ color: 'var(--text-tertiary)' }}
      >
        {resultCount} icon{resultCount !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
