import { AbapCode } from './base/abap';

// Syntax

// PARAMETERS {para[(len)]}|{para [LENGTH len]}
//            [type_options]
//            [screen_options]
//            [value_options]
//            [ldb_options].

// ... { TYPE type [DECIMALS dec] }
//   | { LIKE dobj }
//   | { LIKE (name) } ...

interface DecimalsType {
  type: string;
  decimals?: number;
}

export interface ParametersInput {
  name?: string;
  length?: number;
  type?: string | DecimalsType;
  like?: string;
}

interface Options {
  name?: string;
  nested?: boolean;
}

export class Parameters extends AbapCode {
  constructor(input: ParametersInput, options?: Options) {
    super();

    const { length, type, like } = input;

    this.write(
      [
        options?.nested ? '' : 'parameters',
        input?.name || options?.name,
        length && `length ${length}`,
        (type && `type ${typeof type === 'string' ? type : type.type}`) ||
          (like && `like ${like}`),
        isDecimal(type) && `decimals ${type.decimals}`,
      ]
        .filter((f) => f)
        .join(' ')
        .concat(options?.nested ? '' : '.')
    );
  }
}

function isDecimal(type: ParametersInput['type']): type is DecimalsType {
  return !!(type as DecimalsType)?.decimals;
}
