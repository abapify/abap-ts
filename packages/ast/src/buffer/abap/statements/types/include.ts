import { AbapCode } from '../base/abap';

export interface IncludeTypeInput {
  type?: string;
  structure?: string;
  as?: string;
  suffix?: string;
}

export class IncludeType extends AbapCode {
  constructor(input: IncludeTypeInput) {
    super();

    const { type, structure, as, suffix } = input;

    this.write(
      [
        'include',
        (type && `type ${type}`) || (structure && `structure ${structure}`),
        as && `as ${as}`,
        as && suffix && `renaming with suffix ${suffix}`,
      ]
        .filter((f) => f)
        .join(' ')
    );
  }
}
