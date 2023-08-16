import { BlockableMap } from './base/record';
import { statementTypes } from './base/statementTypes';
import { ExistingType, ExistingTypeInput } from './types/existing';
import { PredefinedType, PredefinedTypeInput } from './types/predefined';
import {
  IncludeType,
  StructuredType,
  StructuredTypeInput,
} from './types/structured';
import { TableType, TableTypeInput } from './types/table';

export type TypesInput =
  | ExistingTypeInput
  | PredefinedTypeInput
  | StructuredTypeInput
  | TableTypeInput
  | string;

export class Types extends BlockableMap<TypesInput> {
  static readonly type = statementTypes.types;
  statement = statementTypes.types;
  override renderRecord(key: string, data: any): string {
    if (key === 'include') {
      return new IncludeType(data).render();
    }
    if (typeof data === 'string') {
      return super.renderData({ types: { [key]: { type: data } } });
    }
    // abap type, supports length and decimals
    if (this.#isPredefinedAbapType(data)) {
      return `types ${key} ${new PredefinedType(data).render()}`;
    }
    // structured type cannot be done on the data level, it needs whole record
    if (this.#isStructuredType(data)) {
      data.name = data.name || key;
      return new StructuredType(data).render();
    }
    //table type
    if (this.#isTableType(data)) {
      //      return new TableType(data).render();
      return `types ${key} ${new TableType(data).render()}`;
    }
    // ref to existing type ( inlcuing line of or ref to)
    if (this.#isExistingType(data)) {
      return `types ${key} ${new ExistingType(data).render()}`;
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

export type TypesData = Types['data'];
