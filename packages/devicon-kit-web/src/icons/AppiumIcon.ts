const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class AppiumIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M11.923 0C5.937 0 .976 4.384.07 10.115a11.94 11.94 0 0 1 7.645-2.754 11.98 11.98 0 0 1 9.43 4.58 11.94 11.94 0 0 0 1.015-8.769 12 12 0 0 0-.626-1.772l-.003-.008A12 12 0 0 0 11.923 0m7.721 2.754A12 12 0 0 1 9.398 16.521a12.08 12.08 0 0 0 9.02 5.617c.24-.119.766-.51 1.224-.89A11.97 11.97 0 0 0 23.995 12a11.98 11.98 0 0 0-4.35-9.247zM9.33 7.557a12 12 0 0 0-2.647.401A11.94 11.94 0 0 0 .01 12.595l-.005.006q.032.641.131 1.275C1.037 19.61 6 24 11.991 24c1.45 0 2.887-.26 4.243-.773a12 12 0 0 1-6.905-15.67z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#EE376D';
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

export function registerAppiumIcon(name = 'devicon-appium') {
  if (!customElements.get(name)) {
    customElements.define(name, AppiumIconElement);
  }
}
