import { Token } from './token';

export type ArrayOrRecord<T extends Token<any>> =
  | Array<T | string>
  | Record<string, T | Partial<T['meta']> | undefined>;
