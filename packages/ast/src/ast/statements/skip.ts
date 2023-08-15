import { AbapStatement, statementTypes } from './base/abap';

export class Skip extends AbapStatement<never> {
  static override readonly type = statementTypes.skip;
  override render(): string {
    return `skip`;
  }
}
