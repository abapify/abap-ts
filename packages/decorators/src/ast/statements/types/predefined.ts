import { BlockableMap } from '../base/record';

// Syntax
// TYPES { {dtype[(len)] TYPE abap_type [DECIMALS dec]}
//       | {dtype TYPE abap_type [LENGTH len] [DECIMALS dec]}}.

interface AbapType {
  abap_type: string;
  length?: number;
  decimals?: number;
}

export class PredefinedType extends BlockableMap<AbapType> {
  override statement = 'types';
  override renderData(data: AbapType) {
    const { abap_type, length, decimals } = data;
    return super.renderData({ type: abap_type, length, decimals });
  }
}

export type PredefinedTypeInput = PredefinedType['data'];
