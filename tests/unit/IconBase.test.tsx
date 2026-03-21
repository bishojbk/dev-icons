import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IconBase } from '../../packages/devicon-kit/src/lib/IconBase';
import { DevIconProvider } from '../../packages/devicon-kit/src/lib/IconContext';
import React from 'react';

const defaultVariants = {
  default: <rect width="10" height="10" data-testid="default-variant" />,
  dark: <rect width="10" height="10" data-testid="dark-variant" />,
};

describe('IconBase', () => {
  it('renders an SVG element', () => {
    const { container } = render(
      <IconBase variants={defaultVariants} viewBox="0 0 128 128" />
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute('xmlns')).toBe('http://www.w3.org/2000/svg');
  });

  it('applies default size (md = 24px)', () => {
    const { container } = render(
      <IconBase variants={defaultVariants} />
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('24');
    expect(svg?.getAttribute('height')).toBe('24');
  });

  it('applies named size preset', () => {
    const { container } = render(
      <IconBase variants={defaultVariants} size="xl" />
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('48');
    expect(svg?.getAttribute('height')).toBe('48');
  });

  it('applies numeric size', () => {
    const { container } = render(
      <IconBase variants={defaultVariants} size={96} />
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('96');
  });

  it('applies color', () => {
    const { container } = render(
      <IconBase variants={defaultVariants} color="#ff0000" />
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('fill')).toBe('#ff0000');
  });

  it('renders default variant by default', () => {
    const { container } = render(
      <IconBase variants={defaultVariants} />
    );
    expect(container.querySelector('[data-testid="default-variant"]')).toBeTruthy();
  });

  it('renders selected variant', () => {
    const { container } = render(
      <IconBase variants={defaultVariants} variant="dark" />
    );
    expect(container.querySelector('[data-testid="dark-variant"]')).toBeTruthy();
  });

  it('falls back to default if variant does not exist', () => {
    const { container } = render(
      <IconBase variants={defaultVariants} variant="wordmark" />
    );
    expect(container.querySelector('[data-testid="default-variant"]')).toBeTruthy();
  });

  it('is hidden from screen readers by default', () => {
    const { container } = render(
      <IconBase variants={defaultVariants} />
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
    expect(svg?.getAttribute('role')).toBe('presentation');
  });

  it('adds accessible title when title prop is provided', () => {
    const { container } = render(
      <IconBase variants={defaultVariants} title="React" />
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('role')).toBe('img');
    expect(svg?.getAttribute('aria-hidden')).toBe('false');
    expect(container.querySelector('title')?.textContent).toBe('React');
  });

  it('adds aria-label when alt prop is provided', () => {
    const { container } = render(
      <IconBase variants={defaultVariants} alt="React logo" />
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('aria-label')).toBe('React logo');
    expect(svg?.getAttribute('role')).toBe('img');
  });

  it('applies className', () => {
    const { container } = render(
      <IconBase variants={defaultVariants} className="my-icon" />
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('class')).toContain('my-icon');
  });

  it('applies inline style', () => {
    const { container } = render(
      <IconBase variants={defaultVariants} style={{ marginRight: 8 }} />
    );
    const svg = container.querySelector('svg');
    expect(svg?.style.marginRight).toBe('8px');
  });

  it('inherits defaults from DevIconProvider', () => {
    const { container } = render(
      <DevIconProvider size="xl" color="#00ff00">
        <IconBase variants={defaultVariants} />
      </DevIconProvider>
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('48');
    expect(svg?.getAttribute('fill')).toBe('#00ff00');
  });

  it('overrides context with explicit props', () => {
    const { container } = render(
      <DevIconProvider size="xl" color="#00ff00">
        <IconBase variants={defaultVariants} size="sm" color="#ff0000" />
      </DevIconProvider>
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('16');
    expect(svg?.getAttribute('fill')).toBe('#ff0000');
  });

  it('forwards ref', () => {
    const ref = React.createRef<SVGSVGElement>();
    render(<IconBase ref={ref} variants={defaultVariants} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });
});
