const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class ElementIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m-1.314 4.715c3.289 0 5.956 2.66 5.956 5.943a.879.879 0 0 1-1.758 0 4.194 4.194 0 0 0-4.198-4.189.878.878 0 1 1 0-1.754m-5.092 9.504a.88.88 0 0 1-.879-.877 5.95 5.95 0 0 1 5.956-5.945.878.878 0 1 1 0 1.753 4.195 4.195 0 0 0-4.198 4.191.88.88 0 0 1-.879.878m7.735 5.067c-3.29 0-5.957-2.662-5.957-5.944a.88.88 0 0 1 1.758 0 4.194 4.194 0 0 0 4.199 4.189.879.879 0 1 1 0 1.755m0-2.683a.88.88 0 0 1-.88-.876.88.88 0 0 1 .88-.878 4.195 4.195 0 0 0 4.199-4.19.878.878 0 0 1 1.758 0c0 3.282-2.667 5.944-5.957 5.944"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#0DBD8B';
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

export function registerElementIcon(name = 'devicon-element') {
  if (!customElements.get(name)) {
    customElements.define(name, ElementIconElement);
  }
}
