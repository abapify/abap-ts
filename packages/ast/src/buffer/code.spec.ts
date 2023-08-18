import { Code, IndentType } from './code';

test('test', () => {
  const code = new Code();

  code.write('A');
  expect(code.format()).toEqual(['A']);

  code.write('B');
  expect(code.format()).toEqual(['A', 'B']);

  code.write(['C', 'D']);
  expect(code.format()).toEqual(['A', 'B', 'C', 'D']);

  code.write(['E', 'F'], { indent: 1 });
  expect(code.format()).toEqual(['A', 'B', 'C', 'D', '\tE', '\tF']);

  const code_unit = new Code();
  code.write(code_unit, { indent: 1 });
  expect(code.format()).toEqual(['A', 'B', 'C', 'D', '\tE', '\tF']);

  code_unit.write('G', { indent: 1 });
  expect(code.format()).toEqual(['A', 'B', 'C', 'D', '\tE', '\tF', '\t\tG']);

  const space_code = new Code({
    format: { indentType: IndentType.space },
  }).write(code);
  expect(space_code.format()).toEqual(['A', 'B', 'C', 'D', ' E', ' F', '  G']);
});
