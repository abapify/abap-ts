import { BlockableSatement } from './base/block';
import { statementTypes } from './base/statementTypes';

type TypeInput = any;

export class extends BlockableSatement<TypeInput> {
  override statement = statementTypes.types;
  override renderData(data: TypeInput){
    return 
  }
}
