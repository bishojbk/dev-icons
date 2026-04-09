const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class OvhIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="m19.881 10.095 2.563-4.45A11.93 11.93 0 0 1 24 11.555c0 2.88-1.017 5.523-2.71 7.594h-6.62l2.04-3.541h-2.696l3.176-5.513zm-2.32-5.243L9.333 19.14l.003.009H2.709A11.95 11.95 0 0 1 0 11.555c0-2.152.57-4.17 1.561-5.918L5.855 13.1 10.6 4.852z"/></g>`,
      'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="m19.881 10.095 2.563-4.45A11.93 11.93 0 0 1 24 11.555c0 2.88-1.017 5.523-2.71 7.594h-6.62l2.04-3.541h-2.696l3.176-5.513zm-2.32-5.243L9.333 19.14l.003.009H2.709A11.95 11.95 0 0 1 0 11.555c0-2.152.57-4.17 1.561-5.918L5.855 13.1 10.6 4.852z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#123F6D';
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

export function registerOvhIcon(name = 'devicon-ovh') {
  if (!customElements.get(name)) {
    customElements.define(name, OvhIconElement);
  }
}
