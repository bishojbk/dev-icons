const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class AkamaiIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M13.055 0C6.384 0 .96 5.38.96 12.008S6.37 24 13.055 24c.617 0 .645-.357.086-.53-4.935-1.506-8.535-6.068-8.535-11.462 0-5.466 3.672-10.07 8.693-11.52.516-.143.373-.488-.244-.488m2.324 1.822a9.52 9.52 0 0 0-9.525 9.526c0 1.219.228 2.381.644 3.443.172.459.445.458.402.014a11 11 0 0 1-.056-.975 9.52 9.52 0 0 1 9.525-9.525c4.978 0 6.47 2.223 6.656 2.08.201-.158-1.807-4.563-7.646-4.563m.469 4.07a8.73 8.73 0 0 0-5.104 1.856c-.258.2-.157.328.145.2 2.467-1.077 5.58-1.105 8.637-.044 2.05.718 3.24 1.737 3.341 1.694.158-.072-1.191-2.223-3.644-3.141a8.8 8.8 0 0 0-3.375-.564"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#0096D6';
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

export function registerAkamaiIcon(name = 'devicon-akamai') {
  if (!customElements.get(name)) {
    customElements.define(name, AkamaiIconElement);
  }
}
