import { cache } from './cache';

enum IndentType {
  tab = '\t',
  space = ' ',
}

interface FormatConfig {
  indentType: IndentType;
}

type ThisOrArray<T> = T | Array<T>;
type ChunkType = ThisOrArray<string | Code>;

interface CodeFormat {
  indent?: number;
}

function number(number?: number): number {
  return number || 0;
}

interface CodeConfig {
  format?: FormatConfig;
}

export class Code {
  #chunks = [] as Array<{ chunk: ChunkType; format?: CodeFormat }>;
  #indent: (number?: number) => string;

  constructor(config?: CodeConfig) {
    const indentSymbol = config?.format?.indentType || IndentType.tab;
    this.#indent = cache((indent?: number) =>
      Array(number(indent)).fill(indentSymbol).join('')
    );
  }
  write(chunk: ChunkType, format?: CodeFormat) {
    this.#chunks.push({ chunk, format });
  }
  format(): Array<string> {
    const lines: Array<string> = [];

    for (const { chunk, format } of this.#chunks) {
      const chunk_lines: Array<string> = [];

      for (const line of Array.isArray(chunk) ? chunk : [chunk]) {
        if (typeof line === 'string') {
          chunk_lines.push(line);
        } else if (line instanceof Code) {
          chunk_lines.push(...line.format());
        }
      }

      lines.push(
        ...chunk_lines.map((line) => this.#indent(format?.indent).concat(line))
      );
    }

    return lines;
  }
}
