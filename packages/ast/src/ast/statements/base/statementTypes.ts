export enum statementTypes {
  write = 'write',
  skip = 'skip',
  types = 'types',
  interface = 'interface',
}

export type statementType = keyof typeof statementTypes;
