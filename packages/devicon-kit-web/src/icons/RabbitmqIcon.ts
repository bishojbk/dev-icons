const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class RabbitmqIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M23.035 9.601h-7.677a.956.956 0 0 1-.962-.962V.962a.956.956 0 0 0-.962-.956H10.56a.956.956 0 0 0-.962.956V8.64a.956.956 0 0 1-.962.962H5.762a.956.956 0 0 1-.961-.962V.962A.956.956 0 0 0 3.839 0H.959a.956.956 0 0 0-.956.962v22.076A.956.956 0 0 0 .965 24h22.07a.956.956 0 0 0 .962-.962V10.58a.956.956 0 0 0-.962-.98zm-3.86 8.152a1.437 1.437 0 0 1-1.437 1.443h-1.924a1.437 1.437 0 0 1-1.436-1.443v-1.917a1.437 1.437 0 0 1 1.436-1.443h1.924a1.437 1.437 0 0 1 1.437 1.443z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#FF6600';
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

export function registerRabbitmqIcon(name = 'devicon-rabbitmq') {
  if (!customElements.get(name)) {
    customElements.define(name, RabbitmqIconElement);
  }
}
