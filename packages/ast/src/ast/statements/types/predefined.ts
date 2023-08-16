import { AbapStatement } from '../base/base';
// Syntax
// TYPES { {dtype[(len)] TYPE abap_type [DECIMALS dec]}
//       | {dtype TYPE abap_type [LENGTH len] [DECIMALS dec]}}.

interface AbapType {
  abap_type: string;
  length?: number;
  decimals?: number;
}

export type PredefinedTypeInput = AbapType;

export class PredefinedType extends AbapStatement<AbapType> {
  override render(): string {
    const { abap_type, length, decimals } = this.data;
    // to provide the correct sequence for ABAPgen
    return `${super.renderData({
      type: abap_type,
      length,
      decimals,
    })}`;
  }
}

export type PredefinedTypeData = PredefinedType['data'];
