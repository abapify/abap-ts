// Syntax

import { AbapStatement } from '../base/base';

// TYPES table_type { {TYPE tabkind OF [REF TO] type}
//                    | {LIKE tabkind OF dobj} }
//           [tabkeys]
//                  [INITIAL SIZE n].

export interface TableTypeInput {
  type?: {
    tabkind?: tabkind;
    table: { of: string | { ref: { to: string } } };
    with?: keys;
  };
  like?: {
    tabkind?: tabkind;
    table: { of: string };
    with?: keys;
  };
}

export class TableType extends AbapStatement<TableTypeInput> {
  override render(): string {
    // if (this.data) {
    const { type, like } = this.data;
    if (type) {
      return [
        'type',
        type?.tabkind,
        'table',
        this.renderData({
          of: type?.table.of,
        }),
        this.#renderWith(type.with),
      ]
        .filter((f) => f)
        .join(' ');
    } else if (like) {
      return [
        'like',
        like?.tabkind,
        'table',
        like?.table.of,
        this.#renderWith(like.with),
      ]
        .filter((f) => f)
        .join(' ');
    }
    throw 'Table type not supported';
  }
  #renderWith(keys?: keys) {
    if (Array.isArray(keys)) {
      const primary = keys.shift();
      return this.#renderKeys(primary, keys);
    }
    return this.#renderKeys(keys as primary_key);
  }
  #renderKeys(primary?: primary_key, secondary_keys?: secondary_key[]) {
    if (!primary) {
      return 'with empty key';
    }
    return [
      this.#renderPrimaryKey(primary),
      this.#renderSecondaryKeys(secondary_keys),
    ]
      .filter((f) => f)
      .join(' ');
  }
  #renderPrimaryKey(key: primary_key) {
    // default key
    if (typeof key === 'object') {
      if (!key.components?.length || key.default) {
        return ['with', this.#renderUnique(key.unique), 'default key']
          .filter((f) => f)
          .join(' ');
      }
    }
    return this.#renderKey(key);
  }
  #renderSecondaryKeys(keys?: secondary_key[]) {
    return keys
      ?.map((key) => this.#renderKey(key))
      .filter((f) => f)
      .join('');
  }
  #renderUnique(unique?: boolean) {
    return unique === true ? 'unique' : unique === false ? 'non-unique' : '';
  }

  #renderKey(key: primary_key | secondary_key) {
    if (typeof key === 'string') {
      return `with ${key}`;
    }
    if (typeof key === 'object') {
      return [
        'with',
        key.unique === true
          ? 'unique'
          : key.unique === false
          ? 'non-unique'
          : '',
        key.hashed ? 'hashed' : key.sorted ? 'sorted' : '',
        'key',
        key.key,
        'components',
        key.components?.join(' '),
      ]
        .filter((f) => f)
        .join(' ');
    }
    throw 'Table key type not supported';
  }
}

type keys = primary_key | tabkeys;

export type TableTypeData = NonNullable<TableType['data']>;

// TYPES - tabkind
// ... { {[STANDARD] TABLE}
//     | {SORTED TABLE}
//     | {HASHED TABLE}
//     | {ANY TABLE}
//     | {INDEX TABLE} } ...

enum tabkind {
  standard = 'standard',
  sorted = 'sorted',
  hashed = 'hashed',
  any = 'any',
  index = 'index',
}

// TYPES - tabkeys
// ... [ WITH key ]
//     [ WITH secondary_key1 ] [ WITH secondary_key2 ] ...
//     [ {WITH|WITHOUT} FURTHER SECONDARY KEYS ] ...

interface tabkeys {
  with: [primary_key, ...secondary_key[]];
}

// TYPES - key
// ... { [UNIQUE | NON-UNIQUE]
//       { {KEY [primary_key [ALIAS key_name] COMPONENTS] comp1 comp2 ...}
//       | {DEFAULT KEY} }  }
//   | { EMPTY KEY } ...

// ... {UNIQUE HASHED}|{UNIQUE SORTED}|{NON-UNIQUE SORTED}
//     KEY key_name COMPONENTS comp1 comp2 ...

interface tabkey {
  key?: string;
  alias?: string;
  unique?: boolean;
  default?: true;
  hashed?: true;
  sorted?: true;
  components?: Array<string>;
}

type primary_key = tabkey | 'empty key' | 'default key';
type secondary_key = Omit<tabkey, 'alias'>;
