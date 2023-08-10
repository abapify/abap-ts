import { type } from 'os';
import { INTERFACE2, PUBLIC } from '../interface';

@abap.interface
abstract class ZIF_TEST {
  // public = true;
  // interfaces = ['lif_test'];
  @abap.private
  @abap.static
  @abap.abstract
  test(
    @abap.importing
    @abap.type('string')
    p_importing: string
  ) {
    // this.
  }
}

test('Dummy interface with public = true', () => {
  expect(ZIF_TEST.toString()).toEqual(
    `interface ZIF_TEST public.
endinterface.`
  );
});
