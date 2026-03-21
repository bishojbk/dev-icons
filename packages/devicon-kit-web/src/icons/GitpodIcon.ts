const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class GitpodIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M14.033 1.195a2.387 2.387 0 0 1-.87 3.235l-6.98 4.04a.6.6 0 0 0-.3.522v6.342a.6.6 0 0 0 .3.521l5.524 3.199a.59.59 0 0 0 .586 0l5.527-3.199a.6.6 0 0 0 .299-.52V11.39l-4.969 2.838a2.326 2.326 0 0 1-3.19-.9 2.39 2.39 0 0 1 .89-3.23l7.108-4.062C20.123 4.8 22.8 6.384 22.8 8.901v6.914a4.52 4.52 0 0 1-2.245 3.919l-6.345 3.672a4.41 4.41 0 0 1-4.422 0l-6.344-3.672A4.52 4.52 0 0 1 1.2 15.816V8.51a4.52 4.52 0 0 1 2.245-3.918l7.393-4.28a2.326 2.326 0 0 1 3.195.883"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#FFAE33';
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

export function registerGitpodIcon(name = 'devicon-gitpod') {
  if (!customElements.get(name)) {
    customElements.define(name, GitpodIconElement);
  }
}
