const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class DatagripIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M0 0v24h24V0Zm17.18 2.948a5.45 5.45 0 0 1 3.904 1.364l-1.376 1.66a3.67 3.67 0 0 0-2.596-1.009c-1.6 0-2.856 1.408-2.856 3.096v.029c0 1.816 1.252 3.152 3.012 3.152a3.5 3.5 0 0 0 2.064-.592V9.223h-2.2V7.336h4.316v4.316a6.44 6.44 0 0 1-4.244 1.575c-3.096 0-5.224-2.18-5.224-5.111v-.028a5.1 5.1 0 0 1 5.2-5.14M2.436 3.12h3.876c3.12 0 5.28 2.143 5.28 4.94v.027c0 2.8-2.16 4.968-5.28 4.968H2.436ZM6.51 5.088a3 3 0 0 0-.2.003H4.62v6h1.69a2.83 2.83 0 0 0 2.993-2.967v-.037A2.85 2.85 0 0 0 6.51 5.088M2.208 19.495h9v1.5h-9z"/></g>`,
      'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M0 0v24h24V0Zm17.18 2.948a5.45 5.45 0 0 1 3.904 1.364l-1.376 1.66a3.67 3.67 0 0 0-2.596-1.009c-1.6 0-2.856 1.408-2.856 3.096v.029c0 1.816 1.252 3.152 3.012 3.152a3.5 3.5 0 0 0 2.064-.592V9.223h-2.2V7.336h4.316v4.316a6.44 6.44 0 0 1-4.244 1.575c-3.096 0-5.224-2.18-5.224-5.111v-.028a5.1 5.1 0 0 1 5.2-5.14M2.436 3.12h3.876c3.12 0 5.28 2.143 5.28 4.94v.027c0 2.8-2.16 4.968-5.28 4.968H2.436ZM6.51 5.088a3 3 0 0 0-.2.003H4.62v6h1.69a2.83 2.83 0 0 0 2.993-2.967v-.037A2.85 2.85 0 0 0 6.51 5.088M2.208 19.495h9v1.5h-9z"/></g>`,
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

export function registerDatagripIcon(name = 'devicon-datagrip') {
  if (!customElements.get(name)) {
    customElements.define(name, DatagripIconElement);
  }
}
