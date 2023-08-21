import { CodeFormat } from '../common/code';
import { AbapCodeBase, Chunks } from './base';
import { AbapCodeBlock } from './block';
export * from './base';

export class AbapCode extends AbapCodeBase {
  block(block: string, chunks: Chunks, format?: CodeFormat) {
    this.write(new AbapCodeBlock(block, chunks), format);
  }
}
