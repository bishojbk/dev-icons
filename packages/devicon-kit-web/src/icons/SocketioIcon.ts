const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class SocketioIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M11.936.014a12.2 12.2 0 0 0-2.975.378C4.281 1.555.568 5.794.091 10.602c-.59 4.548 1.709 9.285 5.644 11.634 3.861 2.418 9.093 2.32 12.874-.223 3.397-2.206 5.512-6.228 5.386-10.285-.058-4.016-2.31-7.916-5.76-9.98C16.355.589 14.144.006 11.937.015m-.063 1.696c4.945-.007 9.789 3.813 10.282 8.924.945 5.66-3.753 11.413-9.488 11.58-5.454.544-10.724-4.08-10.88-9.557-.406-4.434 2.517-8.834 6.698-10.3a9.1 9.1 0 0 1 3.388-.646zm5.091 3.225c-2.687 2.084-5.26 4.307-7.889 6.456 1.203.017 2.412.016 3.621.01 1.41-2.165 2.86-4.3 4.268-6.467M11.3 12.588c-1.41 2.166-2.86 4.309-4.27 6.474 2.693-2.08 5.255-4.32 7.902-6.456a255 255 0 0 0-3.632-.018"/></g>`,
      'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M11.936.014a12.2 12.2 0 0 0-2.975.378C4.281 1.555.568 5.794.091 10.602c-.59 4.548 1.709 9.285 5.644 11.634 3.861 2.418 9.093 2.32 12.874-.223 3.397-2.206 5.512-6.228 5.386-10.285-.058-4.016-2.31-7.916-5.76-9.98C16.355.589 14.144.006 11.937.015m-.063 1.696c4.945-.007 9.789 3.813 10.282 8.924.945 5.66-3.753 11.413-9.488 11.58-5.454.544-10.724-4.08-10.88-9.557-.406-4.434 2.517-8.834 6.698-10.3a9.1 9.1 0 0 1 3.388-.646zm5.091 3.225c-2.687 2.084-5.26 4.307-7.889 6.456 1.203.017 2.412.016 3.621.01 1.41-2.165 2.86-4.3 4.268-6.467M11.3 12.588c-1.41 2.166-2.86 4.309-4.27 6.474 2.693-2.08 5.255-4.32 7.902-6.456a255 255 0 0 0-3.632-.018"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#010101';
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

export function registerSocketioIcon(name = 'devicon-socketio') {
  if (!customElements.get(name)) {
    customElements.define(name, SocketioIconElement);
  }
}
