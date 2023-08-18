import { cache } from './cache';

export enum IndentType {
  tab = '\t',
  space = ' ',
}

const IndentCache = {
  [IndentType.tab]: cacheIndent(IndentType.tab),
  [IndentType.space]: cacheIndent(IndentType.space),
};

function cacheIndent(indentType: IndentType) {
  return cache((indent?: number) =>
    Array(number(indent)).fill(indentType).join('')
  );
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

  #config?: CodeConfig;
  #indentSymbol: IndentType;

  constructor(config?: CodeConfig) {
    this.#config = config;
    this.#indentSymbol = config?.format?.indentType || IndentType.tab;
  }
  #indent(indent?: number, config?: FormatConfig) {
    return IndentCache[config?.indentType || this.#indentSymbol](indent);
  }

  write(chunk: ChunkType, format?: CodeFormat) {
    this.#chunks.push({ chunk, format });
    return this;
  }
  render(config?: FormatConfig): Array<string> {
    const lines: Array<string> = [];

    const formatConfig = config || this.#config?.format;

    for (const { chunk, format } of this.#chunks) {
      const chunk_lines: Array<string> = [];

      for (const line of Array.isArray(chunk) ? chunk : [chunk]) {
        if (typeof line === 'string') {
          chunk_lines.push(line);
        } else if (line instanceof Code) {
          chunk_lines.push(...line.render(formatConfig));
        }
      }

      lines.push(
        ...chunk_lines.map((line) =>
          this.#indent(format?.indent, formatConfig).concat(line)
        )
      );
    }

    return lines;
  }
}
