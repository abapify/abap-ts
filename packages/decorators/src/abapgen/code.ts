export function code(strings: TemplateStringsArray, ...args: Array<string>) {
  return strings
    .map((s, i) => {
      const v = i === 0 && s.startsWith('\n') ? s.slice(1) : s;
      return args[i] ? v.concat(args[i]) : v;
    })
    .join('');
}
