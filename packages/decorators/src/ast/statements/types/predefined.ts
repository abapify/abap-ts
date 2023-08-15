import { BlockableMap } from '../base/record';

// Syntax
// TYPES { {dtype[(len)] TYPE abap_type [DECIMALS dec]}
//       | {dtype TYPE abap_type [LENGTH len] [DECIMALS dec]}}.

interface AbapType {
  abap_type: string;
  length?: number;
  decimals?: number;
}

export type PredefinedTypeInput = AbapType;

export class PredefinedType extends BlockableMap<AbapType> {
  override renderRecord(key: string, data: PredefinedTypeInput): string {
    const { abap_type, length, decimals } = data;
    return `types ${key} ${this.renderData({
      type: abap_type,
      length,
      decimals,
    })}`;
  }
}

export type PredefinedTypeData = PredefinedType['data'];
