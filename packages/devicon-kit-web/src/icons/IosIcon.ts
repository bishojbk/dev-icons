const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class IosIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M1.1 6.05c-.614 0-1.1.48-1.1 1.08a1.08 1.08 0 0 0 1.1 1.08c.62 0 1.11-.48 1.11-1.08S1.72 6.05 1.1 6.05m7.61.02c-3.36 0-5.46 2.29-5.46 5.93 0 3.67 2.1 5.95 5.46 5.95 3.34 0 5.45-2.28 5.45-5.95 0-3.64-2.11-5.93-5.45-5.93m10.84 0c-2.5 0-4.28 1.38-4.28 3.43 0 1.63 1.01 2.65 3.13 3.14l1.49.36c1.45.33 2.04.81 2.04 1.64 0 .96-.97 1.64-2.35 1.64-1.41 0-2.47-.69-2.58-1.75h-2c.08 2.12 1.82 3.42 4.46 3.42 2.79 0 4.54-1.37 4.54-3.55 0-1.71-1-2.68-3.32-3.21l-1.33-.3c-1.41-.34-1.99-.79-1.99-1.55 0-.96.88-1.6 2.18-1.6 1.31 0 2.21.65 2.31 1.72h1.96c-.05-2.02-1.72-3.39-4.26-3.39M8.71 7.82c2.04 0 3.35 1.63 3.35 4.18 0 2.57-1.31 4.2-3.35 4.2-2.06 0-3.36-1.63-3.36-4.2 0-2.55 1.3-4.18 3.36-4.18M.111 9.31v8.45H2.1V9.31z"/></g>`,
      'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M1.1 6.05c-.614 0-1.1.48-1.1 1.08a1.08 1.08 0 0 0 1.1 1.08c.62 0 1.11-.48 1.11-1.08S1.72 6.05 1.1 6.05m7.61.02c-3.36 0-5.46 2.29-5.46 5.93 0 3.67 2.1 5.95 5.46 5.95 3.34 0 5.45-2.28 5.45-5.95 0-3.64-2.11-5.93-5.45-5.93m10.84 0c-2.5 0-4.28 1.38-4.28 3.43 0 1.63 1.01 2.65 3.13 3.14l1.49.36c1.45.33 2.04.81 2.04 1.64 0 .96-.97 1.64-2.35 1.64-1.41 0-2.47-.69-2.58-1.75h-2c.08 2.12 1.82 3.42 4.46 3.42 2.79 0 4.54-1.37 4.54-3.55 0-1.71-1-2.68-3.32-3.21l-1.33-.3c-1.41-.34-1.99-.79-1.99-1.55 0-.96.88-1.6 2.18-1.6 1.31 0 2.21.65 2.31 1.72h1.96c-.05-2.02-1.72-3.39-4.26-3.39M8.71 7.82c2.04 0 3.35 1.63 3.35 4.18 0 2.57-1.31 4.2-3.35 4.2-2.06 0-3.36-1.63-3.36-4.2 0-2.55 1.3-4.18 3.36-4.18M.111 9.31v8.45H2.1V9.31z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#000000';
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

export function registerIosIcon(name = 'devicon-ios') {
  if (!customElements.get(name)) {
    customElements.define(name, IosIconElement);
  }
}
