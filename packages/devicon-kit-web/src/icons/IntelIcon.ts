const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class IntelIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M20.42 7.345v9.18h1.651v-9.18zM0 7.475v1.737h1.737V7.474zm9.78.352v6.053q0 .77.13 1.292.131.511.44.828c.203.21.475.359.803.451q.502.138 1.255.136h.216v-1.533c-.24 0-.445-.012-.593-.037a.67.67 0 0 1-.39-.173.7.7 0 0 1-.173-.377 4 4 0 0 1-.037-.606v-2.182h1.193v-1.416h-1.193V7.827zm-3.505 2.312c-.396 0-.76.08-1.082.241q-.49.242-.822.668l-.087.117v-.902H2.658v6.256h1.639v-3.214q.025-.881.433-1.299c.29-.297.642-.445 1.044-.445.476 0 .841.149 1.082.433.235.284.359.686.359 1.2v3.324h1.663V12.97c.006-.89-.229-1.595-.686-2.09s-1.1-.742-1.917-.742zm10.065.006a3.25 3.25 0 0 0-2.306.946c-.29.29-.525.637-.692 1.033a3.15 3.15 0 0 0-.254 1.273q0 .679.241 1.274c.161.395.39.742.674 1.032s.637.526 1.045.693c.408.173.86.26 1.342.26 1.397 0 2.262-.637 2.782-1.23l-1.187-.904c-.248.297-.841.699-1.583.699-.464 0-.847-.105-1.138-.321a1.6 1.6 0 0 1-.593-.872l-.019-.056h4.915v-.587q-.001-.676-.235-1.267a3.4 3.4 0 0 0-.661-1.033 3 3 0 0 0-1.02-.692 3.35 3.35 0 0 0-1.311-.248m-16.297.118v6.256h1.651v-6.256zm16.278 1.286c1.132 0 1.664.797 1.664 1.255l-3.32.006c0-.458.525-1.255 1.656-1.261m7.073 3.814a.606.606 0 0 0-.606.606.606.606 0 0 0 .606.606.606.606 0 0 0 .606-.606.606.606 0 0 0-.606-.606m-.008.105h.002a.5.5 0 0 1 .5.501.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .498-.5zm-.233.155v.699h.13v-.285h.093l.173.285h.136l-.18-.297a.2.2 0 0 0 .118-.056c.03-.03.05-.074.05-.136q0-.1-.063-.154c-.037-.038-.105-.056-.185-.056zm.13.099h.154q.028.001.056.012a.06.06 0 0 1 .037.031c.013.013.012.031.012.056a.1.1 0 0 1-.012.055.2.2 0 0 1-.037.031q-.028.011-.056.013h-.154Z"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#0071C5';
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

export function registerIntelIcon(name = 'devicon-intel') {
  if (!customElements.get(name)) {
    customElements.define(name, IntelIconElement);
  }
}
