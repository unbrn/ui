import componentsMeta from '../data/components.json';

export const COMPONENTS = componentsMeta.map(comp => ({
  name: comp.name,
  path: comp.path
}));
