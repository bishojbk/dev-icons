const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class CockroachdbIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M17.645 16.155a13.01 13.01 0 0 0-4.479-13.287 11.6 11.6 0 0 1 5.815-1.546c.774 0 1.545.075 2.304.226l.32-1.282A13 13 0 0 0 18.98 0 12.93 12.93 0 0 0 12 2.03 12.93 12.93 0 0 0 5.021 0C4.139 0 3.26.089 2.396.266l.319 1.282a12 12 0 0 1 2.306-.226 11.64 11.64 0 0 1 5.817 1.544 13.01 13.01 0 0 0 .792 20.877l.375.257.373-.257c2.624-1.801 4.5-4.5 5.27-7.588zm-6.305 5.7A11.69 11.69 0 0 1 7.825 9.519a13 13 0 0 0 2.457 2.977 3.2 3.2 0 0 1 1.058 2.383zm.661-9.657a11.7 11.7 0 0 1-2.343-2.315 3.23 3.23 0 0 1 0-3.912 11.7 11.7 0 0 1 2.347-2.333c.9.671 1.697 1.468 2.37 2.366a3.2 3.2 0 0 1 0 3.832 11.8 11.8 0 0 1-2.374 2.362m.659 9.657v-6.976a3.2 3.2 0 0 1 1.06-2.383 13 13 0 0 0 2.455-2.977 11.69 11.69 0 0 1-3.515 12.336"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#6933FF';
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

export function registerCockroachdbIcon(name = 'devicon-cockroachdb') {
  if (!customElements.get(name)) {
    customElements.define(name, CockroachdbIconElement);
  }
}
