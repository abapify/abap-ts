import { INTERFACE, PUBLIC } from '../interface';

@INTERFACE
@PUBLIC
class ZIF_TEST {}

test('Dummy public interface', () => {
  expect(ZIF_TEST.toString()).toEqual(`
interface ZIF_TEST public.
endinterface.
`);
});
