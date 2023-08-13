export enum statementTypes {
  write = 'write',
  skip = 'skip',
  types = 'types',
}

export type statementType = keyof typeof statementTypes;
