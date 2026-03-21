const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class AntdesignIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M17.451 6.68c.51-.506.51-1.33 0-1.837L15.578 2.97l.003.002-2.554-2.55a1.463 1.463 0 0 0-2.05.013L.427 10.98a1.443 1.443 0 0 0 0 2.047l10.549 10.54a1.45 1.45 0 0 0 2.05 0l4.423-4.42a1.297 1.297 0 0 0 0-1.838 1.305 1.305 0 0 0-1.84 0l-3.35 3.354a.346.346 0 0 1-.495 0l-8.427-8.419a.346.346 0 0 1 0-.495l8.424-8.42.035-.029a.34.34 0 0 1 .46.03l3.354 3.35a1.3 1.3 0 0 0 1.841 0m-8.244 5.376a2.848 2.846 0 1 0 5.696 0 2.848 2.846 0 1 0-5.696 0m14.367-1.034L20.28 7.743a1.303 1.303 0 0 0-1.841.003 1.297 1.297 0 0 0 0 1.838l2.224 2.222c.14.139.14.356 0 .495l-2.192 2.19a1.297 1.297 0 0 0 0 1.837 1.305 1.305 0 0 0 1.84 0l3.264-3.26a1.445 1.445 0 0 0-.002-2.047"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#0170FE';
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

export function registerAntdesignIcon(name = 'devicon-antdesign') {
  if (!customElements.get(name)) {
    customElements.define(name, AntdesignIconElement);
  }
}
