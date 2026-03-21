const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class SourcetreeIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M11.999 0C6.756 0 2.474 4.245 2.474 9.525c0 4.21 2.769 7.792 6.572 9.047v4.764c0 .37.295.664.664.664h4.506a.66.66 0 0 0 .664-.664v-4.764l.074-.027v.064c3.694-1.22 6.412-4.634 6.565-8.687q.007-.187.007-.375v-.022q-.001-.228-.013-.455C21.275 4.037 17.125 0 11.999 0m0 6.352a3.214 3.214 0 0 1 2.664 5.005v.002A3.22 3.22 0 0 1 12 12.775a3.212 3.212 0 0 1 0-6.424z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#0052CC';
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

export function registerSourcetreeIcon(name = 'devicon-sourcetree') {
  if (!customElements.get(name)) {
    customElements.define(name, SourcetreeIconElement);
  }
}
