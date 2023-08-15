import { TableType, TableTypeData } from './table';

export const tests: [TableTypeData, string][] = [
  [
    {
      t_string: {
        type: {
          table: { of: 'string' },
        },
      },
    },
    'types t_string type table of string with empty key',
  ],

  [
    {
      t_string: {
        type: {
          table: { of: 'string' },
          with: 'default key',
        },
      },
    },
    'types t_string type table of string with default key',
  ],
  [
    {
      t_string: {
        type: {
          table: { of: 'string' },
          with: {
            unique: true,
            default: true,
          },
        },
      },
    },
    'types t_string type table of string with unique default key',
  ],
];

test('Existing type', () => {
  tests.forEach(([input, result]) =>
    expect(new TableType(input).render()).toEqual(result)
  );
});
