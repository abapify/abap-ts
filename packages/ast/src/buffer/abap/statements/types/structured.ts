import { Types, TypesInput, TypesType } from '../types';
import { AbapCode } from '../base/abap';
import { IncludeType, IncludeTypeInput } from './include';

// 4. TYPES BEGIN OF struc_type.
//      ...
//      TYPES comp ...
//      TYPES comp TYPE struc_type BOXED.
//      INCLUDE {TYPE|STRUCTURE} ...
//      ...
//   TYPES END OF struc_type.

interface IncludeInput {
  $include: IncludeTypeInput;
}

type Component = Record<string, TypesType>;
type Components = Array<Component | TypesInput | IncludeInput>;

export interface StructuredTypeInput {
  name?: string;
  components: Components;
}

export class StructuredType extends AbapCode {
  constructor(input: StructuredTypeInput) {
    super();
    const { name, components } = input;

    // const types = new Types(components);
    if (components) {
      this.write(`types begin of ${name}.`);

      for (const component of components) {
        if (this.#isIncludeInput(component)) {
          this.write(new IncludeType(component.$include), { end: '.' });
        } else if (this.#isTypesInput(component)) {
          this.write(new Types(component), { end: '.' });
        } else {
          for (const [$name, type] of Object.entries(component)) {
            this.write(new Types({ $name, type }), { end: '.' });
          }
        }
      }
      this.write(`types end of ${name}.`);
    }
  }
  #isTypesInput(input: Components[number]): input is TypesInput {
    return !!(input as TypesInput)?.$name;
  }
  #isIncludeInput(input: Components[number]): input is IncludeInput {
    return !!(input as IncludeInput)?.$include;
  }
}
