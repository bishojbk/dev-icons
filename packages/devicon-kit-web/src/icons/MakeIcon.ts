const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class MakeIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M13.38 3.498c-.27 0-.511.19-.566.465L9.85 18.986a.58.58 0 0 0 .453.678l4.095.826a.58.58 0 0 0 .682-.455l2.963-15.021a.58.58 0 0 0-.453-.678l-4.096-.826a.6.6 0 0 0-.113-.012zm-5.876.098a.58.58 0 0 0-.516.318L.062 17.697a.575.575 0 0 0 .256.774l3.733 1.877a.58.58 0 0 0 .775-.258l6.926-13.781a.577.577 0 0 0-.256-.776L7.762 3.658a.6.6 0 0 0-.258-.062m11.74.115a.576.576 0 0 0-.576.576v15.426c0 .318.258.578.576.578h4.178a.58.58 0 0 0 .578-.578V4.287a.58.58 0 0 0-.578-.576Z"/></g>`,
      'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M13.38 3.498c-.27 0-.511.19-.566.465L9.85 18.986a.58.58 0 0 0 .453.678l4.095.826a.58.58 0 0 0 .682-.455l2.963-15.021a.58.58 0 0 0-.453-.678l-4.096-.826a.6.6 0 0 0-.113-.012zm-5.876.098a.58.58 0 0 0-.516.318L.062 17.697a.575.575 0 0 0 .256.774l3.733 1.877a.58.58 0 0 0 .775-.258l6.926-13.781a.577.577 0 0 0-.256-.776L7.762 3.658a.6.6 0 0 0-.258-.062m11.74.115a.576.576 0 0 0-.576.576v15.426c0 .318.258.578.576.578h4.178a.58.58 0 0 0 .578-.578V4.287a.58.58 0 0 0-.578-.576Z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#6D00CC';
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

export function registerMakeIcon(name = 'devicon-make') {
  if (!customElements.get(name)) {
    customElements.define(name, MakeIconElement);
  }
}
