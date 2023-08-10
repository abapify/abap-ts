import { type } from 'os';
import { Block } from './block';
import { Code, List, Tokens } from './tokenList';
import { TypeMeta } from '../types';

class Factory {
  list(tokens: Tokens) {
    return new List(tokens);
  }
  block(block: string, list?: Tokens) {
    return new Block(block, list);
  }
  code(blocks: Tokens | Record<string, Tokens | undefined>) {
    if (Array.isArray(blocks)) {
      return new Code(blocks);
    } else {
      return new Code(
        Object.entries(blocks).map(([block, tokens]) =>
          this.block(block, tokens)
        )
      );
    }
  }
  type(type: TypeMeta) {
    if type.
  }
}

export const get = new Factory();
