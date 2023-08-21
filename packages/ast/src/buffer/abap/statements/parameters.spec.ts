import { Parameters, ParametersInput } from './parameters';

const tests: [ParametersInput, string][] = [
  [{ name: 'p_test', type: 'string' }, 'parameters p_test type string.'],
  [{ name: 'p_test', length: 10 }, 'parameters p_test length 10.'],
  [
    { name: 'p_test', type: 'c', length: 10 },
    'parameters p_test length 10 type c.',
  ],
  [
    { name: 'p_test', type: { type: 'p', decimals: 2 } },
    'parameters p_test type p decimals 2.',
  ],
];

test('Parameters', () => {
  for (const [given, exptected] of tests) {
    expect(new Parameters(given).render().join('\n')).toEqual(exptected);
  }
});
