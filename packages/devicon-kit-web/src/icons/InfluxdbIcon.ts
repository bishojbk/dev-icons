const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class InfluxdbIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="m23.778 14.482-2.287-9.959c-.13-.545-.624-1.09-1.169-1.248L9.87.051C9.74 0 9.584 0 9.426 0c-.443 0-.909.18-1.222.443L.716 7.412C.3 7.776.092 8.504.222 9.024l2.445 10.662c.13.545.624 1.092 1.169 1.248l9.775 3.015c.13.051.285.051.443.051.443 0 .91-.18 1.223-.443l8.007-7.435c.418-.39.624-1.092.494-1.64M10.962 2.417l7.175 2.21c.285.08.285.21 0 .286l-3.77.858c-.285.08-.674-.05-.883-.26l-2.626-2.834c-.235-.232-.184-.336.104-.26m4.47 12.872c.079.286-.105.444-.39.365l-7.748-2.392c-.285-.079-.338-.313-.13-.52l5.93-5.514c.209-.209.443-.13.52.156zM2.667 8.267l6.293-5.85c.21-.209.545-.18.754.025L12.86 5.85c.209.21.18.545-.026.754l-6.293 5.85c-.21.21-.545.181-.754-.025L2.64 9.024a.536.536 0 0 1 .026-.757zm1.536 9.284L2.54 10.244c-.08-.285.05-.34.234-.13L5.4 12.949c.209.209.285.624.209.909L4.462 17.55c-.079.285-.208.285-.26 0zm9.202 4.264-8.217-2.522a.547.547 0 0 1-.364-.675l1.378-4.421a.547.547 0 0 1 .675-.365l8.216 2.522c.285.079.443.39.364.675L14.08 21.45a.553.553 0 0 1-.674.365zm7.279-5.98L15.2 20.93c-.209.209-.31.13-.234-.155l1.144-3.694c.079-.285.39-.573.674-.624l3.77-.858c.288-.076.339.054.13.234zm.598-1.09-4.523 1.039a.534.534 0 0 1-.65-.39l-1.922-8.372a.534.534 0 0 1 .39-.65L19.1 5.335a.534.534 0 0 1 .649.39l1.923 8.371c.079.31-.102.596-.39.65Z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#22ADF6';
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

export function registerInfluxdbIcon(name = 'devicon-influxdb') {
  if (!customElements.get(name)) {
    customElements.define(name, InfluxdbIconElement);
  }
}
