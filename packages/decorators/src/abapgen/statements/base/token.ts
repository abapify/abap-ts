export abstract class Token<T extends Record<string, any>> {
  meta: T;
  abstract toString(): string
  constructor(meta: T) {
    this.meta = meta;
  }
} 

