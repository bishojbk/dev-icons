const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class CiliumIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M13.607 14.583h-3.215l-1.626-2.764 1.626-2.802h3.215l1.626 2.802zM14.186 8H9.799l-2.2 3.813 2.2 3.787h4.387l2.213-3.787zm-4.387 8.4-2.2 3.813L9.799 24h4.387l2.213-3.787-2.213-3.813zm-1.034 3.819 1.627-2.802h3.215l1.626 2.802-1.626 2.765h-3.215zM9.799 0l-2.2 3.813 2.2 3.787h4.387l2.213-3.787L14.186 0zM8.765 3.819l1.627-2.802h3.215l1.626 2.802-1.626 2.764h-3.215zm8.234 8.581-2.2 3.813 2.2 3.787h4.388l2.213-3.787-2.213-3.813zm-1.034 3.819 1.627-2.802h3.215l1.626 2.802-1.626 2.765h-3.215zM16.999 4l-2.2 3.813 2.2 3.787h4.388L23.6 7.813 21.387 4zm-1.034 3.819 1.627-2.802h3.215l1.626 2.802-1.626 2.764h-3.215zM2.599 12.4l-2.2 3.813L2.599 20h4.387l2.213-3.787L6.986 12.4zm-1.034 3.819 1.627-2.802h3.214l1.627 2.802-1.627 2.765H3.192zM2.599 4l-2.2 3.813 2.2 3.787h4.387l2.213-3.787L6.986 4zM1.565 7.819l1.627-2.802h3.214l1.627 2.802-1.627 2.764H3.192z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#F8C517';
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

export function registerCiliumIcon(name = 'devicon-cilium') {
  if (!customElements.get(name)) {
    customElements.define(name, CiliumIconElement);
  }
}
