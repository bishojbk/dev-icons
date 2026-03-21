const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class K6IconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M24 23.646H0L7.99 6.603l4.813 3.538L19.08.354Zm-8.8-3.681h.052a2.3 2.3 0 0 0 1.593-.64 2.1 2.1 0 0 0 .685-1.576 1.91 1.91 0 0 0-.66-1.511 2 2 0 0 0-1.37-.59h-.04a.7.7 0 0 0-.199.027l1.267-1.883-1.01-.705-.477.705-1.22 1.864c-.21.31-.386.582-.495.77q-.169.301-.29.625a1.9 1.9 0 0 0-.138.719 2.1 2.1 0 0 0 .676 1.558c.422.411.989.641 1.578.64Zm-5.365-2.027 1.398 1.978h1.496l-1.645-2.295 1.46-2.029-.97-.671-.427.565-1.314 1.853v-3.725l-1.31-1.068v7.37h1.31v-1.98Zm5.367.792a.963.963 0 1 1 0-1.927h.009a.94.94 0 0 1 .679.29.9.9 0 0 1 .29.668.98.98 0 0 1-.977.967Z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#7D64FF';
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

export function registerK6Icon(name = 'devicon-k6') {
  if (!customElements.get(name)) {
    customElements.define(name, K6IconElement);
  }
}
