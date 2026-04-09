const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class HugoIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M11.754 0a4 4 0 0 0-2.049.596L3.33 4.532a4.25 4.25 0 0 0-2.017 3.615v8.03a4.13 4.13 0 0 0 2.067 3.574l6.486 3.733a3.88 3.88 0 0 0 3.835.018l7.043-3.966a3.82 3.82 0 0 0 1.943-3.323V7.752a3.57 3.57 0 0 0-1.774-3.084L13.817.541a4 4 0 0 0-2.063-.54zm.022 1.674c.413-.006.828.1 1.2.315l7.095 4.127c.584.34.941.96.94 1.635v8.462c0 .774-.414 1.484-1.089 1.864l-7.042 3.966a2.2 2.2 0 0 1-2.179-.01l-6.485-3.734a2.45 2.45 0 0 1-1.228-2.123v-8.03c0-.893.461-1.72 1.221-2.19l6.376-3.935a2.3 2.3 0 0 1 1.19-.347zm-4.7 3.844V18.37h2.69v-5.62h4.46v5.62h2.696V5.518h-2.696v4.681h-4.46V5.518Z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#FF4088';
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

export function registerHugoIcon(name = 'devicon-hugo') {
  if (!customElements.get(name)) {
    customElements.define(name, HugoIconElement);
  }
}
