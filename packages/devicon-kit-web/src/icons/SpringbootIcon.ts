const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class SpringbootIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="m23.693 10.706-4.73-8.185c-.41-.71-1.417-1.294-2.24-1.294h-9.45c-.82 0-1.831.584-2.24 1.294L.306 10.706c-.41.71-.41 1.873 0 2.584l4.725 8.189c.41.71 1.417 1.294 2.24 1.294h9.455c.82 0 1.826-.584 2.24-1.294l4.726-8.19c.41-.71.41-1.873 0-2.583zM10.976 5.755c0-.537.438-.975.974-.975s.975.438.975.975v5.821a.976.976 0 0 1-1.948 0zm.974 12.43a6.616 6.616 0 0 1-6.607-6.609A6.64 6.64 0 0 1 8.01 6.272a.866.866 0 0 1 1.214.18.866.866 0 0 1-.178 1.213 4.876 4.876 0 0 0 5.812 7.827 4.88 4.88 0 0 0 1.967-3.916 4.9 4.9 0 0 0-1.986-3.925.87.87 0 0 1-.183-1.214.87.87 0 0 1 1.214-.183 6.63 6.63 0 0 1 2.687 5.322 6.613 6.613 0 0 1-6.608 6.608"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#6DB33F';
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

export function registerSpringbootIcon(name = 'devicon-springboot') {
  if (!customElements.get(name)) {
    customElements.define(name, SpringbootIconElement);
  }
}
