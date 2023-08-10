interface AbapInterfaceMetadata {
  public?: boolean;
  interfaces?: Array<string | AbapInterfaceMetadata>;
}

class AbapInterface implements AbapInterfaceMetadata {
  constructor(name: string, { public: isPublic }: AbapInterfaceMetadata) {
    this.toString = () => `interface ${name}${isPublic ? ' public' : ''}.
endinterface.`;
  }
}

export function PUBLIC<T extends { new (...args: any[]): {} }>(constructor: T) {
  constructor.prototype.PUBLIC = ' public';
}

// Decorator for the interface
export function INTERFACE<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  const { name } = constructor;
  const { PUBLIC } = constructor.prototype;

  constructor.toString = () =>
    `interface ${name}${PUBLIC || ''}.
endinterface.`;
}

export function INTERFACE2<T extends Function>(constructor: T) {
  console.log(constructor);
  // if (constructor) {
  //   const { name } = constructor;
  //   return class extends constructor {};
  // }
  // const { name } = constructor;
  // constructor.toString = () =>
  //   new AbapInterface(name, new constructor()).toString();
}
