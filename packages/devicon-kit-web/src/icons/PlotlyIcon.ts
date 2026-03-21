const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class PlotlyIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M1.713.002A1.713 1.713 0 0 0 0 1.715a1.713 1.713 0 0 0 1.713 1.713 1.713 1.713 0 0 0 1.714-1.713A1.713 1.713 0 0 0 1.713.002m6.861 0a1.713 1.713 0 0 0-1.713 1.713 1.713 1.713 0 0 0 1.713 1.713 1.713 1.713 0 0 0 1.713-1.713A1.713 1.713 0 0 0 8.574.002m6.857 0a1.713 1.713 0 0 0-1.714 1.713 1.713 1.713 0 0 0 1.714 1.713 1.713 1.713 0 0 0 1.713-1.713A1.713 1.713 0 0 0 15.431.002m6.856 0a1.713 1.713 0 0 0-1.713 1.713 1.713 1.713 0 0 0 1.713 1.713A1.713 1.713 0 0 0 24 1.715 1.713 1.713 0 0 0 22.287.002M1.713 6.859A1.713 1.713 0 0 0 0 8.572a1.713 1.713 0 0 0 1.713 1.713 1.713 1.713 0 0 0 1.714-1.713A1.713 1.713 0 0 0 1.713 6.86Zm6.861 0a1.71 1.71 0 0 0-1.713 1.713v13.713c0 .947.765 1.713 1.713 1.713s1.713-.766 1.713-1.713V8.572a1.71 1.71 0 0 0-1.713-1.713m6.857 0a1.713 1.713 0 0 0-1.714 1.713 1.713 1.713 0 0 0 1.714 1.713 1.713 1.713 0 0 0 1.713-1.713 1.713 1.713 0 0 0-1.713-1.713m6.856 0c-.947 0-1.713.765-1.713 1.713v13.713c0 .947.766 1.713 1.713 1.713S24 23.232 24 22.285V8.572a1.71 1.71 0 0 0-1.713-1.713M1.713 13.715C.766 13.715 0 14.48 0 15.428v6.857a1.713 1.713 0 1 0 3.427 0v-6.857c0-.948-.766-1.713-1.714-1.713m13.718 0c-.948 0-1.714.765-1.714 1.713v6.857c0 .947.766 1.713 1.714 1.713.947 0 1.713-.766 1.713-1.713v-6.857c0-.948-.766-1.713-1.713-1.713"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#7A76FF';
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

export function registerPlotlyIcon(name = 'devicon-plotly') {
  if (!customElements.get(name)) {
    customElements.define(name, PlotlyIconElement);
  }
}
