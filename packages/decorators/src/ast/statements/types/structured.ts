// 4. TYPES BEGIN OF struc_type.
//      ...
//      TYPES comp ...
//      TYPES comp TYPE struc_type BOXED.
//      INCLUDE {TYPE|STRUCTURE} ...
//      ...
//   TYPES END OF struc_type.

import { BlockableMap } from '../base/record';
import { Types } from '../types';

export interface Component {}

export interface StructuredTypeInput {
  components: Array<Component>;
}

export class StructuredType extends BlockableMap<StructuredTypeInput> {
  override statement = '';
  override renderRecord(key: string, data: StructuredTypeInput): string {
    const types = new Types(data.components);

    return [
      `types begin of ${key}`,
      types.render(),
      `types end of ${key}`,
    ].join('.\n');
  }
}

export type StructuredTypeData = StructuredType['data'];
