import { BlockableMap } from './base/record';
import { statementTypes } from './base/statementTypes';
import { ExistingType, TypeLike } from './types/existing';
import { AbapType, PredefinedType } from './types/predefined';

type TypeInput = any;

export class Types extends BlockableMap<TypeInput> {
  static override readonly type = statementTypes.types;
  override statement = statementTypes.types;
  override renderData(data: object) {
    // abap type, supports length and decimals
    if (this.#isPredefinedAbapType(data)) {
      return new PredefinedType().renderData(data);
    }
    // ref to existing type ( inlcuing line of )
    if (this.#isExistingType(data)) {
      return new ExistingType().renderData(data);
    }

    return super.renderData(data);
  }
  #isPredefinedAbapType(input: object): input is AbapType {
    return input && !!(input as AbapType).abap_type;
  }
  #isExistingType(input: object): input is TypeLike {
    return input && !!((input as TypeLike).type || (input as TypeLike).like);
  }
}


