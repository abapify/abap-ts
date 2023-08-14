import { BlockableMap } from '../base/record';
import { statementTypes } from '../base/statementTypes';

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
  override statement = statementTypes.types;
  override renderRecord(key: string, data: PredefinedTypeInput): string {
    const { abap_type, length, decimals } = data;
    return `${this.statement} ${key} ${this.renderData({
      type: abap_type,
      length,
      decimals,
    })}`;
  }
}

export type PredefinedTypeData = PredefinedType['data'];
