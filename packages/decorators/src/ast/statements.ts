import { ConcreteAbapStatement, statementType } from './statements/base/abap';
import { Skip } from './statements/skip';
import { Types } from './statements/types';
import { Write } from './statements/write';

const classes = [Write, Skip, Types] as Array<ConcreteAbapStatement>;

export const statements = new Map(
  classes.map((statement) => [statement.type, statement])
);

type PrefixWithDollar<T extends string> = `$${T}`;
export type StatementShortcutType = PrefixWithDollar<statementType>;

export const shortcuts = new Map(
  classes.map((statement) => [
    `$${statement.type}`, // as StatementShortcutType,
    statement,
  ])
);
