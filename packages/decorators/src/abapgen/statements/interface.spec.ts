import { code } from './base/code';
import { Interface } from './interface';
import { AbapType } from './types/predefined';

test('Interfaces', () => {
  const ZIF_TEST = new Interface({ name: 'ZIF_TEST' });
  // empty interface
  expect(ZIF_TEST.toString()).toEqual(code`
interface ZIF_TEST.
endinterface`);
  // empty public
  expect(
    new Interface({
      name: 'ZIF_TEST_PUBLIC',
      public: true,
      interfaces: [ZIF_TEST, 'zif_base'],
      types: { test_type: { type: 'string' } },
    }).toString()
  ).toEqual(code`
interface ZIF_TEST_PUBLIC public.
interfaces:
ZIF_TEST,
zif_base.
endinterface`);
  // interfaces
});
