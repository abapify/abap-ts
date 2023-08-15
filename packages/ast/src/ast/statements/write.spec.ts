import { Write } from './write';
import { code } from '../../abapgen/code';

const dobj = "'Hello'";
const result = `write ${dobj}`;

test('Test write statement', () => {
  expect(new Write({ dobj }).render()).toEqual(result);
  expect(new Write(dobj).render()).toEqual(result);
  expect(new Write(['a', 'b']).render()).toEqual(code`
write:
a,
b`);
});
