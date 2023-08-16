// Syntax

import { AbapStatement } from '../base/base';

// existing type/data
// TYPES dtype { {TYPE [LINE OF] type}
//             | {LIKE [LINE OF] dobj}  }.

// ref to existing type/existing data
// TYPES ref_type { {TYPE REF TO type}
//                | {LIKE REF TO dobj} }.

interface LineOf {
  line?: {
    of: string;
  };
  ref?: {
    to: string;
  };
}

export type ExistingTypeInput = Partial<
  Record<'type' | 'like', LineOf | string>
>;

export class ExistingType extends AbapStatement<ExistingTypeInput> {
  override render(): string {
    const { type, like } = this.data;
    if (type) {
      return this.renderData({ type });
    } else if (like) {
      return this.renderData({ like });
    }
    throw 'Not supported';
  }
}

export type ExistingTypeData = ExistingType['data'];
