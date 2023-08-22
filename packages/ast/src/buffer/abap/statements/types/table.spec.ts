import { TableType, TableTypeInput } from './table';

export const tests: [TableTypeInput, string][] = [
  [
    {
      type: {
        table: { of: 'string' },
      },
    },

    'type table of string with empty key',
  ],

  [
    {
      type: {
        table: { of: 'string' },
        with: 'default key',
      },
    },
    'type table of string with default key',
  ],
  [
    {
      type: {
        table: { of: 'string' },
        with: {
          unique: true,
          default: true,
        },
      },
    },
    'type table of string with unique default key',
  ],
];

test('Existing type', () => {
  tests.forEach(([input, result]) =>
    expect(new TableType(input).render()).toEqual([result])
  );
});
