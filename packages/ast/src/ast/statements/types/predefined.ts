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
  override renderData(data: PredefinedTypeInput): string {
    const { abap_type, length, decimals } = data;
    // to provide the correct sequence for ABAPgen
    return `${super.renderData({
      type: abap_type,
      length,
      decimals,
    })}`;
  }

  override renderRecord(key: string, data: PredefinedTypeInput): string {
    return `types ${key} ${this.renderData(data)}`;
  }
}

export type PredefinedTypeData = NonNullable<PredefinedType['data']>;
