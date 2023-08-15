import { AbapStatement } from './base/base';
import { Types, TypesData } from './types';
import { statementTypes } from './base/statementTypes';

interface InterfaceInput {
  name: string;
  public?: boolean;
  interfaces?: Array<string>;
  types?: TypesData;
}

export class Interface extends AbapStatement<InterfaceInput> {
  static override type = statementTypes.interface;
  override render(): string {
    if (this.data) {
      const { name, public: _public, types } = this.data;
      return [
        `interface ${name}${_public ? ' public' : ''}`,
        types && new Types(types).render(),
        `endinterface`,
      ]
        .filter((f) => f)
        .join('.\n');
    }
    throw 'Not supported';
  }
}
