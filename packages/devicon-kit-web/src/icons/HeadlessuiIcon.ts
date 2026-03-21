const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class HeadlessuiIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M4.477 13.192c-.36-2.274-.584-3.711-.65-4.805-.062-1.035.051-1.354.1-1.468.169-.395.424-.746.746-1.029.093-.081.363-.288 1.366-.548 1.06-.275 2.496-.507 4.769-.867s3.71-.584 4.804-.65c1.034-.062 1.354.051 1.468.1.395.169.746.424 1.029.747.08.093.287.362.547 1.366.242.933.45 2.156.743 3.987l-14.646 4.89c-.085-.515-.176-1.085-.276-1.723m-3.762.596C.018 9.387-.33 7.187.425 5.422a6.7 6.7 0 0 1 1.743-2.401C3.614 1.757 5.813 1.41 10.211.713c4.4-.698 6.6-1.046 8.367-.291.92.393 1.74.99 2.399 1.743 1.264 1.447 1.612 3.647 2.308 8.047.697 4.4 1.045 6.601.29 8.366a6.7 6.7 0 0 1-1.743 2.402c-1.445 1.263-3.645 1.611-8.045 2.308-4.398.697-6.598 1.045-8.363.29a6.7 6.7 0 0 1-2.4-1.743c-1.263-1.448-1.611-3.648-2.308-8.048zm7.759 7.814c1.178-.072 2.695-.31 4.94-.665 2.247-.356 3.762-.599 4.905-.895 1.107-.288 1.617-.568 1.947-.856a4.3 4.3 0 0 0 1.12-1.543c.172-.402.281-.974.212-2.116-.071-1.178-.309-2.696-.665-4.942-.355-2.247-.598-3.763-.894-4.906-.287-1.107-.568-1.618-.855-1.947a4.3 4.3 0 0 0-1.543-1.12c-.402-.174-.974-.282-2.116-.213-1.178.071-2.694.309-4.94.664-2.246.357-3.762.6-4.905.896-1.107.287-1.616.568-1.946.855a4.3 4.3 0 0 0-1.12 1.543c-.173.403-.281.974-.212 2.116.07 1.179.308 2.696.664 4.943s.598 3.762.895 4.905c.287 1.108.567 1.618.855 1.947.423.485.95.868 1.543 1.121.402.173.973.282 2.116.213Z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#66E3FF';
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

export function registerHeadlessuiIcon(name = 'devicon-headlessui') {
  if (!customElements.get(name)) {
    customElements.define(name, HeadlessuiIconElement);
  }
}
