import { code } from '../../abapgen/code';
import { Interface } from './interface';

test('Render interface', () => {
  expect(new Interface({ name: 'zif_petstore' }).render()).toEqual(code`
interface zif_petstore.
endinterface.`);
});
