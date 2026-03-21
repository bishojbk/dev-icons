const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class MantineIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M12 0C5.377 0 0 5.377 0 12s5.377 12 12 12 12-5.377 12-12S18.623 0 12 0m-1.613 6.15a.9.9 0 0 1 .59.176q.647.477 1.177 1.082h2.588a.91.91 0 0 1 .912.906.91.91 0 0 1-.912.907h-1.43c.4.908.604 1.889.602 2.88a7.1 7.1 0 0 1-.601 2.883h1.427a.91.91 0 0 1 .914.907.91.91 0 0 1-.914.906h-2.588a7.4 7.4 0 0 1-1.175 1.082.92.92 0 0 1-1.28-.19.904.904 0 0 1 .191-1.268 5.32 5.32 0 0 0 2.2-4.32c0-1.715-.801-3.29-2.2-4.32a.906.906 0 0 1-.191-1.268H9.7a.92.92 0 0 1 .688-.363zm-.778 4.295a1.36 1.36 0 0 1 1.354 1.354v.033a1.36 1.36 0 0 1-1.354 1.32 1.36 1.36 0 0 1-1.353-1.32v-.033a1.36 1.36 0 0 1 1.353-1.354"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#339AF0';
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

export function registerMantineIcon(name = 'devicon-mantine') {
  if (!customElements.get(name)) {
    customElements.define(name, MantineIconElement);
  }
}
