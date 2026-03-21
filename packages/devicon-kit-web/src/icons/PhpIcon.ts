const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class PhpIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M7.01 10.207h-.944l-.515 2.648h.838q.834 0 1.242-.314.408-.315.55-1.049.137-.705-.124-.995-.262-.29-1.047-.29M12 5.688C5.373 5.688 0 8.514 0 12s5.373 6.313 12 6.313S24 15.486 24 12s-5.373-6.312-12-6.312m-3.26 7.451c-.261.25-.575.438-.917.551q-.505.163-1.285.164H5.357l-.327 1.681H3.652l1.23-6.326h2.65q1.195 0 1.744.628.549.627.33 1.752a2.8 2.8 0 0 1-.305.847q-.215.383-.561.703m4.024.715.543-2.799q.094-.478-.068-.651-.16-.174-.687-.174H11.46l-.704 3.625H9.388l1.23-6.327h1.367l-.327 1.682h1.218q1.15 0 1.586.401c.436.401.378.7.263 1.299l-.572 2.944zm7.597-2.265a2.8 2.8 0 0 1-.305.847q-.214.383-.561.703a2.44 2.44 0 0 1-.917.551q-.504.163-1.286.164h-1.18l-.327 1.682h-1.378l1.23-6.326h2.649q1.195 0 1.744.628.55.626.331 1.751m-2.595-1.382h-.943l-.516 2.648h.838q.835 0 1.242-.314.407-.315.551-1.049.137-.705-.125-.995c-.262-.29-.524-.29-1.047-.29"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#777BB4';
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

export function registerPhpIcon(name = 'devicon-php') {
  if (!customElements.get(name)) {
    customElements.define(name, PhpIconElement);
  }
}
