import { PredefinedType, PredefinedTypeData } from './predefined';

export const tests: [PredefinedTypeData, string][] = [
  [{ abap_type: 'string' }, 'type string'],
  [{ abap_type: 'c', length: 3 }, 'type c length 3'],
  [{ abap_type: 'p', length: 13, decimals: 3 }, 'type p length 13 decimals 3'],
];

test('Existing type', () => {
  tests.forEach(([input, result]) =>
    expect(new PredefinedType(input).render()).toEqual(result)
  );
});
