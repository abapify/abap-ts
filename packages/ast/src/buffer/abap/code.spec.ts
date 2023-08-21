import get from './statements';

test('test', () => {
  const ztest_program = get.program('ztest_program');
  ztest_program.parameters({ bukrs: 'bukrs', gjahr: { like: 'bkpf-gjahr' } });
});
