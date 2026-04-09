const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class HackeroneIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M7.207 0q-.725.002-1.182.3c-.305.2-.46.463-.46.78v21.809q0 .414.476.76.472.351 1.166.351.663 0 1.168-.35.504-.346.506-.761V1.082c0-.32-.163-.577-.49-.782Q7.901.002 7.207 0m9.523 8.662q-.724-.001-1.168.3l-4.439 2.783c-.199.186-.284.469-.247.855q.052.575.524 1.09c.314.347.666.563 1.068.655q.596.134.896-.143l1.755-1.095v9.782q0 .414.461.76c.3.234.687.351 1.15.351q.695 0 1.199-.35c.337-.233.506-.484.506-.761V9.739q-.001-.48-.49-.776-.488-.303-1.215-.301"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#494649';
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

export function registerHackeroneIcon(name = 'devicon-hackerone') {
  if (!customElements.get(name)) {
    customElements.define(name, HackeroneIconElement);
  }
}
