import { AbapCodeBase, Chunks } from './base';

export class AbapCodeBlock extends AbapCodeBase {
  constructor(block: string, chunks: Chunks) {
    super();
    this.write(block.concat(':'));
    this.write(chunks, { indent: 2, separator: ',' });
  }
}
