const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class SaucelabsIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M23.434 7.344a3.02 3.02 0 0 0-2.435-1.22h-7l-2 5.876h4.838l-2 5.876H10L8 23.75h9c1.291 0 2.438-.809 2.847-2.009l3.999-11.75a2.89 2.89 0 0 0-.412-2.647M10 11.999H7.162l2-5.876h4.837L16 .25H7c-1.291 0-2.438.809-2.847 2.009L.154 14.008a2.89 2.89 0 0 0 .412 2.647 3.02 3.02 0 0 0 2.435 1.22h7l2-5.876z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#3DDC91';
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

export function registerSaucelabsIcon(name = 'devicon-saucelabs') {
  if (!customElements.get(name)) {
    customElements.define(name, SaucelabsIconElement);
  }
}
