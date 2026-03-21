const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class Web3dotjsIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M.889.775S0 1.29 0 2.315V7.44s0 3.079 2.666 4.618c.817.472 1.384.508 1.777.334.394.628.96 1.246 1.778 1.718 2.666 1.54 2.668-1.539 2.668-1.539V7.447c0-1.027.888-1.539.888-1.539l3.557-2.054s.89-.514 1.777 0c.89.513 0 1.027 0 1.027L11.56 6.934l1.775 1.025 3.559-2.055c.052-.03.912-.495 1.773.002.89.514 0 1.026 0 1.026l-3.555 2.054s-.888.514-.888 1.54v5.124s0 1.028-.889.514c-.89-.513-.89-1.539-.89-1.539l-1.778-1.027s.001 3.08 2.668 4.619 2.666-1.54 2.666-1.54v-5.126c0-1.026.889-1.537.889-1.537l4.445-2.569s1.776-1.025-.889-2.564c-.819-.474-1.552-.704-2.177-.797-.164-.357-.565-.776-1.377-1.24-2.667-1.523-5.332-.016-5.332-.016L8.004 4.881s-.89.514-.89 1.539v5.125s0 1.027-.89.514c-.889-.514-.89-1.54-.89-1.54V5.396q0-.096.01-.188c.097-.902.879-1.353.879-1.353L4.445 2.828l-.004.002c-.052.03-.884.544-.884 1.537v5.125s-.002 1.027-.891.514c-.89-.514-.889-1.54-.889-1.54V3.343c0-1.026.889-1.54.889-1.54L.889.776zm9.78 8.735v2.053l1.778 1.025v-2.053zm8.442 2.183c-.666.005-1.332.389-1.332 1.909 0 3.039 2.666 4.619 2.666 4.619l.889.513s.89.514.89 1.54-.89.513-.89.513l-3.555-2.053v2.053l3.555 2.053S24 24.379 24 21.3c0-3.077-1.777-4.105-1.777-4.105l-1.778-1.025s-.888-.514-.888-1.54c0-1.028.888-.515.888-.515L24 16.168v-2.053l-3.555-2.05s-.667-.376-1.334-.372"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#F16822';
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

export function registerWeb3dotjsIcon(name = 'devicon-web3dotjs') {
  if (!customElements.get(name)) {
    customElements.define(name, Web3dotjsIconElement);
  }
}
