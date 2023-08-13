import { statementTypes } from './statementTypes';
import abapgen from 'packages/decorators/src/abapgen/abpagen';

export type AbapStatemenData = unknown;

export abstract class AbapStatement<DataType extends AbapStatemenData> {
  static type: statementTypes;
  #data?: DataType;
  public get data() {
    return this.#data;
  }
  constructor(data?: DataType) {
    if (data) {
      this.#data = data;
    }
  }
  abstract render(): string;
  renderData(data: unknown): string {
    return abapgen(data);
  }
}

class ConcreteStatement extends AbapStatement<AbapStatemenData> {
  override render(): string {
    throw 'Must not be called';
  }
}

export type ConcreteAbapStatement = typeof ConcreteStatement;
