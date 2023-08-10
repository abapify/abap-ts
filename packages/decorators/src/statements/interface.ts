import { AbapStatement } from './base/template';

interface Parameter {

}

interface Type {}

interface Attribute {}

interface Method {
  parameters: Array<Parameter>;
}

interface InterfaceMetadata {
  name: string;
  public?: boolean;
  deferred?: boolean;
  interfaces?: Array<string | Interface>;
  types: Array<Type>
}

export class Interface extends AbapStatement {
  name: string;
  constructor() {}
  override toString(): string {
    const { name } = this;
    return `interface ${name}`;
  }
}
