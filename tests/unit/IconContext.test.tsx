import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { DevIconProvider, useDevIconContext } from '../../packages/devicon-kit/src/lib/IconContext';
import React from 'react';

function ContextReader() {
  const ctx = useDevIconContext();
  return <div data-testid="ctx" data-ctx={JSON.stringify(ctx)} />;
}

describe('DevIconProvider', () => {
  it('provides default empty context', () => {
    const { getByTestId } = render(<ContextReader />);
    const ctx = JSON.parse(getByTestId('ctx').getAttribute('data-ctx')!);
    expect(ctx).toEqual({});
  });

  it('provides context values', () => {
    const { getByTestId } = render(
      <DevIconProvider size="lg" color="#000">
        <ContextReader />
      </DevIconProvider>
    );
    const ctx = JSON.parse(getByTestId('ctx').getAttribute('data-ctx')!);
    expect(ctx.size).toBe('lg');
    expect(ctx.color).toBe('#000');
  });

  it('supports nested providers with override', () => {
    const { getByTestId } = render(
      <DevIconProvider size="lg" color="#000">
        <DevIconProvider size="sm">
          <ContextReader />
        </DevIconProvider>
      </DevIconProvider>
    );
    const ctx = JSON.parse(getByTestId('ctx').getAttribute('data-ctx')!);
    expect(ctx.size).toBe('sm');
    // Note: inner provider doesn't inherit outer values — it replaces the full context
    expect(ctx.color).toBeUndefined();
  });
});
