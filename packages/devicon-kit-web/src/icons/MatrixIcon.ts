const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class MatrixIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M.632.55v22.9H2.28V24H0V0h2.28v.55zm7.043 7.26v1.157h.033a3.3 3.3 0 0 1 1.117-1.024c.433-.245.936-.365 1.5-.365q.81.002 1.481.314c.448.208.785.582 1.02 1.108q.382-.562 1.034-.992.651-.43 1.546-.43.679 0 1.26.167c.388.11.716.286.993.53.276.245.489.559.646.951q.229.587.23 1.417v5.728h-2.349V11.52q0-.43-.032-.812a1.8 1.8 0 0 0-.18-.66 1.1 1.1 0 0 0-.438-.448q-.292-.165-.785-.166-.498 0-.803.189a1.4 1.4 0 0 0-.48.499 2 2 0 0 0-.231.696 6 6 0 0 0-.06.785v4.768h-2.35v-4.8q.002-.38-.018-.752a2.1 2.1 0 0 0-.143-.688 1.05 1.05 0 0 0-.415-.503c-.194-.125-.476-.19-.854-.19q-.168 0-.439.074c-.18.051-.36.143-.53.282a1.64 1.64 0 0 0-.439.595q-.18.39-.18 1.02v4.966H5.46V7.81zm15.693 15.64V.55H21.72V0H24v24h-2.28v-.55z"/></g>`,
      'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M.632.55v22.9H2.28V24H0V0h2.28v.55zm7.043 7.26v1.157h.033a3.3 3.3 0 0 1 1.117-1.024c.433-.245.936-.365 1.5-.365q.81.002 1.481.314c.448.208.785.582 1.02 1.108q.382-.562 1.034-.992.651-.43 1.546-.43.679 0 1.26.167c.388.11.716.286.993.53.276.245.489.559.646.951q.229.587.23 1.417v5.728h-2.349V11.52q0-.43-.032-.812a1.8 1.8 0 0 0-.18-.66 1.1 1.1 0 0 0-.438-.448q-.292-.165-.785-.166-.498 0-.803.189a1.4 1.4 0 0 0-.48.499 2 2 0 0 0-.231.696 6 6 0 0 0-.06.785v4.768h-2.35v-4.8q.002-.38-.018-.752a2.1 2.1 0 0 0-.143-.688 1.05 1.05 0 0 0-.415-.503c-.194-.125-.476-.19-.854-.19q-.168 0-.439.074c-.18.051-.36.143-.53.282a1.64 1.64 0 0 0-.439.595q-.18.39-.18 1.02v4.966H5.46V7.81zm15.693 15.64V.55H21.72V0H24v24h-2.28v-.55z"/></g>`,
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

export function registerMatrixIcon(name = 'devicon-matrix') {
  if (!customElements.get(name)) {
    customElements.define(name, MatrixIconElement);
  }
}
