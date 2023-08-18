export enum statementTypes {
  write = 'write',
  skip = 'skip',
  types = 'types',
  interface = 'interface',
  data = 'data',
}

export type statementType = keyof typeof statementTypes;
