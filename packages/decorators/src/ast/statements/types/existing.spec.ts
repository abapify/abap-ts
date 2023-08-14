import { ExistingType, ExistingTypeInput } from './existing';

export const tests: [ExistingTypeInput, string][] = [
  [{ t_string: { type: 'string' } }, 'types t_string type string'],
  [
    { t_string: { type: { line: { of: 'STRING_TT' } } } },
    'types t_string type line of STRING_TT',
  ],
  [{ fork: { like: 'master' } }, 'types fork like master'],
  [
    { pointer: { type: { ref: { to: 'data' } } } },
    'types pointer type ref to data',
  ],
  [
    { pointer: { like: { ref: { to: 'data_ref' } } } },
    'types pointer like ref to data_ref',
  ],
];

test('Existing type', () => {
  tests.forEach(([input, result]) =>
    expect(new ExistingType(input).render()).toEqual(result)
  );
});
