const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class SolidityIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M4.409 6.608 7.981.255l3.572 6.353zM8.411 0l3.569 6.348L15.552 0zm4.036 17.392 3.572 6.354 3.575-6.354zm-.608-10.284h-7.43l3.715 6.605zm.428-.25h7.428L15.982.255zM15.589 24l-3.569-6.349L8.448 24zm-3.856-6.858H4.306l3.712 6.603zm.428-.25h7.433l-3.718-6.605z"/></g>`,
      'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M4.409 6.608 7.981.255l3.572 6.353zM8.411 0l3.569 6.348L15.552 0zm4.036 17.392 3.572 6.354 3.575-6.354zm-.608-10.284h-7.43l3.715 6.605zm.428-.25h7.428L15.982.255zM15.589 24l-3.569-6.349L8.448 24zm-3.856-6.858H4.306l3.712 6.603zm.428-.25h7.433l-3.718-6.605z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#363636';
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

export function registerSolidityIcon(name = 'devicon-solidity') {
  if (!customElements.get(name)) {
    customElements.define(name, SolidityIconElement);
  }
}
