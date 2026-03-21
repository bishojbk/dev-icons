const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 24, lg: 32, xl: 48, '2xl': 64 };

export class HoppscotchIconElement extends HTMLElement {
  static observedAttributes = ['size', 'color', 'variant', 'animate', 'title'];

  private _variants: Record<string, string> = {
      'default': `<g fill="currentColor" transform="translate(8, 8) scale(4.667)"><path d="M15.632 4.746a8.89 8.89 0 0 1 5.29 7.938c1.867 1.47 3.723 3.527 2.86 5.465-.968 2.174-4.415 2.085-8.334.985A7.113 7.113 0 0 1 5.063 14.51C1.623 12.334-.75 9.832.218 7.658c.863-1.939 3.634-1.936 5.975-1.532a8.89 8.89 0 0 1 9.439-1.38M1.862 8.39c-.47 1.056 2.056 4.054 8.972 7.133 6.916 3.08 10.834 2.95 11.304 1.894.39-.874-1.212-2.554-3.046-3.856-1.426-1.02-3.38-2.143-5.929-3.278-.694-.309-.964-1.133-.673-1.788.292-.655.933-1.093 2.282-1.156.635-.002.718-.178.747-.329.036-.233-.287-.47-.62-.618-2.647-1.179-5.888-.685-8.134 1.68-2.195-.491-4.514-.556-4.903.318m11.083 5.666c-.24.54-.98.735-1.651.436s-1.02-.979-.78-1.518c.24-.54.979-.735 1.65-.436s1.021.979.78 1.518zm4.02 2.327c.703.202 1.404-.093 1.566-.658.162-.564-.276-1.186-.98-1.387-.702-.202-1.403.093-1.565.658-.162.564.276 1.186.98 1.387zM7.218 9.737c.62.388.87 1.106.559 1.604s-1.066.588-1.686.2-.87-1.105-.56-1.604c.312-.498 1.067-.588 1.687-.2"/></g>`,
      'light': `<g fill="#f8fafc" transform="translate(8, 8) scale(4.667)"><path d="M15.632 4.746a8.89 8.89 0 0 1 5.29 7.938c1.867 1.47 3.723 3.527 2.86 5.465-.968 2.174-4.415 2.085-8.334.985A7.113 7.113 0 0 1 5.063 14.51C1.623 12.334-.75 9.832.218 7.658c.863-1.939 3.634-1.936 5.975-1.532a8.89 8.89 0 0 1 9.439-1.38M1.862 8.39c-.47 1.056 2.056 4.054 8.972 7.133 6.916 3.08 10.834 2.95 11.304 1.894.39-.874-1.212-2.554-3.046-3.856-1.426-1.02-3.38-2.143-5.929-3.278-.694-.309-.964-1.133-.673-1.788.292-.655.933-1.093 2.282-1.156.635-.002.718-.178.747-.329.036-.233-.287-.47-.62-.618-2.647-1.179-5.888-.685-8.134 1.68-2.195-.491-4.514-.556-4.903.318m11.083 5.666c-.24.54-.98.735-1.651.436s-1.02-.979-.78-1.518c.24-.54.979-.735 1.65-.436s1.021.979.78 1.518zm4.02 2.327c.703.202 1.404-.093 1.566-.658.162-.564-.276-1.186-.98-1.387-.702-.202-1.403.093-1.565.658-.162.564.276 1.186.98 1.387zM7.218 9.737c.62.388.87 1.106.559 1.604s-1.066.588-1.686.2-.87-1.105-.56-1.604c.312-.498 1.067-.588 1.687-.2"/></g>`,
  };

  connectedCallback() { this.render(); }
  attributeChangedCallback() { this.render(); }

  private render() {
    const size = this.getAttribute('size') || 'md';
    const color = this.getAttribute('color') || '#09090B';
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

export function registerHoppscotchIcon(name = 'devicon-hoppscotch') {
  if (!customElements.get(name)) {
    customElements.define(name, HoppscotchIconElement);
  }
}
