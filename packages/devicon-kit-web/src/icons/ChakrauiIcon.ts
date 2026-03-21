const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class ChakrauiIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M7.678 1.583a3.49 3.49 0 0 0-3.03 1.76L.265 10.997a2.04 2.04 0 0 0-.064 1.886l4.486 7.784a3.49 3.49 0 0 0 3.03 1.751l8.602-.01a3.5 3.5 0 0 0 3.026-1.759l4.39-7.655a2.03 2.03 0 0 0-.002-2.008L19.339 3.34a3.5 3.5 0 0 0-3.028-1.756Zm4.365 1.244V9.11c0 .32.226.595.54.656l6.089 1.187q-3.006 5.2-6.008 10.4c-.17.296-.62.176-.62-.166v-6.286a.67.67 0 0 0-.538-.656l-6.072-1.193 5.988-10.393c.168-.29.621-.178.621.168"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#1BB2A9';
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

export function registerChakrauiIcon(name = 'devicon-chakraui') {
  if (!customElements.get(name)) {
    customElements.define(name, ChakrauiIconElement);
  }
}
