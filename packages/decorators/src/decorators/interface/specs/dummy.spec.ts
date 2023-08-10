import { INTERFACE } from '../interface';

@INTERFACE
class ZIF_TEST {}

test('Dummy interface', () => {
  expect(ZIF_TEST.toString()).toEqual(`
interface ZIF_TEST.
endinterface.
`);
});
