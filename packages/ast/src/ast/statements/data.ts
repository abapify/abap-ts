import { BlockableMap } from './base/record';
import { statementTypes } from './base/statementTypes';
import getDataClass from './data/getDataClass';
import { TypesInput } from './types';
import { ExistingType, ExistingTypeInput } from './types/existing';
import { PredefinedType, PredefinedTypeInput } from './types/predefined';
import {
  IncludeType,
  StructuredType,
  StructuredTypeInput,
} from './types/structured';
import { TableType, TableTypeInput } from './types/table';

interface DataValue {
  value?: { initial: true } | string;
  readonly?: boolean;
}

type DataInput = TypesInput & DataValue;

const PredefinedData = getDataClass<PredefinedType>(PredefinedType);
const ExistingData = getDataClass<ExistingType>(ExistingType);

export class Data extends BlockableMap<DataInput> {
  static readonly type = statementTypes.data;
  statement = statementTypes.data;
  override renderRecord(key: string, data: any): string {
    if (key === 'include') {
      return new IncludeType(data).render();
    }
    if (typeof data === 'string') {
      return super.renderData({ data: { [key]: { type: data } } });
    }
    // abap type, supports length and decimals
    if (this.#isPredefinedAbapType(data)) {
      return `data ${key} ${new PredefinedData(data).render()}`;
    }
    // structured type cannot be done on the data level, it needs whole record
    if (this.#isStructuredType(data)) {
      data.name = data.name || key;
      return new StructuredType(data).render();
    }
    //table type
    if (this.#isTableType(data)) {
      //      return new TableType(data).render();
      return `data ${key} ${new TableType(data).render()}`;
    }
    // ref to existing type ( inlcuing line of or ref to)
    if (this.#isExistingType(data)) {
      return `data ${key} ${new ExistingData(data).render()}`;
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

export type DataData = Data['data'];
