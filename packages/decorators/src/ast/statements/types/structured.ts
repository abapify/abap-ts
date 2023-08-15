import { PredefinedTypeInput } from './predefined';
import { ExistingTypeInput } from './existing';
import { BlockableMap } from '../base/record';
import { Types } from '../types';
import { TableTypeInput } from './table';
import { AbapStatement } from '../base/base';

// 4. TYPES BEGIN OF struc_type.
//      ...
//      TYPES comp ...
//      TYPES comp TYPE struc_type BOXED.
//      INCLUDE {TYPE|STRUCTURE} ...
//      ...
//   TYPES END OF struc_type.
export interface IncludeTypeInput {
  type?: string;
  structure?: string;
  as?: string;
  suffix?: string;
}

type ComponentType =
  | ExistingTypeInput
  | PredefinedTypeInput
  | StructuredTypeInput
  | TableTypeInput
  | string;
type Component = Record<string, ComponentType>;
type Components = Component | Array<Component | { include: IncludeTypeInput }>;

export interface StructuredTypeInput {
  components: Components;
}

export class StructuredType extends BlockableMap<StructuredTypeInput> {
  override renderRecord(key: string, data: StructuredTypeInput): string {
    const types = new Types(data.components);

    return [
      `types begin of ${key}`,
      types.render(),
      `types end of ${key}`,
    ].join('.\n');
  }
}

export class IncludeType extends AbapStatement<IncludeTypeInput> {
  override render(): string {
    if (this.data) {
      const { type, structure, as, suffix } = this.data;
      return [
        'include',
        (type && `type ${type}`) || (structure && `structure ${structure}`),
        as && `as ${as}`,
        as && suffix && `renaming with suffix ${suffix}`,
      ]
        .filter((f) => f)
        .join(' ');
    }
    throw 'Inlcude not supported';
  }
}

export type StructuredTypeData = StructuredType['data'];
