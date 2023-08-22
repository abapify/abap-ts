import abapgen from '../../../abapgen/abapgen';

export type AbapStatemenData = unknown;

export abstract class AbapStatement<DataType extends AbapStatemenData> {
  #data: DataType;
  public get data() {
    return this.#data;
  }
  constructor(data: DataType) {
    this.#data = data;
  }
  abstract render(): string;
  protected renderData(data: AbapStatemenData) {
    return abapgen(data);
  }
}

class ConcreteStatement extends AbapStatement<AbapStatemenData> {
  override render(): string {
    throw 'Must not be called';
  }
}

export type ConcreteAbapStatement = typeof ConcreteStatement;
