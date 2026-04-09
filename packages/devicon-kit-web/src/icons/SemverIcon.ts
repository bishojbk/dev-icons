const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class SemverIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M.357 9.024A12.07 12.07 0 0 0 2.97 19.867a12.05 12.05 0 0 0 10.38 4.063c7.768-.703 13.086-9.799 9.517-16.8-.416-1.19-2.07-.368-1.903.596q.431 1.052.713 2.155a9.98 9.98 0 0 1-3.926 10.25 9.965 9.965 0 0 1-14.807-3.809A9.98 9.98 0 0 1 4.44 5.448a9.97 9.97 0 0 1 4.85-3.044 9.87 9.87 0 0 1 7.02.631.333.333 0 0 1 .155.429l-3.962 10.62c-.107.81-.69.786-.797 0l-2.38-7.37a1.57 1.57 0 0 0-.773-.988c-1.19-.56-3.093.667-2.379 2.155l3.914 10.441c.524 1.393 1.023 1.834 2.058 1.834s1.535-.44 2.058-1.834L20 3.94a1.036 1.036 0 0 0-.369-1.19C13.1-2.907 2.32.641.357 9.023z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#3F4551';
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

export function registerSemverIcon(name = 'devicon-semver') {
  if (!customElements.get(name)) {
    customElements.define(name, SemverIconElement);
  }
}
