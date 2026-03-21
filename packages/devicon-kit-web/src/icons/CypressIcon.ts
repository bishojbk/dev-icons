const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class CypressIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M11.998.02c-.864 0-1.682.11-2.144.193v.002A11.93 11.93 0 0 0 0 12.002c0 1.126.157 2.233.465 3.303.038.145.091.299.137.447 1.607 4.865 6.224 8.226 11.392 8.228.065 0 .252 0 .502-.011a2.22 2.22 0 0 0 1.951-1.37l.474-1.154 5.505-13.402H18.62l-2.316 5.871-2.334-5.871h-1.909l3.274 8.012-2.436 5.91a.54.54 0 0 1-.472.336c-.144.005-.285.01-.432.01-4.585 0-8.667-3.07-9.928-7.465a10.3 10.3 0 0 1-.398-2.844 10.27 10.27 0 0 1 8.603-10.164c.222-.037.889-.145 1.725-.145 4.417 0 8.269 2.732 9.73 6.848.056.144.098.293.147.44.299.974.453 1.988.453 3.021a10.25 10.25 0 0 1-7.316 9.861l.486 1.6c5.085-1.546 8.5-6.152 8.502-11.46 0-1.548-.298-2.87-.65-3.892l-.131-.363h-.002C21.457 3.095 17.044.02 11.998.02M8.434 7.89c-1.2 0-2.175.386-2.98 1.176-.802.786-1.206 1.774-1.206 2.936 0 1.154.407 2.137 1.205 2.92.806.79 1.78 1.174 2.98 1.174 1.706 0 3.156-.955 3.788-2.489l.033-.082-1.629-.554c-.168.456-.755 1.488-2.191 1.488-.675 0-1.244-.234-1.694-.7-.457-.47-.687-1.062-.687-1.757 0-.7.225-1.28.687-1.773.452-.465 1.02-.702 1.694-.702 1.438 0 2.023 1.082 2.193 1.489l1.627-.553-.033-.084c-.63-1.536-2.082-2.488-3.787-2.488"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#69D3A7';
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

export function registerCypressIcon(name = 'devicon-cypress') {
  if (!customElements.get(name)) {
    customElements.define(name, CypressIconElement);
  }
}
