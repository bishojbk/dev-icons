import { forwardRef, useId, useInsertionEffect, useRef } from 'react';
import { useDevIconContext } from './IconContext';
import { resolveSize, cx } from './utils';
import { ANIMATION_MAP, ANIMATION_KEYFRAMES } from './constants';
import type { IconBaseProps } from './types';

let keyframesInjected = false;

function useInjectKeyframes() {
  useInsertionEffect(() => {
    if (keyframesInjected || typeof document === 'undefined') return;
    const style = document.createElement('style');
    style.setAttribute('data-devicon-kit', '');
    style.textContent = ANIMATION_KEYFRAMES;
    document.head.appendChild(style);
    keyframesInjected = true;
  }, []);
}

/**
 * Base SVG wrapper used internally by all generated icon components.
 * Handles size resolution, variant selection, animations, and accessibility.
 */
export const IconBase = forwardRef<SVGSVGElement, IconBaseProps>(
  (props, ref) => {
    const ctx = useDevIconContext();
    const {
      size: sizeProp,
      color: colorProp,
      variant: variantProp,
      animate: animateProp,
      title,
      alt,
      className,
      style,
      variants,
      defaultColor,
      viewBox = '0 0 128 128',
      ...svgProps
    } = props;

    // Merge: explicit prop > context > default > brand color
    const size = sizeProp ?? ctx.size ?? 'md';
    const color = colorProp ?? ctx.color ?? defaultColor;
    const variant = variantProp ?? ctx.variant ?? 'default';
    const animate = animateProp ?? ctx.animate ?? 'none';

    const resolvedSize = resolveSize(size);
    const titleId = useId();

    // Inject animation keyframes on first use
    const needsAnimation = animate !== 'none';
    useInjectKeyframes();

    // Pick the correct variant, falling back to default
    const svgChildren = variants[variant] ?? variants['default'];

    const animationStyle = needsAnimation
      ? { animation: ANIMATION_MAP[animate] }
      : {};

    const hasAccessibleName = !!(title || alt);

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={resolvedSize}
        height={resolvedSize}
        viewBox={viewBox}
        fill={color}
        role={hasAccessibleName ? 'img' : 'presentation'}
        aria-labelledby={title ? titleId : undefined}
        aria-label={!title && alt ? alt : undefined}
        aria-hidden={!hasAccessibleName}
        className={cx(ctx.className, className)}
        style={{ ...ctx.style, ...animationStyle, color, ...style }}
        {...svgProps}
      >
        {title && <title id={titleId}>{title}</title>}
        {svgChildren}
      </svg>
    );
  }
);

IconBase.displayName = 'IconBase';
