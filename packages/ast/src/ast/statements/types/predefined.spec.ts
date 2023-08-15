import { PredefinedType, PredefinedTypeData } from './predefined';

export const tests: [PredefinedTypeData, string][] = [
  [{ t_string: { abap_type: 'string' } }, 'types t_string type string'],
  [{ char3: { abap_type: 'c', length: 3 } }, 'types char3 type c length 3'],
  [
    { curr13: { abap_type: 'p', length: 13, decimals: 3 } },
    'types curr13 type p length 13 decimals 3',
  ],
];

test('Existing type', () => {
  tests.forEach(([input, result]) =>
    expect(new PredefinedType(input).render()).toEqual(result)
  );
});
