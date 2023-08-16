import { Types, TypesInput } from '../types';
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

type ComponentType = TypesInput;
type Component = Record<string, ComponentType>;
type Components = Component | Array<Component | { include: IncludeTypeInput }>;

export interface StructuredTypeInput {
  name?: string;
  components: Components;
}

export class StructuredType extends AbapStatement<StructuredTypeInput> {
  override render(): string {
    const { name, components } = this.data;

    const types = new Types(components);

    return [
      `types begin of ${name}`,
      types.render(),
      `types end of ${name}`,
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
