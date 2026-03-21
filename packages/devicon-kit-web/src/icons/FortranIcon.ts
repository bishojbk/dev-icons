const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class FortranIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M19.536 0H4.464A4.463 4.463 0 0 0 0 4.464v15.073A4.463 4.463 0 0 0 4.464 24h15.073A4.463 4.463 0 0 0 24 19.536V4.464A4.463 4.463 0 0 0 19.536 0m1.193 6.493v3.871l-.922-.005c-.507-.003-.981-.021-1.052-.041-.128-.036-.131-.05-.192-.839-.079-1.013-.143-1.462-.306-2.136-.352-1.457-1.096-2.25-2.309-2.463-.509-.089-2.731-.176-4.558-.177L10.13 4.7v5.82l.662-.033c.757-.038 1.353-.129 1.64-.252.306-.131.629-.462.781-.799.158-.352.262-.815.345-1.542.033-.286.07-.572.083-.636.024-.116.028-.117 1.036-.117h1.012v9.3h-2.062l-.035-.536c-.063-.971-.252-1.891-.479-2.331-.311-.601-.922-.871-2.151-.95a11 11 0 0 1-.666-.059l-.172-.027.02 2.926c.021 3.086.03 3.206.265 3.465.241.266.381.284 2.827.368.05.002.065.246.065 1.041v1.039H3.271v-1.039c0-.954.007-1.039.091-1.041.05-.001.543-.023 1.097-.049.891-.042 1.033-.061 1.244-.167a.7.7 0 0 0 .345-.328c.106-.206.107-.254.107-6.78 0-6.133-.006-6.584-.09-6.737a.94.94 0 0 0-.553-.436c-.104-.032-.65-.07-1.215-.086l-1.026-.027V2.622h17.458z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#734F96';
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

export function registerFortranIcon(name = 'devicon-fortran') {
  if (!customElements.get(name)) {
    customElements.define(name, FortranIconElement);
  }
}
