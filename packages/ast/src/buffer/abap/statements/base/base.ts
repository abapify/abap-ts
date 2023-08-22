import abapgen from '../../../../abapgen/abapgen';
import { Code, IndentType } from './common/code';

export type Chunks = Array<string | AbapCodeBase>;

export class AbapCodeBase extends Code<unknown> {
  constructor() {
    super({ format: { indentType: IndentType.spaces } });
  }
  protected override renderData(data: unknown): string[] {
    return [abapgen(data)];
  }
}
