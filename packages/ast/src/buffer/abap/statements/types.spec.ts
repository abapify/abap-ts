import { Types, TypesInput } from './types';

const tests: [TypesInput, string][] = [
  [{ $name: 't_test', type: 'string' }, 'types t_test type string'],
];

test('Types statement', () => {
  tests.forEach(([input, result]) => {
    if (input) {
      expect(new Types(input).render()).toEqual([result]);
    }
  });
});
