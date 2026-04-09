const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class LinkerdIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M22.329 5.04v9.034l1.666.964V6.004zM0 15.038l1.666-.964V5.04L0 6.004zm8.165-.089 7.665 4.424V17.45l-7.176-4.142-.489.282zm8.105 6.989-8.105-4.681v1.923l2.164 1.25-2.604 1.503a.263.263 0 0 0 0 .454l1.27.737 3-1.73 3 1.73 1.27-.737c.178-.093.178-.35.005-.449m6.059-11.511v8.012c0 .202.218.331.396.227l1.142-.657a.27.27 0 0 0 .133-.228V9.468zm-3.271 10.354 1.072-.623a.39.39 0 0 0 .198-.341v-8.233l-1.666.963v8.012c0 .198.218.326.396.222m-4.063 2.348 1.537-.885a.27.27 0 0 0 .134-.227v-8.318l-1.671.964zm-7.532-.89L9 23.124v-8.461l-1.666-.964v8.313c0 .094.05.183.129.227m-3.598-2.076 1.072.623a.265.265 0 0 0 .396-.227v-8.017l-1.666-.963v8.238c0 .144.074.277.198.346M.198 18.048l1.072.623a.265.265 0 0 0 .396-.228v-8.016L0 9.468v8.239c0 .138.074.267.198.341M23.995 6.004l-1.666-.964-3 1.73-1.996-1.152 2.604-1.502a.264.264 0 0 0 0-.455l-1.077-.623a.4.4 0 0 0-.395 0l-2.803 1.616-1.996-1.151L16.27 2a.263.263 0 0 0 0-.454L15.193.923a.4.4 0 0 0-.396 0l-2.802 1.616L9.193.923a.4.4 0 0 0-.396 0l-1.077.623a.263.263 0 0 0 0 .454l14.6 8.432 1.665-.964-3-1.73zM5.135 3.038l-1.072.623a.264.264 0 0 0 0 .455l14.599 8.431 1.666-.963L5.53 3.038a.4.4 0 0 0-.395 0M0 6.004l3 1.729-3 1.735 1.671.959 2.995-1.73 2.001 1.157-3 1.73 1.666.963 3-1.734 1.996 1.156-3 1.73L9 14.663l2.995-1.735 3 1.735 1.666-.964L1.666 5.04z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#2BEDA7';
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

export function registerLinkerdIcon(name = 'devicon-linkerd') {
  if (!customElements.get(name)) {
    customElements.define(name, LinkerdIconElement);
  }
}
