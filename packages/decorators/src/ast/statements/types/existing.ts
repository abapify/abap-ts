// Syntax

import { BlockableStatement } from '../base/block';

// TYPES dtype { {TYPE [LINE OF] type}
//             | {LIKE [LINE OF] dobj}  }.

interface LineOf {
  line: {
    of: string;
  };
}

export type TypeLike = Partial<Record<'type' | 'like', LineOf | string>>;

export type ExistingTypeInput = Record<string, TypeLike>;

export class ExistingType extends BlockableStatement<ExistingTypeInput> {
  override statement = 'types';
}
