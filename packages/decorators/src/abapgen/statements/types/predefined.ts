import { Token } from '../base/token';

export interface AbapTypeMeta {
  name: string;
  type: string;
  length?: number;
  decimals?: number;
}

export class AbapType extends Token<AbapTypeMeta> {
  override toString(): string {
    const { name, type, length, decimals } = this.meta;

    return [
      `${name} type ${type}`,
      length && `length ${length}`,
      decimals && `decimals ${decimals}`,
    ]
      .filter((f) => f)
      .join(' ');
  }
}
