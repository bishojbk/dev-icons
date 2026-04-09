const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class PerplexityIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M22.398 7.09h-2.31V.068l-7.51 6.354V.158h-1.156v6.196L4.49 0v7.09H1.602v10.397H4.49V24l6.933-6.36v6.201h1.155v-6.047l6.932 6.181v-6.488h2.888zm-3.466-4.531v4.53h-5.355zm-13.286.067 4.869 4.464h-4.87zM2.758 16.332V8.245h7.847L4.49 14.36v1.972zm2.888 5.04v-6.534l5.776-5.776v7.011zm12.708.025-5.776-5.15V9.061l5.776 5.776zm2.889-5.065H19.51V14.36l-6.115-6.115h7.848z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#1FB8CD';
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

export function registerPerplexityIcon(name = 'devicon-perplexity') {
  if (!customElements.get(name)) {
    customElements.define(name, PerplexityIconElement);
  }
}
