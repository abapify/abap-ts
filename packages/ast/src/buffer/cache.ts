export function cache(getter: (key: any, ...args: any[]) => any) {
  const cache: Map<
    Parameters<typeof getter>[0],
    ReturnType<typeof getter>
  > = new Map();
  return new Proxy(getter, {
    apply(target, thisArg, [key, ...args]) {
      if (!cache.has(key)) {
        const value = Reflect.apply(target, thisArg, [key, ...args]);
        cache.set(key, value);
        return value;
      }
      return cache.get(key);
    },
  });
}
