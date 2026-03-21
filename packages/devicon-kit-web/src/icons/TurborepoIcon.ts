const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class TurborepoIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M11.99 4.196c-4.3 0-7.797 3.5-7.797 7.804s3.498 7.804 7.798 7.804 7.798-3.5 7.798-7.804-3.498-7.804-7.798-7.804m0 11.843A4.037 4.037 0 0 1 7.955 12a4.037 4.037 0 1 1 8.071 0 4.037 4.037 0 0 1-4.035 4.039m.653-13.125V0C18.973.339 24 5.582 24 12s-5.027 11.66-11.356 12v-2.914c4.717-.337 8.452-4.281 8.452-9.086s-3.735-8.749-8.452-9.086M5.113 17.959a9.08 9.08 0 0 1-2.2-5.305H0a11.97 11.97 0 0 0 3.051 7.367l2.06-2.062zM11.337 24v-2.914a9.05 9.05 0 0 1-5.302-2.202l-2.06 2.063A11.95 11.95 0 0 0 11.335 24z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#FF1E56';
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

export function registerTurborepoIcon(name = 'devicon-turborepo') {
  if (!customElements.get(name)) {
    customElements.define(name, TurborepoIconElement);
  }
}
