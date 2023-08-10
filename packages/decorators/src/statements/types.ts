import { AbapStatement } from './base/template';

// {type: string} => type string
interface type {
  type: string;
}
const type = ({ type }: type) => `type ${type}`;

// {name: test, type: string}
interface namedType extends type {
  name: string;
}
const namedType = (i: namedType) => `${i.name} ${type(i)}`;

interface PredefinedTypeWithDecimals extends PredefinedType {
  length: number;
  decimals?: number;
}

type TypesMetadata = PredefinedType | PredefinedTypeWithDecimals;

export class Types extends AbapStatement {
  override toString(): string {
    return `TYPES`;
  }
}
