const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class NimIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M12.095 3.2s-.92.778-1.857 1.55c-.964-.032-2.856.199-3.88.598C5.412 4.708 4.582 4 4.582 4s-.709 1.305-1.154 2.07c-.662.377-1.325.8-1.917 1.36A82 82 0 0 1 0 6.77c.911 1.967 1.524 3.936 3.19 5.12 2.654-4.483 14.983-4.07 17.691-.025 1.75-.977 2.43-3.078 3.119-5.018-.075.026-1.012.362-1.619.61-.363-.423-1.217-1.072-1.702-1.385a96 96 0 0 0-1.131-2.122s-.794.632-1.715 1.322c-1.243-.246-2.747-.544-4.012-.47A53 53 0 0 1 12.095 3.2M.942 10.95l2.189 5.67c3.801 5.367 13.508 5.74 17.74.105 1.001-2.415 2.352-5.808 2.352-5.808-1.086 1.72-2.852 2.909-3.94 3.549-.774.453-2.558.727-2.558.727l-4.684-2.597-4.71 2.545s-1.761-.303-2.558-.701c-1.608-.92-2.69-2.004-3.83-3.49z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#FFE953';
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

export function registerNimIcon(name = 'devicon-nim') {
  if (!customElements.get(name)) {
    customElements.define(name, NimIconElement);
  }
}
