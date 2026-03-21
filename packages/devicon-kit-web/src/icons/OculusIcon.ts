const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class OculusIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M18.135 13.949c-.319.221-.675.355-1.057.416s-.761.049-1.142.049H8.063c-.382 0-.762.014-1.145-.049a2.6 2.6 0 0 1-1.057-.416 2.38 2.38 0 0 1-1.027-1.951c0-.796.387-1.515 1.029-1.95.314-.225.674-.359 1.049-.42s.75-.061 1.141-.061h7.875c.375 0 .765-.014 1.14.046s.735.194 1.051.405a2.34 2.34 0 0 1 1.02 1.949c0 .78-.391 1.5-1.035 1.95zm3.174-7.555a7.2 7.2 0 0 0-2.865-1.398 8.8 8.8 0 0 0-1.822-.23c-.449-.015-.899-.01-1.364-.01H8.76c-.457 0-.915-.005-1.372.01a9 9 0 0 0-1.825.23 7.3 7.3 0 0 0-2.865 1.4A7.17 7.17 0 0 0 0 12c0 2.182.99 4.241 2.689 5.606a7.3 7.3 0 0 0 2.865 1.4 8.8 8.8 0 0 0 1.823.229c.45.016.9.012 1.365.012h6.496c.449 0 .914.004 1.364-.012a8.6 8.6 0 0 0 1.814-.229 7.4 7.4 0 0 0 2.866-1.402A7.13 7.13 0 0 0 24 12c0-2.181-.99-4.241-2.691-5.606"/></g>`,
      'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M18.135 13.949c-.319.221-.675.355-1.057.416s-.761.049-1.142.049H8.063c-.382 0-.762.014-1.145-.049a2.6 2.6 0 0 1-1.057-.416 2.38 2.38 0 0 1-1.027-1.951c0-.796.387-1.515 1.029-1.95.314-.225.674-.359 1.049-.42s.75-.061 1.141-.061h7.875c.375 0 .765-.014 1.14.046s.735.194 1.051.405a2.34 2.34 0 0 1 1.02 1.949c0 .78-.391 1.5-1.035 1.95zm3.174-7.555a7.2 7.2 0 0 0-2.865-1.398 8.8 8.8 0 0 0-1.822-.23c-.449-.015-.899-.01-1.364-.01H8.76c-.457 0-.915-.005-1.372.01a9 9 0 0 0-1.825.23 7.3 7.3 0 0 0-2.865 1.4A7.17 7.17 0 0 0 0 12c0 2.182.99 4.241 2.689 5.606a7.3 7.3 0 0 0 2.865 1.4 8.8 8.8 0 0 0 1.823.229c.45.016.9.012 1.365.012h6.496c.449 0 .914.004 1.364-.012a8.6 8.6 0 0 0 1.814-.229 7.4 7.4 0 0 0 2.866-1.402A7.13 7.13 0 0 0 24 12c0-2.181-.99-4.241-2.691-5.606"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#1C1E20';
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

export function registerOculusIcon(name = 'devicon-oculus') {
  if (!customElements.get(name)) {
    customElements.define(name, OculusIconElement);
  }
}
