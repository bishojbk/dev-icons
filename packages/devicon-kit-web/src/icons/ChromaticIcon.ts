const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class ChromaticIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0m-.006 3.43a3.37 3.37 0 0 1 3.37 3.369v2.199L9.628 5.689a4.3 4.3 0 0 0-.688-.32 3.35 3.35 0 0 1 3.053-1.94zm-4.498 2.6c.588 0 1.17.156 1.684.452l5.734 3.311-2.91 1.678-3.6-2.076a.46.46 0 0 0-.459 0L5.35 10.893a4 4 0 0 0-.621.433 3.35 3.35 0 0 1-.155-3.61A3.39 3.39 0 0 1 7.496 6.03m8.723.015a3.38 3.38 0 0 1 3.205 1.672 3.37 3.37 0 0 1-1.235 4.6l-5.736 3.308v-3.357l3.602-2.077a.46.46 0 0 0 .228-.398V6.799a4.4 4.4 0 0 0-.064-.754m-8.504 4.543v6.617q0 .38.066.754a3 3 0 0 1-.285.012 3.38 3.38 0 0 1-2.92-1.684 3.34 3.34 0 0 1-.338-2.555 3.34 3.34 0 0 1 1.57-2.044zm.908 0 2.912 1.68v4.152a.46.46 0 0 0 .23.396l2.594 1.498h.002q.33.191.688.32a3.35 3.35 0 0 1-3.055 1.938 3.373 3.373 0 0 1-3.371-3.367zm10.647 2.088a3.35 3.35 0 0 1 .154 3.611 3.37 3.37 0 0 1-4.604 1.233l-1.908-1.1 5.738-3.309a4.3 4.3 0 0 0 .62-.435"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#FC521F';
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

export function registerChromaticIcon(name = 'devicon-chromatic') {
  if (!customElements.get(name)) {
    customElements.define(name, ChromaticIconElement);
  }
}
