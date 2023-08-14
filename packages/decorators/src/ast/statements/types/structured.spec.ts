import { StructuredType, StructuredTypeData } from './structured';

export const tests: [StructuredTypeData, string][] = [
  [
    {
      struc_type: {
        components: [
          { t_string: { abap_type: 'string' }, x_flag: 'abap_bool' },
        ],
      },
    },

    [
      'types begin of struc_type.',
      'types t_string type string.',
      'types x_flag type abap_bool.',
      'types end of struc_type',
    ].join('\n'),
  ],
];

test('Existing type', () => {
  tests.forEach(([input, result]) =>
    expect(new StructuredType(input).render()).toEqual(result)
  );
});
