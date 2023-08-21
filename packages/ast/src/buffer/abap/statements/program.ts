import { AbapCode } from './base/code';
import { Parameters, ParametersInput } from './parameters';

export interface ProgramInput {
  name: string;
}

type Statements<T extends any, S = T | string> = Array<S> | Record<string, S>;

export class Program extends AbapCode {
  constructor({ name }: ProgramInput) {
    super();
    this.write(`program ${name}.`);
  }
  parameters(input: Statements<ParametersInput>) {
    let chunks: Array<string | Parameters>;

    if (Array.isArray(input)) {
      chunks = input.map((i) =>
        typeof i === 'string' ? i : new Parameters(i, { nested: true })
      );
    } else if (typeof input === 'object') {
      chunks = Object.entries(input).map(([key, value]) =>
        typeof value === 'string'
          ? new Parameters({ name: key, type: value }, { nested: true })
          : new Parameters(value, { name: key, nested: true })
      );
    } else {
      throw 'Not supported';
    }

    this.block('parameters', chunks, { end: '.' });
  }
}
