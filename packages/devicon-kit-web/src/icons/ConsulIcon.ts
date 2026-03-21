const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class ConsulIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M14.075 12.029a2.506 2.506 0 0 0-2.506-2.507 2.506 2.506 0 0 0-2.505 2.506 2.506 2.506 0 0 0 2.506 2.506 2.506 2.506 0 0 0 2.505-2.506m3.532 0a1.156 1.156 0 0 0-1.156-1.156 1.156 1.156 0 0 0-1.156 1.156 1.156 1.156 0 0 0 1.156 1.155 1.156 1.156 0 0 0 1.156-1.155m4.792 5.51a1.158 1.156 0 0 0-1.158-1.156 1.158 1.156 0 0 0-1.158 1.156 1.158 1.156 0 0 0 1.158 1.156A1.158 1.156 0 0 0 22.4 17.54m-1.651-3.651a1.153 1.157 0 0 0-1.153-1.157 1.153 1.157 0 0 0-1.154 1.157 1.153 1.157 0 0 0 1.154 1.157 1.153 1.157 0 0 0 1.153-1.157m3.251.062a1.154 1.154 0 0 0-1.154-1.154 1.154 1.154 0 0 0-1.154 1.154 1.154 1.154 0 0 0 1.154 1.154A1.154 1.154 0 0 0 24 13.951m-3.279-3.883a1.156 1.154 0 0 0-1.156-1.154 1.156 1.154 0 0 0-1.156 1.154 1.156 1.154 0 0 0 1.156 1.153 1.156 1.154 0 0 0 1.156-1.153m3.28.045a1.161 1.157 0 0 0-1.161-1.157 1.161 1.157 0 0 0-1.162 1.157 1.161 1.157 0 0 0 1.162 1.157A1.161 1.157 0 0 0 24 10.112M22.374 6.48a1.158 1.16 0 0 0-1.157-1.16 1.158 1.16 0 0 0-1.158 1.16 1.158 1.16 0 0 0 1.158 1.16 1.158 1.16 0 0 0 1.157-1.16M11.617.383c-3.11 0-6.029 1.207-8.22 3.398A11.58 11.58 0 0 0 0 12c0 3.109 1.207 6.028 3.397 8.22a11.58 11.58 0 0 0 8.22 3.397c2.578 0 5.018-.825 7.055-2.386l-1.42-1.852a9.2 9.2 0 0 1-5.635 1.904 9.26 9.26 0 0 1-6.572-2.715A9.23 9.23 0 0 1 2.334 12c0-2.478.964-4.812 2.715-6.57a9.22 9.22 0 0 1 6.568-2.713c2.058 0 4.007.659 5.637 1.905l1.417-1.854A11.52 11.52 0 0 0 11.617.383"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#F24C53';
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

export function registerConsulIcon(name = 'devicon-consul') {
  if (!customElements.get(name)) {
    customElements.define(name, ConsulIconElement);
  }
}
