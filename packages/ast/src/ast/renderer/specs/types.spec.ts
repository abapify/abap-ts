import { Transformer } from '../transformer';
import { tests } from '../../statements/types.spec';

test('Render types statement (full)', () => {
  tests.forEach(([data, result]) =>
    expect(Transformer.from({ type: 'types', data }).render()).toEqual(result)
  );
});

test('Render $types statement (short)', () => {
  tests.forEach(([$types, result]) =>
    expect(Transformer.from({ $types }).render()).toEqual(result)
  );
});
