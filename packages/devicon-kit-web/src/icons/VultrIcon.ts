const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class VultrIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M8.36 2.172A1.2 1.2 0 0 0 7.348 1.6H1.2A1.2 1.2 0 0 0 0 2.8a1.2 1.2 0 0 0 .182.64l11.6 18.4a1.206 1.206 0 0 0 2.035 0l3.075-4.874a1.23 1.23 0 0 0 .182-.64 1.2 1.2 0 0 0-.182-.642zm10.349 8.68a1.206 1.206 0 0 0 2.035 0L21.8 9.178l2.017-3.2a1.2 1.2 0 0 0 .183-.64 1.23 1.23 0 0 0-.183-.64l-1.6-2.526a1.2 1.2 0 0 0-1.016-.571h-6.148a1.2 1.2 0 0 0-1.201 1.2 1.14 1.14 0 0 0 .188.64z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#007BFC';
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

export function registerVultrIcon(name = 'devicon-vultr') {
  if (!customElements.get(name)) {
    customElements.define(name, VultrIconElement);
  }
}
