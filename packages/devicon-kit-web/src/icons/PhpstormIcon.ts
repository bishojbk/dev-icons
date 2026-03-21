const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class PhpstormIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M7.833 6.611v-.055c0-1-.667-1.5-1.778-1.5H4.389v3.056h1.722c1.111-.001 1.722-.668 1.722-1.501M0 0v24h24V0zm2.167 3.111h4.056c2.389 0 3.833 1.389 3.833 3.445v.055c0 2.333-1.778 3.5-4.056 3.5H4.333v3H2.167zM11.278 21h-9v-1.5h9zM18.5 10.222c0 2-1.5 3.111-3.667 3.111-1.5-.056-3-.611-4.222-1.667l1.278-1.556c.89.722 1.833 1.222 3 1.222.889 0 1.444-.333 1.444-.944v-.056c0-.555-.333-.833-2-1.277C12.333 8.555 11 8 11 6v-.056c0-1.833 1.444-3 3.5-3 1.444 0 2.723.444 3.723 1.278l-1.167 1.667c-.889-.611-1.777-1-2.611-1-.833 0-1.278.389-1.278.889v.056c0 .667.445.889 2.167 1.333 2 .556 3.167 1.278 3.167 3z"/></g>`,
      'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M7.833 6.611v-.055c0-1-.667-1.5-1.778-1.5H4.389v3.056h1.722c1.111-.001 1.722-.668 1.722-1.501M0 0v24h24V0zm2.167 3.111h4.056c2.389 0 3.833 1.389 3.833 3.445v.055c0 2.333-1.778 3.5-4.056 3.5H4.333v3H2.167zM11.278 21h-9v-1.5h9zM18.5 10.222c0 2-1.5 3.111-3.667 3.111-1.5-.056-3-.611-4.222-1.667l1.278-1.556c.89.722 1.833 1.222 3 1.222.889 0 1.444-.333 1.444-.944v-.056c0-.555-.333-.833-2-1.277C12.333 8.555 11 8 11 6v-.056c0-1.833 1.444-3 3.5-3 1.444 0 2.723.444 3.723 1.278l-1.167 1.667c-.889-.611-1.777-1-2.611-1-.833 0-1.278.389-1.278.889v.056c0 .667.445.889 2.167 1.333 2 .556 3.167 1.278 3.167 3z"/></g>`,
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

export function registerPhpstormIcon(name = 'devicon-phpstorm') {
  if (!customElements.get(name)) {
    customElements.define(name, PhpstormIconElement);
  }
}
