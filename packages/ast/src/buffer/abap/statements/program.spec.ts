import { code } from 'packages/ast/src/abapgen/code';
import { Program } from './program';

test('test', () => {
  const ztest_program = new Program({ name: 'ztest_program' });
  expect(ztest_program.render().join('\n')).toEqual(`program ztest_program.`);

  ztest_program.parameters({ bukrs: 'bukrs', gjahr: { like: 'bkpf-gjahr' } });
  expect(ztest_program.render().join('\n')).toEqual(code`
program ztest_program.
parameters:
  bukrs type bukrs,
  gjahr like bkpf-gjahr.`);
});
