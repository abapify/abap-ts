import { AbapStatemenData, AbapStatement } from './abap';

type ThisOrArrayOfThis<T> = T | Array<T>;

export abstract class BlockableStatement<
  T extends AbapStatemenData
> extends AbapStatement<ThisOrArrayOfThis<T>> {
  abstract statement: string;
  renderArray(input: Array<string | boolean | undefined>) {
    return input.filter((f) => f).join(' ');
  }
  render() {
    const statement = this.statement;
    if (Array.isArray(this.data)) {
      return `${statement}:\n`.concat(
        this.data.map((d) => super.renderData(d)).join(',\n')
      );
    } else if (this.data) {
      return `${statement} ${this.renderData(this.data)}`;
    } else {
      return statement;
    }
  }
}
