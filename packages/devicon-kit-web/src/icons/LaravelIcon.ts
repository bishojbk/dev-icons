const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class LaravelIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M23.642 5.43a.4.4 0 0 1 .014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.38.38 0 0 1-.188.326L9.93 23.949a.3.3 0 0 1-.066.027l-.024.01a.35.35 0 0 1-.192 0q-.016-.005-.03-.012-.031-.01-.062-.025L.533 18.755a.38.38 0 0 1-.189-.326V2.974q0-.05.014-.098c.003-.012.01-.02.014-.032a.4.4 0 0 1 .023-.058c.004-.013.015-.022.023-.033l.033-.045.037-.027q.02-.018.041-.034H.53L5.043.05a.38.38 0 0 1 .375 0L9.93 2.647h.002q.021.015.04.033l.038.027c.013.014.02.03.033.045.008.011.02.021.025.033q.014.029.024.058c.003.011.01.021.013.032q.014.047.014.098v9.652l3.76-2.164V5.527q0-.05.013-.098.007-.014.013-.032l.024-.059c.007-.012.018-.02.025-.033l.033-.043q.019-.017.037-.028.02-.017.041-.032h.001l4.513-2.598a.38.38 0 0 1 .375 0l4.513 2.598c.016.01.027.021.042.031l.036.028.034.044c.008.012.019.021.024.033a.3.3 0 0 1 .024.06q.01.015.015.032m-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003H5.04L5 16.169l-.035-.027-.001-.002q-.018-.018-.031-.04-.016-.016-.028-.036h-.002l-.02-.047c-.006-.016-.014-.027-.018-.043l-.008-.057q-.005-.02-.006-.041V5.789l-2.18-1.257zM5.23.81 1.47 2.974l3.76 2.164 3.758-2.164zm1.956 13.505 2.182-1.256V3.624l-1.58.91-2.182 1.255v9.435zm11.581-10.95-3.76 2.163 3.76 2.163 3.759-2.164zm-.376 4.978L16.21 7.087l-1.58-.907v4.283l2.182 1.256 1.58.908zm-8.65 9.654 5.514-3.148 2.756-1.572-3.757-2.163-4.323 2.489-3.941 2.27z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#FF2D20';
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

export function registerLaravelIcon(name = 'devicon-laravel') {
  if (!customElements.get(name)) {
    customElements.define(name, LaravelIconElement);
  }
}
