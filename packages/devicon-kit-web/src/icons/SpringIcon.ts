const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class SpringIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M21.854 1.416a10.5 10.5 0 0 1-1.284 2.247A11.967 11.967 0 1 0 3.852 20.776l.444.395a11.954 11.954 0 0 0 19.632-8.297c.346-3.013-.568-6.865-2.074-11.458M5.58 20.875a1.017 1.017 0 1 1-.149-1.433 1.04 1.04 0 0 1 .149 1.432m16.199-3.581c-2.939 3.926-9.26 2.593-13.286 2.79 0 0-.716.05-1.432.148 0 0 .272-.123.618-.247 2.84-.987 4.173-1.185 5.901-2.074 3.235-1.654 6.47-5.284 7.112-9.038-1.235 3.606-4.988 6.717-8.396 7.976-2.346.865-6.568 1.704-6.568 1.704l-.173-.099c-2.865-1.407-2.963-7.63 2.272-9.63 2.296-.89 4.47-.395 6.963-.988 2.643-.617 5.705-2.593 6.94-5.186 1.382 4.174 3.061 10.643.049 14.644"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#6DB33F';
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

export function registerSpringIcon(name = 'devicon-spring') {
  if (!customElements.get(name)) {
    customElements.define(name, SpringIconElement);
  }
}
