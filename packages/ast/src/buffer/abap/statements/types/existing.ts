// Syntax
import { AbapCode } from '../base/abap';

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

export class ExistingType extends AbapCode {
  constructor(input: ExistingTypeInput) {
    super();

    const { type, like } = input;
    if (type) {
      this.write({ type });
    } else if (like) {
      this.write({ like });
    } else {
      throw 'Not supported';
    }
  }
}
