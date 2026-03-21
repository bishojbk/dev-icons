const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class AdonisjsIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M0 12c0 9.68 2.32 12 12 12s12-2.32 12-12S21.68 0 12 0 0 2.32 0 12m4.84 2.492 3.762-8.555C9.238 4.498 10.46 3.716 12 3.716s2.762.781 3.398 2.223l3.762 8.554c.172.418.32.953.32 1.418 0 2.125-1.492 3.617-3.617 3.617-.726 0-1.3-.183-1.883-.37-.597-.192-1.203-.387-1.98-.387-.77 0-1.39.195-1.996.386-.59.188-1.168.371-1.867.371-2.125 0-3.617-1.492-3.617-3.617 0-.465.148-1 .32-1.418ZM12 7.43l-3.715 8.406c1.102-.512 2.371-.758 3.715-.758 1.297 0 2.613.246 3.664.758Z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#5A45FF';
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

export function registerAdonisjsIcon(name = 'devicon-adonisjs') {
  if (!customElements.get(name)) {
    customElements.define(name, AdonisjsIconElement);
  }
}
