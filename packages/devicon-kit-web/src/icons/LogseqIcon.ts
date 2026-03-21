const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class LogseqIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M19.3 9.838c-2.677-1.366-5.467-1.56-8.316-.607-1.738.58-3.197 1.58-4.267 3.088-1.031 1.452-1.45 3.071-1.184 4.837.268 1.781 1.164 3.228 2.505 4.4C9.96 23.231 12.24 23.942 15.092 24c.41-.053 1.157-.103 1.883-.255 2.004-.418 3.754-1.325 5.08-2.915 1.621-1.942 2.108-4.148 1.272-6.562-.704-2.034-2.138-3.467-4.027-4.43M7.515 6.295c.507-2.162-.88-4.664-2.988-5.37-1.106-.37-2.156-.267-3.075.492C.61 2.114.294 3.064.271 4.146c.009.135.016.285.029.435.01.102.021.205.042.305.351 1.703 1.262 2.98 2.9 3.636 1.912.766 3.808-.244 4.273-2.227m4.064-1.146c1.075.377 2.152.31 3.22-.033.94-.3 1.755-.793 2.341-1.609.803-1.117.5-2.387-.717-3.027-.6-.317-1.246-.438-1.927-.48-.47.076-.95.117-1.41.234-1.068.27-2.002.781-2.653 1.7-.495.697-.64 1.45-.174 2.227.303.504.779.799 1.32.988"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#85C8C8';
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

export function registerLogseqIcon(name = 'devicon-logseq') {
  if (!customElements.get(name)) {
    customElements.define(name, LogseqIconElement);
  }
}
