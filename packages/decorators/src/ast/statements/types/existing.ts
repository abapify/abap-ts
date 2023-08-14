// Syntax

import { BlockableMap } from '../base/record';

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

export type TypeLike = Partial<Record<'type' | 'like', LineOf | string>>;

export type ExistingTypeInput = TypeLike;

export class ExistingType extends BlockableMap<ExistingTypeInput> {
  override statement = 'types';
}

export type ExistingTypeData = ExistingType['data'];
