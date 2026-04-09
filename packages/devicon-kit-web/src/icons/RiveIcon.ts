const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class RiveIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M.643 1.475c0 .814.668 1.475 1.49 1.475H14.49q2.112 0 3.48 1.29 1.366 1.291 1.366 3.32 0 1.875-1.367 3.072-1.366 1.169-3.479 1.168H9.12c-.824 0-1.491.66-1.491 1.475s.667 1.475 1.491 1.475h5.93l5.342 8.482q.497.768 1.398.768.995 0 1.398-.768.403-.8-.155-1.69l-4.753-7.56q1.926-.861 3.044-2.52 1.119-1.69 1.119-3.902 0-2.244-1.026-3.934-.993-1.69-2.795-2.643Q16.82 0 14.49 0H2.134C1.311 0 .643.66.643 1.475"/></g>`,
      'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M.643 1.475c0 .814.668 1.475 1.49 1.475H14.49q2.112 0 3.48 1.29 1.366 1.291 1.366 3.32 0 1.875-1.367 3.072-1.366 1.169-3.479 1.168H9.12c-.824 0-1.491.66-1.491 1.475s.667 1.475 1.491 1.475h5.93l5.342 8.482q.497.768 1.398.768.995 0 1.398-.768.403-.8-.155-1.69l-4.753-7.56q1.926-.861 3.044-2.52 1.119-1.69 1.119-3.902 0-2.244-1.026-3.934-.993-1.69-2.795-2.643Q16.82 0 14.49 0H2.134C1.311 0 .643.66.643 1.475"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#1D1D1D';
    const variant = this.getAttribute('variant') || 'default';
    const animate = this.getAttribute('animate') || 'none';
    const titleText = this.getAttribute('title');

    const resolvedSize = /^\d+$/.test(size) ? Number(size) : (SIZE_MAP[size] ?? 24);
    const inner = this._variants[variant] || this._variants['default'] || '';
    const titleTag = titleText ? `<title>${titleText}</title>` : '';

    let animStyle = '';
    if (animate === 'spin') animStyle = 'animation: devicon-spin 1s linear infinite;';
    else if (animate === 'pulse') animStyle = 'animation: devicon-pulse 2s ease-in-out infinite;';
    else if (animate === 'bounce') animStyle = 'animation: devicon-bounce 1s ease infinite;';

    this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${resolvedSize}" height="${resolvedSize}" viewBox="0 0 128 128" fill="${color}" style="color: ${color}; ${animStyle}" role="${titleText ? 'img' : 'presentation'}" aria-hidden="${!titleText}">${titleTag}${inner}</svg>`;
  }
}

export function registerRiveIcon(name = 'devicon-rive') {
  if (!customElements.get(name)) {
    customElements.define(name, RiveIconElement);
  }
}
