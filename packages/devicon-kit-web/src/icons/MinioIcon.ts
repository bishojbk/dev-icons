const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class MinioIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M13.207.006a2.16 2.16 0 0 0-1.62.582 2.15 2.15 0 0 0-.095 3.035l3.408 3.55a3.042 3.042 0 0 1-.663 4.688l-.463.239V7.285a15.42 15.42 0 0 0-8.018 10.487v.017l6.549-3.328v7.621L13.779 24V13.682l.897-.463a4.443 4.443 0 0 0 1.22-7.03l-3.37-3.525a.75.75 0 0 1 .037-1.055.75.75 0 0 1 1.056.038l.467.486-.006.006 4.07 4.244a.057.057 0 0 0 .082 0 .06.06 0 0 0 0-.07l-3.14-5.143-.149.143.149-.145C14.494.393 13.829.054 13.207.006m-.902 9.865v2.994l-4.152 2.149a14 14 0 0 1 2.767-3.928 14 14 0 0 1 1.385-1.215"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#C72E49';
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

export function registerMinioIcon(name = 'devicon-minio') {
  if (!customElements.get(name)) {
    customElements.define(name, MinioIconElement);
  }
}
