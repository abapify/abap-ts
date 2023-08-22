import { AbapCode } from '../base/abap';
// Syntax
// TYPES { {dtype[(len)] TYPE abap_type [DECIMALS dec]}
//       | {dtype TYPE abap_type [LENGTH len] [DECIMALS dec]}}.

export interface AbapType {
  abap_type: string;
  length?: number;
  decimals?: number;
}

export type PredefinedTypeInput = AbapType;

export class PredefinedType extends AbapCode {
  constructor(input: PredefinedTypeInput) {
    super();
    const { abap_type, length, decimals } = input;
    this.write({
      type: abap_type,
      length,
      decimals,
    });
  }
}
