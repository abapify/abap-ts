import { Types, TypesData } from './types';
import { tests as existing } from './types/existing.spec';
import { tests as predefined } from './types/predefined.spec';
import { StructuredTypeInput } from './types/structured';
import { tests as structured } from './types/structured.spec';
import { tests as table } from './types/table.spec';

export const tests: [TypesData, string][] = [
  ...existing,
  ...predefined,
  ...table,
  ...structured,
].map(
  ([t_test, result]) =>
    [
      { t_test },
      (t_test as StructuredTypeInput).components
        ? result
        : `types t_test ${result}`,
    ] as [Record<string, typeof t_test>, string]
);

test('Types statement', () => {
  tests.forEach(([input, result]) => {
    if (input) {
      expect(new Types(input).render()).toEqual(result);
    }
  });
});
