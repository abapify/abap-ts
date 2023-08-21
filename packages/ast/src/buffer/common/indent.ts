import { cache } from './cache';

export enum IndentType {
  tabs = '\t',
  spaces = ' ',
}

export const IndentCache = {
  [IndentType.tabs]: cacheIndent(IndentType.tabs),
  [IndentType.spaces]: cacheIndent(IndentType.spaces),
};

function cacheIndent(indentType: IndentType) {
  return cache((indent?: number) =>
    Array(number(indent)).fill(indentType).join('')
  );
}

function number(number?: number): number {
  return number || 0;
}
