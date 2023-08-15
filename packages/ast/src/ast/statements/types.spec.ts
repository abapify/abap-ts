import { Types } from './types';
import { tests as existing } from './types/existing.spec';
import { tests as predefined } from './types/predefined.spec';
import { tests as structured } from './types/structured.spec';
import { tests as table } from './types/table.spec';

export const tests = [existing, predefined, structured, table].flat(1);

test('Types statement', () => {
  tests.forEach(([input, result]) => {
    if (input) {
      if (!Array.isArray(input)) {
        expect(new Types(input).render()).toEqual(result);
      }
    }
  });
});
