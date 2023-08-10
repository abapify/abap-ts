import { Token } from './token';

export type Tokens = Array<any>;

export class List extends Token<Tokens> {
  protected separator = ',\n';
  override toString() {
    return this.meta
      .map((token) => token.toString())
      .filter((f) => f)
      .join(this.separator);
  }
}

export class Code extends List {
  override separator = '.\n';
}
