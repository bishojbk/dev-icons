import Fuse from 'fuse.js';
import type { IconMeta } from 'devicon-kit';

let fuseInstance: Fuse<IconMeta> | null = null;

function getFuse(data: IconMeta[]): Fuse<IconMeta> {
  if (!fuseInstance) {
    fuseInstance = new Fuse(data, {
      keys: [
        { name: 'name', weight: 2 },
        { name: 'aliases', weight: 1.5 },
        { name: 'tags', weight: 1 },
        { name: 'category', weight: 0.5 },
      ],
      threshold: 0.35,
      includeScore: true,
      minMatchCharLength: 1,
    });
  }
  return fuseInstance;
}

export function searchIcons(
  data: IconMeta[],
  query: string,
  category?: string
): IconMeta[] {
  let results = data;

  if (query.trim()) {
    const fuse = getFuse(data);
    results = fuse.search(query).map((result) => result.item);
  }

  if (category && category !== 'all') {
    results = results.filter((icon) => icon.category === category);
  }

  return results;
}
