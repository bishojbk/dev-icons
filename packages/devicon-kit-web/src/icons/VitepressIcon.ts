const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class VitepressIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M17.029.001a2 2 0 0 0-.187.018L4.085 1.833A1.86 1.86 0 0 0 2.518 3.94l2.56 18.457a1.846 1.846 0 0 0 2.08 1.586l12.757-1.816a1.86 1.86 0 0 0 1.567-2.106l-2.56-18.455A1.85 1.85 0 0 0 17.029 0m.127.932a.926.926 0 0 1 .853.8l2.56 18.458a.93.93 0 0 1-.782 1.053L7.03 23.058a.92.92 0 0 1-1.04-.793L3.43 3.81a.93.93 0 0 1 .783-1.053L16.97.941a1 1 0 0 1 .186-.008m-3.644 5.354L9.967 7.521a.136.136 0 0 0-.09.141l.318 3.87c.008.09.1.149.184.116l.982-.378a.136.136 0 0 1 .184.136l-.09 1.54c-.006.103.1.176.193.132l.6-.281c.093-.044.198.03.192.135l-.147 2.418c-.01.15.195.203.258.066l.04-.092L14.716 8.9c.035-.107-.066-.21-.172-.173l-1.018.351c-.095.033-.191-.049-.177-.15l.343-2.49a.137.137 0 0 0-.142-.157c-.016 0-.042.009-.037.006zm2.822.799a.3.3 0 0 0-.08.014L14 7.85l-.076.56.455-.156a.636.636 0 0 1 .81.803l-2.13 6.449-.053.117a.64.64 0 0 1-.738.352.64.64 0 0 1-.473-.657l.11-1.808a.638.638 0 0 1-.948-.594l.057-.976-.454.175a.64.64 0 0 1-.863-.543L9.453 8.6l-3.062-.123c-.23-.01-.364.255-.223.44l6.29 8.23a.27.27 0 0 0 .468-.069l3.668-9.619a.275.275 0 0 0-.26-.373"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#5C73E7';
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

export function registerVitepressIcon(name = 'devicon-vitepress') {
  if (!customElements.get(name)) {
    customElements.define(name, VitepressIconElement);
  }
}
