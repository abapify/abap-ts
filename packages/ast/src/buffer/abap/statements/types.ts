import { AbapCode } from './base/abap';
import { ExistingType, ExistingTypeInput } from './types/existing';
import { IncludeType, IncludeTypeInput } from './types/include';
import { PredefinedType, PredefinedTypeInput } from './types/predefined';
import { StructuredType, StructuredTypeInput } from './types/structured';
import { TableType, TableTypeInput } from './types/table';

export type TypesType =
  | ExistingTypeInput
  | PredefinedTypeInput
  | StructuredTypeInput
  | TableTypeInput
  | string;

export interface TypesInput {
  $name?: string;
  type?: TypesType;
  // $include?: IncludeTypeInput;
}

// {a: { include: { type: "test_ts"} }}

export class Types extends AbapCode {
  constructor({ $name: key, type: data }: TypesInput) {
    super();

    // include case
    // if ($include) {
    //   this.write(new IncludeType($include));
    // } else
    if (key) {
      if (typeof data === 'string') {
        this.write({ types: { [key]: { type: data } } });
      }
      // abap type, supports length and decimals
      else if (this.#isPredefinedAbapType(data)) {
        this.write([`types ${key}`, new PredefinedType(data)], { join: true });
      }
      // structured type cannot be done on the data level, it needs whole record
      else if (this.#isStructuredType(data)) {
        data.name = data.name || key;
        this.write(new StructuredType(data));
      }
      //table type
      else if (this.#isTableType(data)) {
        this.write([`types ${key}`, new TableType(data)]);
      }
      // ref to existing type ( inlcuing line of or ref to)
      else if (this.#isExistingType(data)) {
        this.write([`types ${key}`, new ExistingType(data)]);
      }
    }

    if (!this.size) {
      throw 'Not supported';
    }
    // return super.renderData({ [key]: data });
  }
  #isPredefinedAbapType(input?: TypesType): input is PredefinedTypeInput {
    return !!(input && (input as PredefinedTypeInput).abap_type);
  }
  #isExistingType(input?: TypesType): input is ExistingTypeInput {
    return !!(
      input &&
      ((input as ExistingTypeInput).type || (input as ExistingTypeInput).like)
    );
  }
  #isStructuredType(input?: TypesType): input is StructuredTypeInput {
    return !!(input && (input as StructuredTypeInput).components);
  }
  #isTableType(input?: TypesType): input is TableTypeInput {
    return !!(
      (input as TableTypeInput)?.type?.table ||
      (input as TableTypeInput)?.like?.table
    );
  }
}
