const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class BackblazeIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M9.31 0c.653 1.35 1.567 4.082-1.388 7.174-1.81 1.88-3.078 3.849-2.35 6.065.365 1.103 1.187 2.507 2.887 2.785.61.1 1.343 0 1.74-.14 2.454-.855 2.098-3.415 1.555-5.048-.07-.213-.191-.733-.236-.924-.373-1.602.776-2.656 1.129-3.804q.043-.138.07-.272.062-.315.078-.638c0-1.827-.988-2.63-1.775-3.6C10.18.564 9.31 0 9.31 0m6.276 6.018s-.709.336-1.219.883c-.445.482-.863.879-1.294 1.859q-.041.21-.075.438c-.232 1.641 1.148 3.144.719 5.189-.112.535-.355.712-.781 1.637-.51 1.106-.383 2.588.36 3.529.672.849 1.878 1.232 3.052.95 2.106-.505 3.065-2.283 2.896-4.286-.131-1.58-.815-2.753-2.754-4.96-.96-1.093-1.607-2.41-1.562-3.407.137-1.207.658-1.832.658-1.832M4.893 15.194c-.022.014-.044.061-.059.16l-.006.02v.01c-.114.54-.165 1.822.116 2.968.353 1.443 1.417 3.902 4.412 5.129 2.518 1.034 5.718.541 7.85-1.627.529-.543.407-.49-.489-.201v-.002c-1.112.356-3.518.546-4.768-1-1.523-1.885-.43-3.363-1.357-3.15-3.616.834-5.267-1.466-5.547-2.102-.002-.002-.086-.249-.152-.205"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#E21E29';
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

export function registerBackblazeIcon(name = 'devicon-backblaze') {
  if (!customElements.get(name)) {
    customElements.define(name, BackblazeIconElement);
  }
}
