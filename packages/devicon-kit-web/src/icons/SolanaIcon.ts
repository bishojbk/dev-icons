const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class SolanaIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="m23.876 18.031-3.962 4.14a.9.9 0 0 1-.306.21.9.9 0 0 1-.367.074H.46a.47.47 0 0 1-.252-.073.45.45 0 0 1-.17-.196.44.44 0 0 1-.031-.255.44.44 0 0 1 .117-.23l3.965-4.139a.9.9 0 0 1 .305-.21.9.9 0 0 1 .366-.075h18.78a.47.47 0 0 1 .252.074.45.45 0 0 1 .17.196.44.44 0 0 1 .031.255.44.44 0 0 1-.117.23m-3.962-8.335a.9.9 0 0 0-.306-.21.9.9 0 0 0-.367-.075H.46a.47.47 0 0 0-.252.073.45.45 0 0 0-.17.197.44.44 0 0 0-.031.254.44.44 0 0 0 .117.23l3.965 4.14a.9.9 0 0 0 .305.21.9.9 0 0 0 .366.074h18.78a.47.47 0 0 0 .252-.073.45.45 0 0 0 .17-.196.44.44 0 0 0 .031-.255.44.44 0 0 0-.117-.23zM.46 6.723h18.782a.9.9 0 0 0 .367-.075.9.9 0 0 0 .306-.21l3.962-4.14a.44.44 0 0 0 .117-.23.44.44 0 0 0-.032-.254.45.45 0 0 0-.17-.196.47.47 0 0 0-.252-.073H4.76a.9.9 0 0 0-.366.074.9.9 0 0 0-.305.21L.125 5.97a.44.44 0 0 0-.117.23.44.44 0 0 0 .03.254.45.45 0 0 0 .17.196.47.47 0 0 0 .252.074z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#9945FF';
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

export function registerSolanaIcon(name = 'devicon-solana') {
  if (!customElements.get(name)) {
    customElements.define(name, SolanaIconElement);
  }
}
