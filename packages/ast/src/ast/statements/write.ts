import { statementTypes, BlockableStatement } from './base/abap';

export interface WriteData {
  dobj?: string;
}

type WriteDataInput = WriteData | string;
// How to use
// new Write({dobj:})
export class Write extends BlockableStatement<WriteDataInput> {
  #getData(data: WriteDataInput) {
    if (!data) {
      return { dobj: '' };
    }
    if (typeof data === 'string') {
      return { dobj: data };
    }
    return data;
  }
  static override readonly type = statementTypes.write;
  override statement = statementTypes.write;
  override renderData(data: WriteData | string): string {
    const { dobj } = this.#getData(data);
    return dobj || '';
  }
}
