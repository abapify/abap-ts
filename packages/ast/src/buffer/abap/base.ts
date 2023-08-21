import { Code, IndentType } from '../common/code';

export type Chunks = Array<string | AbapCodeBase>;

export class AbapCodeBase extends Code {
  constructor() {
    super({ format: { indentType: IndentType.spaces } });
  }
}
