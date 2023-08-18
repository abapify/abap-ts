// DATA { {var[(len)] TYPE abap_type [DECIMALS dec]}
// | {var TYPE abap_type [LENGTH len] [DECIMALS dec]} }
// [VALUE val|{IS INITIAL}]
// [READ-ONLY].

import { AbapStatement } from '../base/base';
import { PredefinedType } from '../types/predefined';

// https://help.sap.com/doc/abapdocu_latest_index_htm/latest/en-US/abapdata_simple.htm
// Syntax

// DATA { {var[(len)] TYPE abap_type [DECIMALS dec]}
//      | {var [TYPE abap_type [LENGTH len] [DECIMALS dec]]} }
//      [VALUE val|{IS INITIAL}]
//      [READ-ONLY].

interface DataValue {
  value?: { initial: true } | string;
  readonly?: boolean;
}

export default function <T extends AbapStatement<any>>(
  typeClass: new (data: T['data']) => T
) {
  return class DataClass extends AbapStatement<T['data'] & DataValue> {
    override render(): string {
      const { value, readonly } = this.data;
      const data_value =
        typeof value === 'string' ? value : value?.initial ? 'is initial' : '';
      return [
        new typeClass(this.data).render(),
        data_value && `value ${data_value}`,
        readonly && 'read-only',
      ]
        .filter((f) => f)
        .join(' ');
    }
    protected override renderData(data: unknown): string {
      return super.renderData(data);
    }
  };
}
