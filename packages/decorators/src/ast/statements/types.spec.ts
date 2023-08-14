import { Types } from './types';
import { tests as existing } from './types/existing.spec';
import { tests as predefined } from './types/predefined.spec';
import { tests as structured } from './types/structured.spec';

export const tests = [existing, predefined, structured].flat(1);

test('Types statement', () => {
  tests.forEach(([input, result]) =>
    expect(new Types(input).render()).toEqual(result)
  );
});
