import { get } from './base/factory';
import { Token } from './base/token';
import { ArrayOrRecord } from './base/types';
import { Type, TypeMeta } from './types';

interface InterfaceMeta {
  name: string;
  public?: boolean;
  interfaces?: Array<Interface | string>;
  types?: Array<Type | TypeMeta> | Record<string, Type | TypeMeta>;
}

export class Interface extends Token<InterfaceMeta> {
  get interfaces() {
    return this.meta.interfaces?.map((i) =>
      i instanceof Interface ? i.meta.name : i
    );
  }
  get types() {
    const types = this.meta.types;
    if (types) {
      if (Array.isArray(types)) {
        return types;
      } else {
        return Object.entries(types).map(([name, type]) =>
          get.type(name, type)
        );
      }
    }
  }
  get components() {
    return get.code({
      interfaces: this.interfaces,
      types: this.types,
    });
  }
  override toString() {
    return get
      .code([
        `interface ${this.meta.name}${this.meta.public ? ' public' : ''}`,
        this.components,
        'endinterface',
      ])
      .toString();
  }
}
