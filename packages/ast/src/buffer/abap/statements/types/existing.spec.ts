import { ExistingType, ExistingTypeInput } from './existing';

export const tests: [ExistingTypeInput, string][] = [
  [{ type: 'string' }, 'type string'],
  [{ type: { line: { of: 'STRING_TT' } } }, 'type line of STRING_TT'],
  [{ like: 'master' }, 'like master'],
  [{ type: { ref: { to: 'data' } } }, 'type ref to data'],
  [{ type: 'ref to data' }, 'type ref to data'],
  [{ like: { ref: { to: 'data_ref' } } }, 'like ref to data_ref'],
];

test('Existing type', () => {
  tests.forEach(([input, result]) =>
    expect(new ExistingType(input).render()).toEqual([result])
  );
});
