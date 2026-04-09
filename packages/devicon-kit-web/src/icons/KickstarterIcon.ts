const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class KickstarterIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M7.168 0c-3.2 0-5.797 2.579-5.797 5.758v12.484C1.371 21.42 3.968 24 7.168 24a5.8 5.8 0 0 0 4.768-2.479l.794.79c2.26 2.245 5.943 2.245 8.203 0a5.72 5.72 0 0 0 1.696-4.075 5.72 5.72 0 0 0-1.696-4.074l-2.182-2.168 2.182-2.156a5.72 5.72 0 0 0 1.696-4.074 5.72 5.72 0 0 0-1.696-4.074c-2.26-2.246-5.942-2.246-8.203 0l-.794.789A5.8 5.8 0 0 0 7.168 0"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#05CE78';
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

export function registerKickstarterIcon(name = 'devicon-kickstarter') {
  if (!customElements.get(name)) {
    customElements.define(name, KickstarterIconElement);
  }
}
