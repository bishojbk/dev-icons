const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class BuildkiteIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="m23.613 8.143-7.668-3.856v7.712zM8.166 15.857V8.143L.387 4.287V12l7.78 3.857zM.183 3.958a.38.38 0 0 1 .377-.017l7.606 3.771 7.607-3.771a.39.39 0 0 1 .346 0l7.668 3.857a.39.39 0 0 1 .213.345v7.71a.39.39 0 0 1-.213.346l-7.668 3.86a.39.39 0 0 1-.562-.345v-7.09l-7.219 3.58a.4.4 0 0 1-.344 0L.215 12.346A.39.39 0 0 1 0 12V4.287a.39.39 0 0 1 .183-.329"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#14CC80';
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

export function registerBuildkiteIcon(name = 'devicon-buildkite') {
  if (!customElements.get(name)) {
    customElements.define(name, BuildkiteIconElement);
  }
}
