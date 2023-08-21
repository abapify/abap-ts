import { IndentCache, IndentType } from './indent';

export * from './indent';

interface FormatConfig {
  indentType: IndentType;
}

type ThisOrArray<T> = T | Array<T>;
type ChunkType = ThisOrArray<string | Code>;

export interface CodeFormat {
  indent?: number;
  separator?: string;
  end?: string;
}

interface CodeConfig {
  format?: FormatConfig;
}

export class Code {
  #chunks = [] as Array<{
    chunk: ChunkType;
    format?: CodeFormat;
  }>;

  #config?: CodeConfig;
  #indentSymbol: IndentType;

  constructor(config?: CodeConfig) {
    this.#config = config;
    this.#indentSymbol = config?.format?.indentType || IndentType.tabs;
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

      (Array.isArray(chunk) ? chunk : [chunk]).forEach((line, index, array) => {
        // we add separator to all lines except latest ( analog to Array.join )
        let separator;
        if (index + 1 === array.length) {
          if (format?.end) {
            separator = format.end;
          }
        } else {
          if (format?.separator) {
            separator = format.separator;
          }
        }

        // const separator =
        // index + 1 < array.length format?.separator && index + 1 < array.length
        //     ? format?.separator
        //     : '';

        if (typeof line === 'string') {
          chunk_lines.push(separator ? line.concat(separator) : line);
        } else if (line instanceof Code) {
          const code_lines = line.render(formatConfig);
          if (separator && code_lines.length) {
            code_lines[code_lines.length - 1] =
              code_lines[code_lines.length - 1].concat(separator);
          }
          chunk_lines.push(...code_lines);
        }
      });

      lines.push(
        ...chunk_lines.map((line) =>
          this.#indent(format?.indent, formatConfig).concat(line)
        )
      );
    }

    return lines;
  }
}
