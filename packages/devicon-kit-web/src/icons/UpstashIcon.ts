const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class UpstashIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M13.803 0c-2.61 0-5.22.995-7.211 2.986-3.982 3.983-3.982 10.44 0 14.422a5.1 5.1 0 0 0 7.21-7.21L12 12a2.55 2.55 0 0 1-3.605 3.605A7.649 7.649 0 0 1 19.21 4.79l1.803-1.803A10.17 10.17 0 0 0 13.803 0M12 12a2.55 2.55 0 0 1 3.605-3.605A7.649 7.649 0 0 1 4.79 19.21l-1.803 1.803c3.983 3.982 10.44 3.982 14.422 0s3.982-10.44 0-14.422A5.08 5.08 0 0 0 13.803 5.1a5.1 5.1 0 0 0-3.605 8.703z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#00E9A3';
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

export function registerUpstashIcon(name = 'devicon-upstash') {
  if (!customElements.get(name)) {
    customElements.define(name, UpstashIconElement);
  }
}
