import { code } from './code';
import { get } from './factory';
import { Token } from './token';
import { List, Tokens } from './tokenList';

interface BlockMeta {
  block: string;
  tokens?: Tokens;
}

export class Block extends Token<BlockMeta> {
  constructor(block: string, tokens?: Tokens) {
    super({ block, tokens });
  }
  override toString() {
    const { block, tokens } = this.meta;
    if (tokens?.length) {
      return code`
${block}${tokens?.length > 1 ? ':' : ''}
${get.list(tokens).toString()}`;
    }
    return '';
  }
}
