import { Code, IndentType } from './code';

test('test', () => {
  const code = new Code();

  code.write('A');
  expect(code.render()).toEqual(['A']);

  code.write('B', { separator: '.' });
  expect(code.render()).toEqual(['A', 'B']);

  code.write(['C', 'D'], { separator: ',' });
  expect(code.render()).toEqual(['A', 'B', 'C,', 'D']);

  code.write(['E', 'F'], { indent: 1 });
  expect(code.render()).toEqual(['A', 'B', 'C,', 'D', '\tE', '\tF']);

  const code_unit = new Code();
  code.write(code_unit, { indent: 1 });
  expect(code.render()).toEqual(['A', 'B', 'C,', 'D', '\tE', '\tF']);

  code_unit.write('G', { indent: 1 });
  expect(code.render()).toEqual(['A', 'B', 'C,', 'D', '\tE', '\tF', '\t\tG']);

  const space_code = new Code({
    format: { indentType: IndentType.spaces },
  }).write(code);
  expect(space_code.render()).toEqual(['A', 'B', 'C,', 'D', ' E', ' F', '  G']);
});
