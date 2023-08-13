import { compileFunction } from 'vm';
import { AbapStatemenData, AbapStatement } from './abap';

type ThisOrArrayOfThis<T> = T | Array<T>;

// statement which is block, but may support List of statements
// like data: or types: - they will require unique names
// so record is suitable here

export abstract class BlockableMap<
  T extends AbapStatemenData,
  R = Record<string, T>,
  P = Partial<R>
> extends AbapStatement<ThisOrArrayOfThis<R>> {
  abstract statement: string;

  renderRecord(data: P): string {
    if (data) {
      return Object.entries(data)
        .map(([key, data]) => `${key} ${this.renderData(data)}`)
        .join(',/n');
    }

    // fallback
    return this.renderData(data);
  }

  render() {
    const statement = this.statement;

    //this Object can be array of records
    //block becomes single only if 1 item defined
    const records: P[] = [];

    function makeSingleRecord(data: R): Array<P> {
      if (data) {
        return Object.entries(data).map(([key, data]) => ({
          [key]: data,
        })) as P[];
      }
      return [];
    }

    if (Array.isArray(this.data)) {
      this.data.forEach((r) => records.push(...makeSingleRecord(r)));
    } else if (this.data) {
      records.push(...makeSingleRecord(this.data));
    }

    return statement
      .concat(records.length > 1 ? ': ' : ' ')
      .concat(records.map((r) => this.renderRecord(r)).join(',\n'));
  }
}
