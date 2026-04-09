const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class MintlifyIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M15.158.002a8.8 8.8 0 0 0-6.249 2.59l-.062.063h-.003L2.655 8.844l-.062.058a8.84 8.84 0 0 0-.83 11.55l6.251-6.249.065-.063a8.78 8.78 0 0 1-1.758-5.385 8.8 8.8 0 0 1 .283-2.151 9 9 0 0 1 2.151-.286 8.8 8.8 0 0 1 5.386 1.76 8.8 8.8 0 0 1 3.032 4.11 8.9 8.9 0 0 1 .225 5.21 9 9 0 0 0-.341.082 8.85 8.85 0 0 1-4.868-.303 8.7 8.7 0 0 1-2.323-1.25l-.064.065L3.55 22.24a8.85 8.85 0 0 0 11.548-.83l.06-.062 6.19-6.187a9 9 0 0 1-.367.337q.188-.165.366-.341l.063-.058A8.82 8.82 0 0 0 24 8.844V.002Zm3.289 17.05"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#18E299';
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

export function registerMintlifyIcon(name = 'devicon-mintlify') {
  if (!customElements.get(name)) {
    customElements.define(name, MintlifyIconElement);
  }
}
