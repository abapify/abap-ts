import { BlockableMap } from './base/record';
import { statementTypes } from './base/statementTypes';
import { ExistingType, ExistingTypeInput } from './types/existing';
import { PredefinedType, PredefinedTypeInput } from './types/predefined';
import { StructuredType, StructuredTypeInput } from './types/structured';
import { TableType, TableTypeInput } from './types/table';

type TypeInput = any;

export class Types extends BlockableMap<TypeInput> {
  static override readonly type = statementTypes.types;
  statement = statementTypes.types;
  override renderRecord(key: string, data: any): string {
    if (typeof data === 'string') {
      return super.renderData({ types: { [key]: { type: data } } });
    }
    // abap type, supports length and decimals
    if (this.#isPredefinedAbapType(data)) {
      return new PredefinedType().renderRecord(key, data);
    }
    // structured type cannot be done on the data level, it needs whole record
    if (this.#isStructuredType(data)) {
      return new StructuredType().renderRecord(key, data);
    }
    //table type
    if (this.#isTableType(data)) {
      return new TableType().renderRecord(key, data);
    }
    // ref to existing type ( inlcuing line of or ref to)
    if (this.#isExistingType(data)) {
      return new ExistingType().renderRecord(key, data);
    }
    // return super.renderData({ [key]: data });
    throw 'Not supported';
  }
  #isPredefinedAbapType(input: object): input is PredefinedTypeInput {
    return input && !!(input as PredefinedTypeInput).abap_type;
  }
  #isExistingType(input: object): input is ExistingTypeInput {
    return (
      input &&
      !!((input as ExistingTypeInput).type || (input as ExistingTypeInput).like)
    );
  }
  #isStructuredType(input: object): input is StructuredTypeInput {
    return input && !!(input as StructuredTypeInput).components;
  }
  #isTableType(input: object): input is TableTypeInput {
    return (
      !!(input as TableTypeInput)?.type?.table ||
      !!(input as TableTypeInput)?.like?.table
    );
  }
}
