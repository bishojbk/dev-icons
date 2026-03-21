const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class OpentelemetryIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M12.697 13.117A2.618 2.618 0 1 0 16.4 16.82a2.618 2.618 0 0 0-3.703-3.703m2.768 2.77a1.296 1.296 0 1 1-1.833-1.832 1.296 1.296 0 0 1 1.833 1.832M16.356.236 14.752 1.84a.81.81 0 0 0 0 1.144l6.263 6.263a.81.81 0 0 0 1.144 0l1.604-1.604a.81.81 0 0 0 0-1.144L17.498.235a.81.81 0 0 0-1.142 0M5.117 20.734a.733.733 0 0 0 0-1.034l-.815-.816a.733.733 0 0 0-1.035 0l-1.684 1.685-.003.002-.462-.463a.654.654 0 1 0-.925.925l2.775 2.775a.654.654 0 1 0 .925-.925l-.463-.462.003-.002zm8.486-15.893-3.564 3.564a.82.82 0 0 0 0 1.154l2.2 2.2a3.98 3.98 0 0 1 5.137.419l1.782-1.782a.82.82 0 0 0 0-1.154l-4.401-4.4a.815.815 0 0 0-1.154 0m-2.288 7.846-1.3-1.3a.786.786 0 0 0-1.108 0l-4.583 4.586a.786.786 0 0 0 0 1.107l2.597 2.598a.786.786 0 0 0 1.108 0l2.947-2.953a3.99 3.99 0 0 1 .339-4.038"/></g>`,
      'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M12.697 13.117A2.618 2.618 0 1 0 16.4 16.82a2.618 2.618 0 0 0-3.703-3.703m2.768 2.77a1.296 1.296 0 1 1-1.833-1.832 1.296 1.296 0 0 1 1.833 1.832M16.356.236 14.752 1.84a.81.81 0 0 0 0 1.144l6.263 6.263a.81.81 0 0 0 1.144 0l1.604-1.604a.81.81 0 0 0 0-1.144L17.498.235a.81.81 0 0 0-1.142 0M5.117 20.734a.733.733 0 0 0 0-1.034l-.815-.816a.733.733 0 0 0-1.035 0l-1.684 1.685-.003.002-.462-.463a.654.654 0 1 0-.925.925l2.775 2.775a.654.654 0 1 0 .925-.925l-.463-.462.003-.002zm8.486-15.893-3.564 3.564a.82.82 0 0 0 0 1.154l2.2 2.2a3.98 3.98 0 0 1 5.137.419l1.782-1.782a.82.82 0 0 0 0-1.154l-4.401-4.4a.815.815 0 0 0-1.154 0m-2.288 7.846-1.3-1.3a.786.786 0 0 0-1.108 0l-4.583 4.586a.786.786 0 0 0 0 1.107l2.597 2.598a.786.786 0 0 0 1.108 0l2.947-2.953a3.99 3.99 0 0 1 .339-4.038"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#000000';
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

export function registerOpentelemetryIcon(name = 'devicon-opentelemetry') {
  if (!customElements.get(name)) {
    customElements.define(name, OpentelemetryIconElement);
  }
}
