const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class HashicorpIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M10.114 4.094 4.215 7.5v13.09L.666 18.542V5.45L10.114 0zm3.772 13.37 3.549-2.049V2.05L13.885 0v10.426h-3.77v-3.89L6.562 8.585v13.357l3.551 2.054V13.599h3.772zM19.783 3.41V16.5l-5.897 3.405V24l9.448-5.45V5.458l-3.551-2.05z"/></g>`,
      'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M10.114 4.094 4.215 7.5v13.09L.666 18.542V5.45L10.114 0zm3.772 13.37 3.549-2.049V2.05L13.885 0v10.426h-3.77v-3.89L6.562 8.585v13.357l3.551 2.054V13.599h3.772zM19.783 3.41V16.5l-5.897 3.405V24l9.448-5.45V5.458l-3.551-2.05z"/></g>`,
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

export function registerHashicorpIcon(name = 'devicon-hashicorp') {
  if (!customElements.get(name)) {
    customElements.define(name, HashicorpIconElement);
  }
}
