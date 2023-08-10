import { Token } from '../base/token';

export interface ExistingTypeMeta {
  name: string;
  like?: boolean;
  line_of?: boolean;
  type: string;
}

export class ExistingType extends Token<ExistingTypeMeta> {
  override toString(): string {
    const { name, like, line_of, type } = this.meta;
    return [name, like ? 'like' : 'type', line_of && 'line of', type]
      .filter((f) => f)
      .join(' ');
  }
}
