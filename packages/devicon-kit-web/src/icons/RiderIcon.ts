const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class RiderIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M0 0v24h24V0zm7.031 3.113A4.06 4.06 0 0 1 9.72 4.14a3.23 3.23 0 0 1 .84 2.28A3.16 3.16 0 0 1 8.4 9.54l2.46 3.6H8.28L6.12 9.9H4.38v3.24H2.16V3.12c1.61-.004 3.281.009 4.871-.007m5.509.007h3.96c3.18 0 5.34 2.16 5.34 5.04 0 2.82-2.16 5.04-5.34 5.04h-3.96zm4.069 1.976c-.607.01-1.235.004-1.849.004v6.06h1.74a2.88 2.88 0 0 0 3.06-3 2.897 2.897 0 0 0-2.951-3.064M4.319 5.1v2.88H6.6c1.08 0 1.68-.6 1.68-1.44 0-.96-.66-1.44-1.74-1.44zM2.16 19.5h9V21h-9Z"/></g>`,
      'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M0 0v24h24V0zm7.031 3.113A4.06 4.06 0 0 1 9.72 4.14a3.23 3.23 0 0 1 .84 2.28A3.16 3.16 0 0 1 8.4 9.54l2.46 3.6H8.28L6.12 9.9H4.38v3.24H2.16V3.12c1.61-.004 3.281.009 4.871-.007m5.509.007h3.96c3.18 0 5.34 2.16 5.34 5.04 0 2.82-2.16 5.04-5.34 5.04h-3.96zm4.069 1.976c-.607.01-1.235.004-1.849.004v6.06h1.74a2.88 2.88 0 0 0 3.06-3 2.897 2.897 0 0 0-2.951-3.064M4.319 5.1v2.88H6.6c1.08 0 1.68-.6 1.68-1.44 0-.96-.66-1.44-1.74-1.44zM2.16 19.5h9V21h-9Z"/></g>`,
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

export function registerRiderIcon(name = 'devicon-rider') {
  if (!customElements.get(name)) {
    customElements.define(name, RiderIconElement);
  }
}
