const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class StarshipIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M15.521 9.62a1.057 1.057 0 1 1-2.115 0 1.057 1.057 0 0 1 2.115 0M24 12c0 6.627-5.373 12-12 12q-.525 0-1.04-.044c2.019-1.89 2.548-5.061 2.548-5.061l-3.226-1.053s-1.499 3.23-5.599 3.67A11.98 11.98 0 0 1 0 12C0 5.373 5.373 0 12 0s12 5.373 12 12M8.628 6.606c-1.23-.13-1.885-.83-2.03-2.031-.142 1.159-.77 1.88-2.032 2.031 1.168.227 1.83.918 2.031 2.032-.02-1.154.666-1.825 2.031-2.032m7.786 5.207c1.11-2.483.392-4.252-1.233-6.246-2.043 1.5-3.759 3.023-3.636 5.149-1.375.675-2.261 1.206-3.147 2.289l2.779 1.103-.368 1.267 3.637 1.062.443-1.181 2.825.651c.014-1.496-.38-3.097-1.3-4.094"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#DD0B78';
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

export function registerStarshipIcon(name = 'devicon-starship') {
  if (!customElements.get(name)) {
    customElements.define(name, StarshipIconElement);
  }
}
