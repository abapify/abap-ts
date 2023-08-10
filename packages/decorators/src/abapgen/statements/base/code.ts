// the only thing this template function is doing - it's removing a first new line
// it's supposed to be used for better templating, when we can start from a new line

// code`
// <body>${body}</body>
// `

// will return same line but without a fisrt line

export function code(strings: TemplateStringsArray, ...args: Array<string>) {
  return strings
    .map((s, i) => {
      const v = i === 0 && s.startsWith('\n') ? s.slice(1) : s;
      return args[i] ? v.concat(args[i]) : v;
    })
    .join('');
}
