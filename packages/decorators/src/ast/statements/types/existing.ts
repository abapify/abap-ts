// Syntax

import { BlockableMap } from '../base/record';
import { statementTypes } from '../base/statementTypes';

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
  override statement = statementTypes.types;
  override renderRecord(key: string, data: ExistingTypeInput): string {
    return `${this.statement} ${key} ${this.renderData(data)}`;
  }
}

export type ExistingTypeData = ExistingType['data'];
