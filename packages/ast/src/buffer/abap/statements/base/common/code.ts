import { IndentCache, IndentType } from './indent';

export * from './indent';

interface FormatConfig {
  indentType: IndentType;
}

export interface CodeFormat {
  indent?: number;
  separator?: string;
  end?: string;
  join?: boolean;
}

interface CodeConfig {
  format?: FormatConfig;
}

export class Code<ChunkType extends unknown> {
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

        let code_lines: Array<string>;

        if (typeof line === 'string') {
          code_lines = [line];
          // chunk_lines.push(separator ? line.concat(separator) : line);
        } else if (line instanceof Code) {
          code_lines = line.render(formatConfig);
        } else {
          code_lines = this.renderData(line);
        }

        if (separator && code_lines.length) {
          code_lines[code_lines.length - 1] =
            code_lines[code_lines.length - 1].concat(separator);
        }
        chunk_lines.push(...code_lines);
      });

      const formatted_lines = chunk_lines.map((line) =>
        this.#indent(format?.indent, formatConfig).concat(line)
      );

      if (format?.join) {
        lines.push(formatted_lines.join(' '));
      } else {
        lines.push(...formatted_lines);
      }
    }

    return lines;
  }
  protected renderData(data: ChunkType): string[] {
    throw 'Method not supported. Must be redefined in a child class.';
  }
  get size() {
    return this.#chunks.length;
  }
}
