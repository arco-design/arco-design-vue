const cache = new Map();

export const createDescriptor = (id: string, content: string) => {
  cache.set(id, content);
};

export const getDescriptor = (id: string) => {
  return cache.get(id);
};
