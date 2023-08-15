import assert = require('assert');
import { statements, shortcuts, StatementShortcutType } from './statements';
import {
  AbapStatement,
  ConcreteAbapStatement,
  statementTypes,
} from '../statements/base/abap';

interface AbapStatementInput {
  type?: statementTypes;
  data?: unknown;
}

type ShortcutRecordType = Record<StatementShortcutType, any>;

export class Transformer {
  // generic transform of any object
  transform(input: object): InstanceType<ConcreteAbapStatement> {
    if (Array.isArray(input)) {
      return this.transformArray(input);
    } else if (this.isStatement(input)) {
      return this.transformStatement(input);
    } else if (this.isShortcut(input)) {
      return this.transformShortcuts(input);
    }
    throw 'Not supported';
  }
  // transforms arrays of generic objects
  transformArray(input: Array<object>) {
    return new StatementList(input.map((o) => this.transform(o)));
  }
  // transforms object in a form of AbapStatement ( provided with a type )
  transformStatement(input: AbapStatementInput) {
    // node type is not provided
    assert(input.type, 'Node type is not provided');
    // node type is unkknown
    assert(statements.has(input.type), 'Node type is unknown');

    const statement = statements.get(input.type);
    assert(statement, `${input.type} constructor is undefined`);

    return new statement(input.data);
  }
  // transforms shortcut object
  transformShortcuts(input: ShortcutRecordType) {
    return this.transformArray(
      Object.entries(input).map(([key, data]) => ({
        type: shortcuts.get(key)?.type,
        data,
      }))
    );
  }
  // full-from statement guard
  isStatement(input: object): input is AbapStatementInput {
    return (
      input !== null &&
      'type' in input &&
      typeof (input as AbapStatementInput).type === 'string'
    );
  }
  // shortcut-form statement guard
  isShortcut(input: object): input is ShortcutRecordType {
    return Object.keys(input).every((k) => shortcuts.has(k));
  }
  static from(input: object) {
    return new Transformer().transform(input);
  }
}

class StatementList extends AbapStatement<
  Array<InstanceType<ConcreteAbapStatement>>
> {
  override render(): string {
    return this.data?.map((s) => s.render()).join() || '';
  }
}
