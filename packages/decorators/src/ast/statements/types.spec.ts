import { Types } from './types';
import { tests as existing } from './types/existing.spec';
import { tests as predefined } from './types/predefined.spec';

export const tests = [existing, predefined].flat(1);

test('Types statement', () => {
  tests.forEach(([input, result]) =>
    expect(new Types(input).render()).toEqual(result)
  );
});
