const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class TailscaleIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M24 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0m0-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0m6-6a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M3 24a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m18 .5a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M6 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0m9-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-3 2.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0M3 5.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/></g>`,
      'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M24 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0m0-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0m6-6a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M3 24a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m18 .5a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0-.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M6 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0m9-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-3 2.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0M3 5.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#242424';
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

export function registerTailscaleIcon(name = 'devicon-tailscale') {
  if (!customElements.get(name)) {
    customElements.define(name, TailscaleIconElement);
  }
}
