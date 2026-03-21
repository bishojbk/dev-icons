import { describe, it, expect } from 'vitest';
import { resolveSize, cx } from '../../packages/devicon-kit/src/lib/utils';

describe('resolveSize', () => {
  it('returns pixel number as-is', () => {
    expect(resolveSize(48)).toBe(48);
    expect(resolveSize(0)).toBe(0);
    expect(resolveSize(100)).toBe(100);
  });

  it('resolves named presets correctly', () => {
    expect(resolveSize('xs')).toBe(12);
    expect(resolveSize('sm')).toBe(16);
    expect(resolveSize('md')).toBe(24);
    expect(resolveSize('lg')).toBe(32);
    expect(resolveSize('xl')).toBe(48);
    expect(resolveSize('2xl')).toBe(64);
  });

  it('falls back to md for unknown preset', () => {
    // @ts-expect-error - testing invalid input
    expect(resolveSize('unknown')).toBe(24);
  });
});

describe('cx', () => {
  it('joins class names', () => {
    expect(cx('a', 'b', 'c')).toBe('a b c');
  });

  it('filters falsy values', () => {
    expect(cx('a', undefined, 'b', null, false, 'c')).toBe('a b c');
  });

  it('returns empty string for no truthy values', () => {
    expect(cx(undefined, null, false)).toBe('');
  });
});
