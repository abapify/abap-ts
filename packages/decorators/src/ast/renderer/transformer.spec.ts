import { Transformer } from './transformer';

const dobj = "'Hello'";
const result = `write ${dobj}`;

test('Render full format write satement', () => {
  expect(Transformer.from({ type: 'write', data: { dobj } }).render()).toEqual(
    result
  );
});

test('Render shortcut write satement', () => {
  expect(Transformer.from({ $write: { dobj } }).render()).toEqual(result);
});

test('Render even shorter write satement', () => {
  expect(Transformer.from({ $write: dobj }).render()).toEqual(result);
});

test('Render even shorter write satement', () => {
  expect(Transformer.from({ $write: ['test'] }).render()).toEqual(
    'write: test'
  );
});
