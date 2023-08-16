import { StructuredType, StructuredTypeData } from './structured';

export const tests: [StructuredTypeData, string][] = [
  [
    {
      name: 'struc_type',
      components: [
        { t_string: { abap_type: 'string' }, x_flag: 'abap_bool' },
        { include: { type: 'test_ts' } },
        { include: { type: 'test_ts2', as: 'test', suffix: '_t' } },
        { include: { structure: 'ls_test' } },
      ],
    },

    [
      'types begin of struc_type.',
      'types t_string type string.',
      'types x_flag type abap_bool.',
      'include type test_ts.',
      'include type test_ts2 as test renaming with suffix _t.',
      'include structure ls_test.',
      'types end of struc_type',
    ].join('\n'),
  ],
];

test('Existing type', () => {
  tests.forEach(([input, result]) =>
    expect(new StructuredType(input).render()).toEqual(result)
  );
});
