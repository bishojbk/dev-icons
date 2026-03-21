const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class WasmcloudIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M21.805 5.477 12.797.215a1.59 1.59 0 0 0-1.6 0L2.19 5.477a1.41 1.41 0 0 0-.697 1.215v10.604a1.44 1.44 0 0 0 .715 1.243l9.023 5.251a1.55 1.55 0 0 0 1.558 0l8.998-5.25a1.44 1.44 0 0 0 .72-1.244V6.692a1.41 1.41 0 0 0-.702-1.215m-2.001 10.428a.28.28 0 0 1-.139.238l-7.527 4.388a.28.28 0 0 1-.282 0l-7.524-4.385a.29.29 0 0 1-.14-.257v-7.8a.28.28 0 0 1 .138-.239l2.732-1.6a.28.28 0 0 1 .279 0 .28.28 0 0 1 .14.242v7.324l2.469-1.432v-7.65a.27.27 0 0 1 .138-.241l1.781-1.04a.28.28 0 0 1 .282 0l1.794 1.042a.28.28 0 0 1 .136.241v7.642l2.455 1.43V6.484a.28.28 0 0 1 .141-.24.28.28 0 0 1 .28 0l2.731 1.603a.28.28 0 0 1 .139.239z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#00BC8E';
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

export function registerWasmcloudIcon(name = 'devicon-wasmcloud') {
  if (!customElements.get(name)) {
    customElements.define(name, WasmcloudIconElement);
  }
}
