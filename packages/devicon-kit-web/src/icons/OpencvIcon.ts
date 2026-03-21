const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class OpencvIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M11.9.853a5.73 5.73 0 0 0-2.91 10.665l1.641-2.785a.154.154 0 0 0-.05-.204 2.35 2.35 0 1 1 2.635 0 .154.154 0 0 0-.049.204l1.642 2.785A5.73 5.73 0 0 0 11.899.852M5.73 11.689a5.73 5.73 0 1 0 0 11.458c3.179 0 5.807-2.699 5.727-5.876H8.23a.155.155 0 0 0-.152.157c-.008 1.266-1.064 2.34-2.35 2.34a2.35 2.35 0 1 1 .955-4.498.154.154 0 0 0 .196-.06l1.646-2.793a5.7 5.7 0 0 0-2.797-.728m15.442.761-1.637 2.788a.154.154 0 0 0 .05.205 2.35 2.35 0 0 1-1.31 4.3 2.35 2.35 0 0 1-1.325-4.295.154.154 0 0 0 .049-.205l-1.646-2.782a5.73 5.73 0 1 0 5.82-.01"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#5C3EE8';
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

export function registerOpencvIcon(name = 'devicon-opencv') {
  if (!customElements.get(name)) {
    customElements.define(name, OpencvIconElement);
  }
}
