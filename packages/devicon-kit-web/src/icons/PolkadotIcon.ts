const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class PolkadotIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M12 0c2.39 0 4.328 1.127 4.328 2.517S14.39 5.034 12 5.034 7.672 3.907 7.672 2.517 9.61 0 12 0m0 18.966c2.39 0 4.328 1.127 4.328 2.517S14.39 24 12 24s-4.328-1.127-4.328-2.517S9.61 18.966 12 18.966M1.606 6C2.8 3.93 4.747 2.816 5.952 3.511s1.212 2.937.017 5.007-3.141 3.182-4.345 2.489S.411 8.07 1.606 6m16.427 9.483c1.2-2.07 3.139-3.184 4.343-2.489s1.211 2.936.016 5.006-3.14 3.185-4.344 2.49-1.211-2.937-.015-5.007m-16.409-2.49c1.205-.7 3.15.419 4.346 2.489s1.187 4.311-.018 5.007S2.8 20.07 1.607 18s-1.187-4.311.017-5.007m16.425-9.481c1.2-.695 3.149.419 4.344 2.489s1.188 4.311-.016 5.007-3.148-.42-4.343-2.49-1.188-4.311.015-5.006"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#E6007A';
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

export function registerPolkadotIcon(name = 'devicon-polkadot') {
  if (!customElements.get(name)) {
    customElements.define(name, PolkadotIconElement);
  }
}
