import { Token } from '../base/token';

export interface RefToTypeMeta {
  name: string;
  type: string;
}

export class RefToType extends Token<RefToTypeMeta> {
  override toString(): string {
    const { name, type } = this.meta;
    return `${name} ref to ${type}`;
  }
}
